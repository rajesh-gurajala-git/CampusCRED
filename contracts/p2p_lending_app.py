# contracts/p2p_lending_app.py
from beaker import Application, GlobalStateValue, LocalStateValue
from pyteal import *

class P2PLendingState:
    # GLOBAL STATE
    total_loans = GlobalStateValue(stack_type=TealType.uint64, default=Int(0))      # Total loans issued
    active_loans = GlobalStateValue(stack_type=TealType.uint64, default=Int(0))    # Active loans count
    platform_fee = GlobalStateValue(stack_type=TealType.uint64, default=Int(0))    # Optional platform fee in microAlgos

    # LOCAL STATE (per borrower/lender)
    loan_amount = LocalStateValue(stack_type=TealType.uint64, default=Int(0))
    loan_status = LocalStateValue(stack_type=TealType.uint64, default=Int(0))      # 0=none,1=requested,2=funded,3=repaid,4=defaulted
    lender = LocalStateValue(stack_type=TealType.bytes, default=Bytes(""))          # Lender address
    due_date = LocalStateValue(stack_type=TealType.uint64, default=Int(0))            # Timestamp for repayment

app = Application("P2PLending", state=P2PLendingState())

@app.create(bare=True)
def create() -> Expr:
    return app.initialize_global_state()

@app.opt_in(bare=True)
def opt_in() -> Expr:
    return app.initialize_local_state()

# Borrower requests a loan
@app.external
def request_loan(amount: abi.Uint64, duration: abi.Uint64) -> Expr:
    return Seq(
        Assert(app.state.loan_status.get() == Int(0)),  # no active loan
        app.state.loan_amount.set(amount.get()),
        app.state.loan_status.set(Int(1)),  # requested
        app.state.due_date.set(Global.latest_timestamp() + duration.get()),
        app.state.active_loans.increment(),
        app.state.total_loans.increment()
    )

# Lender funds a loan
@app.external
def fund_loan(borrower: abi.Account) -> Expr:
    return Seq(
        Assert(app.state.loan_status[borrower.address()].get() == Int(1)),
        # Transaction validation: must send payment equal to loan_amount
        Assert(Gtxn[0].type_enum() == TxnType.Payment),
        Assert(Gtxn[0].receiver() == borrower.address()),
        Assert(Gtxn[0].amount() == app.state.loan_amount[borrower.address()].get()),
        app.state.loan_status[borrower.address()].set(Int(2)),
        app.state.lender[borrower.address()].set(Txn.sender()),
    )

# Borrower repays loan
@app.external
def repay_loan() -> Expr:
    lender_addr = app.state.lender.get()
    return Seq(
        Assert(app.state.loan_status.get() == Int(2)),  # must be funded
        # Transaction validation: must pay lender the amount + optional interest
        Assert(Gtxn[0].type_enum() == TxnType.Payment),
        Assert(Gtxn[0].receiver() == lender_addr),
        Assert(Gtxn[0].amount() >= app.state.loan_amount.get()),  # allow >= for interest
        app.state.loan_status.set(Int(3)),  # repaid
        app.state.loan_amount.set(Int(0)),
        app.state.lender.set(Bytes("")),
        app.state.due_date.set(Int(0)),
        app.state.active_loans.decrement()
    )

# Lender liquidates if borrower defaults
@app.external
def liquidate_loan(borrower: abi.Account) -> Expr:
    return Seq(
        Assert(app.state.loan_status[borrower.address()].get() == Int(2)),  # funded
        Assert(Global.latest_timestamp() > app.state.due_date[borrower.address()].get()),
        # For simplicity: loan considered defaulted; lender can claim collateral if implemented
        app.state.loan_status[borrower.address()].set(Int(4)),
        app.state.loan_amount[borrower.address()].set(Int(0)),
        app.state.lender[borrower.address()].set(Bytes("")),
        app.state.due_date[borrower.address()].set(Int(0)),
        app.state.active_loans.decrement()
    )
