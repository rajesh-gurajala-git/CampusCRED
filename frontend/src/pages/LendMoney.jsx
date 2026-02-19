import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useLoan } from '../context/LoanContext';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Clock, Percent } from 'lucide-react';

const LendMoney = () => {
    const { createOffer, lendingOffers } = useLoan();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        durationMembers: '',
        interestRate: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.amount || !formData.durationMembers || !formData.interestRate) {
            setError('Please fill in all fields');
            return;
        }

        const offerData = {
            amount: parseFloat(formData.amount),
            durationMonths: parseInt(formData.durationMembers),
            interestRate: parseFloat(formData.interestRate),
        };

        createOffer(offerData);
        setFormData({ amount: '', durationMembers: '', interestRate: '' });
        // Stay on page to see the new offer in the list below
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4 fw-bold text-dark">Lend Money</h2>
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                    <h5 className="mb-3">Create a Lending Offer</h5>
                    <p className="text-muted mb-4">Set your terms and help a student in need while earning returns.</p>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount to Lend (₹)</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><IndianRupee size={18} /></span>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    placeholder="e.g. 500"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="border-start-0 ps-0"
                                    min="10"
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Loan Duration (Months)</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><Clock size={18} /></span>
                                <Form.Control
                                    type="number"
                                    name="durationMembers"
                                    placeholder="e.g. 6"
                                    value={formData.durationMembers}
                                    onChange={handleChange}
                                    className="border-start-0 ps-0"
                                    min="1"
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Interest Rate (%)</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><Percent size={18} /></span>
                                <Form.Control
                                    type="number"
                                    name="interestRate"
                                    placeholder="e.g. 5"
                                    value={formData.interestRate}
                                    onChange={handleChange}
                                    className="border-start-0 ps-0"
                                    step="0.1"
                                    min="0"
                                    required
                                />
                            </div>
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" size="lg" type="submit" className="rounded-pill fw-bold">
                                Create Offer
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <h4 className="mt-5 mb-3 fw-bold text-dark">Your Active Offers</h4>
            {lendingOffers.length === 0 ? (
                <Alert variant="info">You haven't created any lending offers yet.</Alert>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {lendingOffers.map((offer) => (
                        <Card key={offer.id} className="border-0 shadow-sm">
                            <Card.Body className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <div>
                                    <h5 className="fw-bold mb-1">₹{offer.amount}</h5>
                                    <div className="text-muted small">
                                        <span className="me-3"><Clock size={14} className="me-1" /> {offer.durationMonths} Months</span>
                                        <span><Percent size={14} className="me-1" /> {offer.interestRate}% Interest</span>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <span className={`badge bg-${offer.status === 'OPEN' ? 'success' : 'secondary'} rounded-pill px-3`}>
                                        {offer.status}
                                    </span>
                                    <small className="text-muted">{offer.createdAt}</small>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default LendMoney;
