import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const PrivacyPage = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                        <GraduationCap size={24} />
                        CampusCred
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container className="py-5">
                <h1 className="mb-4">Privacy Policy</h1>

                <h4>Information We Collect</h4>
                <p>
                    We collect personal information such as name, email, and organizational
                    credentials to verify identity and ensure platform security.
                </p>

                <h4>How We Use Information</h4>
                <ul>
                    <li>Account authentication</li>
                    <li>Transaction processing</li>
                    <li>Trust score calculation</li>
                </ul>

                <h4>Data Security</h4>
                <p>
                    We implement encryption and secure authentication to protect user data.
                </p>

                <h4>Data Sharing</h4>
                <p>
                    CampusCred does not sell or share personal information with third parties.
                </p>

                <h4>User Rights</h4>
                <p>
                    Users may request account deletion or data removal.
                </p>

                <p className="mt-4 text-muted">
                    Last updated: 2026
                </p>
            </Container>
        </>
    );
};

export default PrivacyPage;