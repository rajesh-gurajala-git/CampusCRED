import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, GraduationCap } from 'lucide-react';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <BsNavbar bg="white" expand="lg" className="border-bottom sticky-top shadow-sm">
            <Container fluid>
                <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-primary fw-bold">
                    <GraduationCap size={24} />
                    CampusCred
                </BsNavbar.Brand>

                <BsNavbar.Toggle aria-controls="main-navbar-nav" />

                <BsNavbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {user ? (
                            <>
                                <span className="me-3 text-secondary d-none d-lg-block">
                                    Welcome, <span className="fw-semibold text-dark">{user.name}</span>
                                </span>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    <span className="d-lg-none">Logout</span>
                                </Button>
                            </>
                        ) : (
                            <div className="d-flex gap-2">
                                <Button as={Link} to="/login" variant="outline-primary" size="sm">
                                    Log In
                                </Button>
                                <Button as={Link} to="/register" variant="primary" size="sm">
                                    Sign Up
                                </Button>
                            </div>
                        )}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
