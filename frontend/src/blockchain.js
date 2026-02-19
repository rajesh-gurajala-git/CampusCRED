import algosdk from 'algosdk';
import * as algokit from '@algorandfoundation/algokit-utils';
import appSpec from '../../contracts/app_spec.json';

const algodConfig = {
    server: import.meta.env.VITE_ALGOD_SERVER || 'http://localhost',
    port: import.meta.env.VITE_ALGOD_PORT || '4001',
    token: import.meta.env.VITE_ALGOD_TOKEN || 'a'.repeat(64),
};

const algodClient = new algosdk.Algodv2(algodConfig.token, algodConfig.server, algodConfig.port);
const appId = parseInt(import.meta.env.VITE_APP_ID);

export const getAppClient = (sender) => {
    return algokit.getAppClient(
        {
            app: JSON.stringify(appSpec),
            id: appId,
            sender: sender,
            resolveBy: 'id',
        },
        algodClient
    );
};

export const requestLoan = async (sender, amount, duration) => {
    const client = getAppClient(sender);
    return await client.call({
        method: 'request_loan',
        methodArgs: [amount, duration],
    });
};

export const fundLoan = async (sender, borrowerAddress) => {
    const client = getAppClient(sender);
    // fund_loan(borrower: account)
    // We need to send a payment transaction alongside the call if the contract expects it.
    // Looking at the contract: 
    // Assert(Gtxn[0].type_enum() == TxnType.Payment)
    // So it expects an atomic group with a payment first.

    // We'll use algokit's composer or just client.call with extra payments if supported.
    // However, the contract uses Gtxn[0], which usually implies the payment is the first in the group.

    const suggestedParams = await algodClient.getTransactionParams().do();

    // Get the loan amount from the borrower's local state first?
    // Or pass it in. For now, let's assume we fetch it or pass it.
    // Let's get it from state to be safe.
    const accountInfo = await algodClient.accountApplicationInformation(borrowerAddress, appId).do();
    const localState = accountInfo['app-local-state']['key-value'];
    const amountEntry = localState.find(e => b64ToString(e.key) === 'loan_amount');
    const amount = amountEntry ? amountEntry.value.uint : 0;

    const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender.addr,
        to: borrowerAddress,
        amount: amount,
        suggestedParams,
    });

    return await client.call({
        method: 'fund_loan',
        methodArgs: [borrowerAddress],
        extraFee: 1000,
        sendParams: {
            suppressLog: true,
        },
        // Using box-less or simple call? Algokit handles group compilation.
        // We might need to manually group if client.call doesn't support prepending.
    });
};

// Helper to decode b64 keys
const b64ToString = (b64) => Buffer.from(b64, 'base64').toString();

export const repayLoan = async (sender) => {
    const client = getAppClient(sender);
    // Needs a payment to the lender.
    // Let's get lender and amount from state.
    const accountInfo = await algodClient.accountApplicationInformation(sender.addr, appId).do();
    const localState = accountInfo['app-local-state']['key-value'] || [];
    const lenderEntry = localState.find(e => b64ToString(e.key) === 'lender');
    const amountEntry = localState.find(e => b64ToString(e.key) === 'loan_amount');

    const lender = lenderEntry ? algosdk.encodeAddress(Buffer.from(lenderEntry.value.bytes, 'base64')) : null;
    const amount = amountEntry ? amountEntry.value.uint : 0;

    const suggestedParams = await algodClient.getTransactionParams().do();
    const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender.addr,
        to: lender,
        amount: amount,
        suggestedParams,
    });

    // In Beaker/PyTeal, you often need to pass the payment as a transaction argument if using ABI, 
    // or as part of the group. The contract uses Gtxn[0].

    // Note: This needs refinement based on how the frontend handles wallet signing.
    return await client.call({
        method: 'repay_loan',
        methodArgs: [],
    });
};
