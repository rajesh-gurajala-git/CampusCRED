import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import { Award, TrendingUp, CheckCircle, AlertTriangle, Edit, Save, X } from 'lucide-react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        mobile: '',
        organization: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age || '',
                gender: user.gender || '',
                mobile: user.mobile || '',
                organization: user.organization || 'University of Tech', // Default for now
                email: user.email || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                age: user.age || '',
                gender: user.gender || '',
                mobile: user.mobile || '',
                organization: user.organization || 'University of Tech',
                email: user.email || ''
            });
        }
        setIsEditing(false);
    };

    return (
        <Container fluid className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0">Reputation Profile</h2>
                {!isEditing ? (
                    <Button variant="outline-primary" onClick={() => setIsEditing(true)} className="d-flex align-items-center gap-2">
                        <Edit size={18} /> Edit Profile
                    </Button>
                ) : (
                    <div className="d-flex gap-2">
                        <Button variant="outline-secondary" onClick={handleCancel} className="d-flex align-items-center gap-2">
                            <X size={18} /> Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave} className="d-flex align-items-center gap-2">
                            <Save size={18} /> Save Changes
                        </Button>
                    </div>
                )}
            </div>

            {/* Profile Details Card */}
            <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                    <h5 className="card-title mb-4 fw-bold">Personal Details</h5>
                    {isEditing ? (
                        <Form>
                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Email (Read-Only)</Form.Label>
                                        <Form.Control type="email" value={formData.email} disabled className="bg-light" />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter Age" />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Mobile Number</Form.Label>
                                        <Form.Control type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter Mobile" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Organization (Read-Only)</Form.Label>
                                        <Form.Control type="text" value={formData.organization} disabled className="bg-light" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    ) : (
                        <Row className="g-4">
                            <Col md={6} lg={4}>
                                <div className="text-muted small mb-1">Full Name</div>
                                <div className="fw-semibold fs-5">{user.name}</div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className="text-muted small mb-1">Email</div>
                                <div className="fw-semibold">{user.email}</div>
                            </Col>
                            <Col md={6} lg={4}>
                                <div className="text-muted small mb-1">Organization</div>
                                <div className="fw-semibold">{user.organization || 'University of Tech'}</div>
                            </Col>
                            <Col md={4} lg={4}>
                                <div className="text-muted small mb-1">Age</div>
                                <div className="fw-semibold">{user.age || '--'}</div>
                            </Col>
                            <Col md={4} lg={4}>
                                <div className="text-muted small mb-1">Gender</div>
                                <div className="fw-semibold">{user.gender || '--'}</div>
                            </Col>
                            <Col md={4} lg={4}>
                                <div className="text-muted small mb-1">Mobile Number</div>
                                <div className="fw-semibold">{user.mobile || '--'}</div>
                            </Col>
                        </Row>
                    )}
                </Card.Body>
            </Card>

            <Row className="g-3 mb-4">
                <Col sm={6} xl={4}>
                    <StatCard
                        title="Current Score"
                        value={user.reputation_score || 500}
                        icon={<Award size={24} />}
                        color="#2563eb"
                    />
                </Col>
                <Col sm={6} xl={4}>
                    <StatCard
                        title="Loans Repaid"
                        value="100%"
                        icon={<CheckCircle size={24} />}
                        color="#10b981"
                    />
                </Col>
                <Col sm={6} xl={4}>
                    <StatCard
                        title="Defaults"
                        value="0"
                        icon={<AlertTriangle size={24} />}
                        color="#ef4444"
                    />
                </Col>
            </Row>

            <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                    <h5 className="card-title mb-4 fw-bold">Reputation History</h5>
                    <p className="text-muted">No history available yet. Start borrowing or lending to build your reputation!</p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
