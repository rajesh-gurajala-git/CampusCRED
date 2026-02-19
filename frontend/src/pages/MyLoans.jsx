import { useAuth } from '../context/AuthContext';
import { useLoan } from '../context/LoanContext';
import LoanCard from '../components/LoanCard';

const MyLoans = () => {
    const { user } = useAuth();
    const { getUserLoans } = useLoan();
    const { loansGiven, loansTaken } = getUserLoans(user.id);

    return (
        <div className="page-container">
            <h1>My Loans</h1>

            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    Loans Taken (Borrowing)
                </h2>
                {loansTaken.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>You haven't borrowed any funds yet.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {loansTaken.map((loan) => (
                            <LoanCard key={loan.id} loan={loan} />
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    Loans Given (Lending)
                </h2>
                {loansGiven.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>You haven't funded any loans yet.</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {loansGiven.map((loan) => (
                            <LoanCard key={loan.id} loan={loan} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLoans;
