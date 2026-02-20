import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoan } from '../context/LoanContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, IndianRupee, User, AlertCircle, ArrowLeft } from 'lucide-react';

const LoanDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loans, fundLoan, repayLoan } = useLoan();
    const { user } = useAuth();

    const loan = loans.find((l) => l.id === id);
    const [isFunding, setIsFunding] = useState(false);
    const [isRepaying, setIsRepaying] = useState(false);

    if (!loan) {
        return (
            <div className="page-container">
                <p>Loan not found.</p>
                <button onClick={() => navigate(-1)} style={{ color: 'var(--primary-color)', background: 'none', border: 'none', cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    const isLender = user?.id === loan.lenderId;
    const isBorrower = user?.id === loan.borrowerId;
    const isPending = loan.status === 'PENDING';
    const isActive = loan.status === 'ACTIVE';

    const handleFund = async () => {
        setIsFunding(true);
        try {
            await fundLoan(loan.id, user);
            alert('Loan funded successfully on Algorand!');
        } catch (error) {
            console.error(error);
            alert('Failed to fund loan: ' + error.message);
        } finally {
            setIsFunding(false);
        }
    };

    const handleRepay = async () => {
        setIsRepaying(true);
        try {
            await repayLoan(loan.id);
            alert('Loan repayment marked on-chain!');
        } catch (error) {
            console.error(error);
            alert('Failed to repay loan: ' + error.message);
        } finally {
            setIsRepaying(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'text-blue-600 bg-blue-100';
            case 'PENDING': return 'text-yellow-600 bg-yellow-100';
            case 'REPAID': return 'text-green-600 bg-green-100';
            case 'DEFAULTED': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="page-container">
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)'
                }}
            >
                <ArrowLeft size={20} />
                Back
            </button>

            <div style={{
                backgroundColor: 'var(--surface-color)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{loan.purpose}</h1>
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            padding: '0.5rem 1rem',
                            borderRadius: '999px',
                            textTransform: 'uppercase'
                        }} className={getStatusColor(loan.status)}>
                            {loan.status}
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>{loan.description}</p>
                </div>

                <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Amount</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 600 }}>
                            <IndianRupee size={24} />
                            {loan.amount}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Borrower</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <User size={20} />
                            {loan.borrowerName}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Repayment Date</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <Calendar size={20} />
                            {loan.repaymentDate}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Lender</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <User size={20} />
                            {loan.lenderName || 'Not funded yet'}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '2rem', backgroundColor: 'var(--background-color)', borderTop: '1px solid var(--border-color)' }}>
                    {isPending && !isBorrower && user && (
                        <button
                            onClick={handleFund}
                            disabled={isFunding}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: isFunding ? '#ccc' : 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius)',
                                cursor: isFunding ? 'not-allowed' : 'pointer',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            {isFunding ? 'Processing...' : 'Fund This Loan'}
                        </button>
                    )}
                    {isActive && isBorrower && (
                        <button
                            onClick={handleRepay}
                            disabled={isRepaying}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: isRepaying ? '#ccc' : 'var(--success-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius)',
                                cursor: isRepaying ? 'not-allowed' : 'pointer',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            {isRepaying ? 'Processing...' : 'Mark as Repaid'}
                        </button>
                    )}
                    {isPending && isBorrower && (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Waiting for a lender...</p>
                    )}
                    {isActive && !isBorrower && !isLender && (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>This loan is active and funded by another user.</p>
                    )}
                    {loan.status === 'REPAID' && (
                        <div style={{ textAlign: 'center', color: 'var(--success-color)', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={20} />
                            This loan has been repaid.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoanDetails;
