import React, { useState } from "react";
import { Container, Form, Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const ContactPage = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message submitted successfully");
    };

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

            <Container className="py-5" style={{ maxWidth: "600px" }}>
                <h1 className="mb-4">Contact Us</h1>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="message"
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Submit
                    </Button>

                </Form>

            </Container>
        </>
    );
};

export default ContactPage;