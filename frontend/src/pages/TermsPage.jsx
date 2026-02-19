import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const TermsPage = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                        <GraduationCap size={24} />
                        CampusCred
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="py-5">
                <h1 className="mb-4">Terms and Conditions</h1>

                <h4>1. Platform Usage</h4>
                <p>
                    CampusCred provides a peer-to-peer lending platform exclusively for verified
                    members within an organization. Users must provide accurate and truthful
                    information during registration.
                </p>

                <h4>2. User Responsibility</h4>
                <p>
                    Users are fully responsible for their lending and borrowing decisions.
                    CampusCred acts only as a platform and does not guarantee repayment.
                </p>

                <h4>3. Account Security</h4>
                <p>
                    Users must maintain the confidentiality of their login credentials and
                    are responsible for all activity under their account.
                </p>

                <h4>4. Prohibited Activities</h4>
                <ul>
                    <li>Fraudulent activities</li>
                    <li>Providing false identity information</li>
                    <li>Unauthorized access attempts</li>
                </ul>

                <h4>5. Platform Rights</h4>
                <p>
                    CampusCred reserves the right to suspend accounts violating policies.
                </p>

                <p className="mt-4 text-muted">
                    Last updated: 2026
                </p>
            </Container>
        </>
    );
};

export default TermsPage;