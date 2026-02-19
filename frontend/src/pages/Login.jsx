import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { GraduationCap, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('alex@university.edu');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to log in');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Container style={{ maxWidth: '450px' }}>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-white p-3 rounded-circle shadow-sm mb-3">
                        <GraduationCap size={40} className="text-primary" />
                    </div>
                    <h2 className="fw-bold">Welcome Back</h2>
                    <p className="text-muted">Login to continue to CampusCred</p>
                </div>

                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-4 p-md-5">
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <Form.Label className="mb-0">Password</Form.Label>
                                    <Link to="/forgot-password" style={{ fontSize: '0.875rem' }} className="text-decoration-none">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><Lock size={18} /></span>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        className="border-start-0 ps-0"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <div className="d-grid mt-4">
                                <Button variant="primary" size="lg" type="submit" className="fw-bold">
                                    Log In
                                </Button>
                            </div>
                        </Form>

                        <div className="text-center mt-4">
                            <p className="mb-0 text-muted">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-decoration-none fw-semibold">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
