import { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateLoan = () => {
    const { requestLoan } = useLoan();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const [description, setDescription] = useState('');
    const [repaymentDate, setRepaymentDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !purpose || !repaymentDate) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            // Duration in days for the contract (example)
            const duration = 30;

            await requestLoan({
                amount: Number(amount),
                duration: duration,
                purpose,
                description,
                repaymentDate,
            });

            alert('Loan request submitted successfully on Algorand!');
            navigate('/my-loans');
        } catch (error) {
            console.error(error);
            alert('Failed to submit loan request: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1>Request a Loan</h1>
                <div style={{
                    backgroundColor: 'var(--surface-color)',
                    padding: '2rem',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow)',
                    border: '1px solid var(--border-color)'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 500 }}>Loan Amount (₹)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="e.g. 500"
                                min="1"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 500 }}>Purpose</label>
                            <input
                                type="text"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="e.g. Textbooks"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 500 }}>Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Explain why you need this loan..."
                                rows="4"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)', resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: 500 }}>Repayment Date</label>
                            <input
                                type="date"
                                value={repaymentDate}
                                onChange={(e) => setRepaymentDate(e.target.value)}
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                backgroundColor: isSubmitting ? '#ccc' : 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--radius)',
                                fontWeight: 600,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            {isSubmitting ? 'Processing Transaction...' : 'Submit Loan Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateLoan;
