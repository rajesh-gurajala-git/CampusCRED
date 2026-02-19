import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = resetPassword(email);
            if (res.success) {
                setMessage(res.message);
            } else {
                setError(res.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Container style={{ maxWidth: '450px' }}>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-white p-3 rounded-circle shadow-sm mb-3">
                        <KeyRound size={40} className="text-primary" />
                    </div>
                    <h2 className="fw-bold">Reset Password</h2>
                    <p className="text-muted">Enter your email to receive reset instructions</p>
                </div>

                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-4 p-md-5">
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label>Email Address</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><Mail size={18} /></span>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        className="border-start-0 ps-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" size="lg" type="submit" disabled={loading} className="fw-bold">
                                    Send Reset Link
                                </Button>
                            </div>
                        </Form>

                        <div className="text-center mt-4">
                            <Link to="/login" className="text-decoration-none d-inline-flex align-items-center gap-2">
                                <ArrowLeft size={16} /> Back to Login
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ForgotPassword;
