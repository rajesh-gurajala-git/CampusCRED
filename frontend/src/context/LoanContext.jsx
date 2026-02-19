import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import * as blockchain from '../blockchain';
import { useAuth } from './AuthContext';
import algosdk from 'algosdk';

const LoanContext = createContext(null);

export const LoanProvider = ({ children }) => {
    const { user } = useAuth();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lendingOffers, setLendingOffers] = useState([]);

    const fetchLoans = useCallback(async () => {
        if (!supabase) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('loans')
                .select(`
                    *,
                    borrower:profiles!loans_borrower_id_fkey(name, address),
                    lender:profiles!loans_lender_id_fkey(name, address)
                `)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setLoans(data.map(loan => ({
                    ...loan,
                    borrowerName: loan.borrower?.name,
                    borrowerAddress: loan.borrower?.address,
                    lenderName: loan.lender?.name
                })));
            }
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchLoans();
    }, [fetchLoans]);

    const requestLoan = async (loanData) => {
        if (!user || !user.mnemonic) {
            console.error("User not authenticated or missing mnemonic");
            return;
        }

        const sender = algosdk.mnemonicToSecretKey(user.mnemonic);
        try {
            const amount = parseInt(loanData.amount) * 1_000_000;
            const duration = parseInt(loanData.duration) * 24 * 60 * 60;

            await blockchain.requestLoan(sender, amount, duration);

            if (!supabase) {
                console.warn("Supabase not configured, only blockchain transaction completed.");
            } else {
                const { data, error } = await supabase
                    .from('loans')
                    .insert([
                        {
                            borrower_id: user.id,
                            amount: loanData.amount,
                            purpose: loanData.purpose,
                            description: loanData.description,
                            repayment_date: loanData.repaymentDate,
                            status: 'PENDING',
                        },
                    ])
                    .select()
                    .single();

                if (error) throw error;
                await fetchLoans();
                return data;
            }
        } catch (error) {
            console.error("Error requesting loan on-chain or in DB:", error);
            throw error;
        }
    };

    const createOffer = (offerData) => {
        const newOffer = {
            id: `o${Date.now()}`,
            ...offerData,
            status: 'OPEN',
            createdAt: new Date().toISOString().split('T')[0],
        };
        setLendingOffers([...lendingOffers, newOffer]);
        return newOffer;
    };

    const fundLoan = async (loanId, lenderUser) => {
        if (!user || !user.mnemonic) return;
        const sender = algosdk.mnemonicToSecretKey(user.mnemonic);

        try {
            const loan = loans.find(l => l.id === loanId);
            const borrowerAddress = loan.borrowerAddress;

            await blockchain.fundLoan(sender, borrowerAddress);

            if (!supabase) {
                console.warn("Supabase not configured, only blockchain transaction completed.");
            } else {
                const { error } = await supabase
                    .from('loans')
                    .update({
                        status: 'ACTIVE',
                        lender_id: lenderUser.id
                    })
                    .eq('id', loanId);

                if (error) throw error;
                await fetchLoans();
            }
        } catch (error) {
            console.error("Error funding loan on-chain or in DB:", error);
            throw error;
        }
    };

    const repayLoan = async (loanId) => {
        if (!user || !user.mnemonic) return;
        const sender = algosdk.mnemonicToSecretKey(user.mnemonic);

        try {
            await blockchain.repayLoan(sender);

            if (!supabase) {
                console.warn("Supabase not configured, only blockchain transaction completed.");
            } else {
                const { error } = await supabase
                    .from('loans')
                    .update({ status: 'REPAID' })
                    .eq('id', loanId);

                if (error) throw error;
                await fetchLoans();
            }
        } catch (error) {
            console.error("Error repaying loan on-chain or in DB:", error);
            throw error;
        }
    };

    const getMarketplaceLoans = () => {
        return loans.filter((loan) => loan.status === 'PENDING');
    };

    const getUserLoans = (userId) => {
        const loansGiven = loans.filter((loan) => loan.lenderId === userId);
        const loansTaken = loans.filter((loan) => loan.borrowerId === userId);
        return { loansGiven, loansTaken };
    };

    return (
        <LoanContext.Provider
            value={{
                loading,
                fetchLoans,
                loans,
                requestLoan,
                fundLoan,
                repayLoan,
                getMarketplaceLoans,
                getUserLoans,
                createOffer,
                lendingOffers,
            }}
        >
            {children}
        </LoanContext.Provider>
    );
};

export const useLoan = () => useContext(LoanContext);
