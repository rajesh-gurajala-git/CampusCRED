import React from "react";
import { Container, Navbar, Nav, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Target, Shield } from "lucide-react";

const AboutPage = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                        <GraduationCap size={24} className="text-primary" />
                        <span className="fw-bold">CampusCred</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3">About CampusCred</h1>
                    <p className="lead text-muted max-w-2xl mx-auto">
                        Empowering the next generation of students with financial trust and community support.
                    </p>
                </div>

                <Row className="mb-5 g-4">
                    <Col md={6} className="d-flex align-items-center">
                        <div>
                            <h2 className="mb-4">Our Mission</h2>
                            <p className="fs-5 text-secondary">
                                CampusCred was founded with a simple yet ambitious goal: to democratize financial access for students.
                                We believe that a student's potential shouldn't be limited by temporary financial constraints.
                                By replacing traditional credit checks with academic and social trust, we're building a fairer financial future.
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="p-5 bg-light rounded-4 text-center">
                            <Target size={64} className="text-primary mb-3" />
                            <h4>Mission-Driven</h4>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-5 g-4">
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm text-center p-4">
                            <Card.Body>
                                <Users size={40} className="text-primary mb-3" />
                                <Card.Title>Community First</Card.Title>
                                <Card.Text className="text-muted">
                                    Built by students, for students. We foster a community of mutual support where reputation is currency.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm text-center p-4">
                            <Card.Body>
                                <Shield size={40} className="text-success mb-3" />
                                <Card.Title>Trust & Security</Card.Title>
                                <Card.Text className="text-muted">
                                    We use verified university data to ensure a safe and secure lending environment for everyone.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm text-center p-4">
                            <Card.Body>
                                <GraduationCap size={40} className="text-info mb-3" />
                                <Card.Title>Financial Literacy</Card.Title>
                                <Card.Text className="text-muted">
                                    Beyond lending, we help students build credit history and learn essential financial management skills.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="text-center py-5 bg-light rounded-4">
                    <h3 className="mb-4">Ready to join us?</h3>
                    <div className="d-flex gap-3 justify-content-center">
                        <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
                        <Link to="/contact" className="btn btn-outline-secondary btn-lg">Contact Us</Link>
                    </div>
                </div>
            </Container>

            <footer className="bg-dark text-light py-4 mt-5">
                <Container className="text-center text-muted">
                    <p className="mb-0">&copy; 2026 CampusCred. All rights reserved.</p>
                </Container>
            </footer>
        </>
    );
};

export default AboutPage;
