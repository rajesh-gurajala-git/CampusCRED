import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, User, Mail, Lock, CheckCircle } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'borrower'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        if (!formData.email.endsWith('@srmap.edu.in')) {
            return setError('Please use your university email ending with @srmap.edu.in');
        }

        try {
            setLoading(true);

            const res = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (res.success) {
                alert('Account created successfully!');
                navigate('/');
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError('Failed to create an account');
        }
        setLoading(false);
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Container style={{ maxWidth: '500px' }}>
                <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-white p-3 rounded-circle shadow-sm mb-3">
                        <GraduationCap size={40} className="text-primary" />
                    </div>
                    <h2 className="fw-bold">Create Account</h2>
                    <p className="text-muted">Join the CampusCred community</p>
                </div>

                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-4 p-md-5">
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><User size={18} /></span>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="e.g. Alex Johnson"
                                        className="border-start-0 ps-0"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>University Email</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><Mail size={18} /></span>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="alex@srmap.edu.in"
                                        className="border-start-0 ps-0"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                                    <option value="borrower">Borrower</option>
                                    <option value="lender">Lender</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><Lock size={18} /></span>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Create a password"
                                        className="border-start-0 ps-0"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Confirm Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0"><Lock size={18} /></span>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className="border-start-0 ps-0"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" size="lg" type="submit" disabled={loading} className="fw-bold">
                                    Sign Up
                                </Button>
                            </div>
                        </Form>

                        <div className="text-center mt-4">
                            <p className="mb-0 text-muted">
                                Already have an account?{' '}
                                <Link to="/login" className="text-decoration-none fw-semibold">
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
