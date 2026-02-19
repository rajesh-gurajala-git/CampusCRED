import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Users, ArrowRight, GraduationCap, TrendingUp, Lock, BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const LandingPage = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    // Redirect Register/Signup to Login
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            heroRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="landing-page">
            <Navbar
                expand="lg"
                fixed="top"
                className={`landing-navbar ${scrolled ? 'scrolled' : ''}`}
                variant="dark"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                        <GraduationCap size={28} className="text-primary" />
                        <span className="fw-bold text-white">CampusCred</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto align-items-center">
                            <Nav.Link href="#lend" className="nav-link-custom">Lend Money</Nav.Link>
                            <Nav.Link href="#borrow" className="nav-link-custom">Borrow Money</Nav.Link>
                            <Nav.Link href="#features" className="nav-link-custom">Opportunities</Nav.Link>
                            <Nav.Link href="#features" className="nav-link-custom">Portfolio</Nav.Link>
                            <Nav.Link href="#insights" className="nav-link-custom">Insights</Nav.Link>
                            <Nav.Link href="#how-it-works" className="nav-link-custom">How it Works</Nav.Link>
                        </Nav>
                        <div className="d-flex gap-3 align-items-center mt-3 mt-lg-0">
                            <Button variant="link" className="text-white text-decoration-none fw-semibold" onClick={handleLogin}>
                                Log In
                            </Button>
                            <Button variant="primary" className="px-4 py-2 rounded-pill fw-bold" onClick={handleRegister}>
                                Sign Up
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <header className="hero-section">
                <div className="hero-content">
                    <div className="badge">For Students, By Students</div>
                    <h1>
                        Borrow & Lend <br />
                        <span className="gradient-text">Within your Campus</span>
                    </h1>
                    <p>
                        CampusCred is the first peer-to-peer lending platform designed exclusively for university students.
                        Build your credit score, fund your education, and support your peers with verified campus connections.
                    </p>
                    <div className="hero-buttons">
                        <button onClick={handleRegister} className="btn-large btn-primary border-0">
                            Sign Up Now <ArrowRight size={20} />
                        </button>
                        <Link to="/login" className="btn-large btn-outline text-decoration-none">
                            Log In
                        </Link>
                    </div>
                </div>
                <div className="hero-visual" ref={heroRef}>
                    <div className="glass-card card-1">
                        <ShieldCheck size={48} className="icon-shield" />
                        <h3>Secure</h3>
                        <p>Verified University ID</p>
                    </div>
                    <div className="glass-card card-2">
                        <Users size={48} className="icon-users" />
                        <h3>Community</h3>
                        <p>Peer-to-Peer Support</p>
                    </div>
                    <div className="glass-card card-3">
                        <Zap size={48} className="icon-zap" />
                        <h3>Fast</h3>
                        <p>Instant Funding</p>
                    </div>
                    <div className="abstract-shape shape-1"></div>
                    <div className="abstract-shape shape-2"></div>
                </div>
            </header>

            <section id="insights" className="stats-section">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-number">5k+</span>
                        <span className="stat-label">Students Verified</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">₹2M+</span>
                        <span className="stat-label">Loans Funded</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">98%</span>
                        <span className="stat-label">Repayment Rate</span>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="how-it-works-section">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Verify Identity</h3>
                        <p>Sign up with your official university email (e.g., .edu) to verify your student status instantly.</p>
                    </div>
                    <div className="step-line"></div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Request or Lend</h3>
                        <p>Post a loan request for books, tuition, or living expenses, or browse requests to lend spare cash.</p>
                    </div>
                    <div className="step-line"></div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Repay & Build</h3>
                        <p>Repay on time to boost your internal credit score, unlocking higher limits and lower rates.</p>
                    </div>
                </div>
            </section>

            <section className="use-cases-section">
                <div id="borrow" className="use-case-card borrower">
                    <div className="use-case-content">
                        <BookOpen size={40} className="mb-4 text-blue-400" />
                        <h3>For Borrowers</h3>
                        <ul>
                            <li>Fund textbooks & software licenses</li>
                            <li>Cover unexpected gap semester costs</li>
                            <li>Build credit history early</li>
                            <li>Low interest rates from peers</li>
                        </ul>
                        <button onClick={handleRegister} className="btn-outline mt-6">Apply for Loan</button>
                    </div>
                </div>
                <div id="lend" className="use-case-card lender">
                    <div className="use-case-content">
                        <TrendingUp size={40} className="mb-4 text-green-400" />
                        <h3>For Lenders</h3>
                        <ul>
                            <li>Earn interest on spare cash</li>
                            <li>Help fellow students succeed</li>
                            <li>Diversified risk with small amounts</li>
                            <li>Transparent borrower profiles</li>
                        </ul>
                        <button onClick={handleRegister} className="btn-outline mt-6">Start Investing</button>
                    </div>
                </div>
            </section>

            <section id="features" className="features-section">
                <h2>Why CampusCred?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-wrapper color-1">
                            <ShieldCheck size={32} />
                        </div>
                        <h3>Trust-Based Lending</h3>
                        <p>Your reputation is your currency. We use social verification and academic standing to build a trust score that matters.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper color-2">
                            <Zap size={32} />
                        </div>
                        <h3>Instant Access</h3>
                        <p>No banks, no long forms. Get funded by your peers in minutes, not days. Simple, transparent, and fast.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper color-3">
                            <Users size={32} />
                        </div>
                        <h3>Community Powered</h3>
                        <p>Join a network of students helping students. Lend spare cash and earn trust within your university ecosystem.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper color-2">
                            <Lock size={32} />
                        </div>
                        <h3>Secure Transactions</h3>
                        <p>All transactions are encrypted and secure. We prioritize your privacy and data security above all else.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Join the Revolution?</h2>
                <p>Start building your financial future today with CampusCred.</p>
                <button onClick={handleRegister} className="btn-large btn-primary border-0">Create Free Account</button>
            </section>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <GraduationCap size={24} />
                        <span>CampusCred</span>
                    </div>
                    <div className="footer-links">
                        <Link to="/about">About</Link>
                        <Link to="/terms">Terms</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
                <p>&copy; 2026 CampusCred. Built for the future.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
