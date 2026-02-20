import { useAuth } from '../context/AuthContext';
import { useLoan } from '../context/LoanContext';
import StatCard from '../components/StatCard';
import LoanCard from '../components/LoanCard';
import { IndianRupee, CreditCard, Activity, Award, User, PlusCircle, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';

const Dashboard = () => {

    const { user } = useAuth();
    const { getUserLoans, loans } = useLoan();

    const { loansTaken, loansGiven } = getUserLoans(user.id);
    const totalBorrowed = loansTaken.reduce((acc, loan) => acc + (Number(loan.amount) || 0), 0);
    const totalLent = loansGiven.reduce((acc, loan) => acc + (Number(loan.amount) || 0), 0);
    const activeLoansCount = loansTaken.filter(l => l.status === 'ACTIVE').length;

    const recentActivity = loans ? loans.slice(0, 3) : [];

    return (
        <Container fluid className="py-4" style={{ backgroundColor: 'var(--background-color)', minHeight: '100%' }}>
            {/* NEW: TOP NAVIGATION BUTTONS (Mobile/Tablet friendly) */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                <Button as={Link} to="/dashboard" variant="primary" className="d-flex align-items-center gap-2">
                    <LayoutDashboard size={18} />
                    Dashboard
                </Button>
                <Button as={Link} to="/lend-money" variant="primary" className="d-flex align-items-center gap-2">
                    <PlusCircle size={18} />
                    Start Lending
                </Button>

                <Button as={Link} to="/profile" variant="outline-secondary" className="d-flex align-items-center gap-2">
                    <User size={18} />
                    Profile
                </Button>
            </div>

            {/* HEADER */}
            <div className="mb-4">
                <h2 className="fw-bold">Dashboard</h2>
                <p className="text-muted">
                    Welcome back, {user.name}
                </p>
            </div>

            {/* STAT CARDS */}
            <Row className="g-3 mb-4">
                <Col sm={6} xl={3}>
                    <StatCard
                        title="Total Lent"
                        value={`₹${totalLent}`}
                        icon={<IndianRupee size={24} />}
                        color="#10b981" // success hex
                    />
                </Col>
                <Col sm={6} xl={3}>
                    <StatCard
                        title="Total Borrowed"
                        value={`₹${totalBorrowed}`}
                        icon={<CreditCard size={24} />}
                        color="#f59e0b" // warning hex
                    />
                </Col>
                <Col sm={6} xl={3}>
                    <StatCard
                        title="Active Loans"
                        value={activeLoansCount}
                        icon={<Activity size={24} />}
                        color="#2563eb" // primary hex
                    />
                </Col>
                <Col sm={6} xl={3}>
                    <StatCard
                        title="Reputation Score"
                        value={user.reputation_score || 500}
                        icon={<Award size={24} />}
                        color="#64748b" // secondary hex
                    />
                </Col>
            </Row>

            {/* MAIN CONTENT GRID */}
            <Row className="g-4">
                {/* LEFT COLUMN: Recent Activity */}
                <Col lg={8}>
                    <section className="mb-4">
                        <h4 className="mb-3">Recent Activity</h4>
                        <div className="d-flex flex-column gap-3">
                            {recentActivity.map(loan => (
                                <LoanCard
                                    key={loan.id}
                                    loan={loan}
                                    showActions={false}
                                />
                            ))}
                        </div>
                    </section>
                </Col>

                {/* RIGHT COLUMN: Quick Actions & Baskets */}
                <Col lg={4}>
                    <section className="mb-4">
                        <h4 className="mb-3">Quick Actions</h4>
                        <Card className="border-0 shadow-sm">
                            <Card.Body>
                                <p className="text-muted mb-3">
                                    Need funds or want to help a peer?
                                </p>
                                <div className="d-grid gap-2">
                                    <Button as={Link} to="/create-loan" variant="primary" size="lg">
                                        Request Loan
                                    </Button>
                                    <Button as={Link} to="/marketplace" variant="outline-primary" size="lg">
                                        Browse Loans
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </section>

                    <section className="mb-4">
                        <h4 className="mb-3">Loan Baskets</h4>
                        <div className="d-flex flex-column gap-3">
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="fw-bold">Starter Basket</h6>
                                    <p className="text-muted small mb-1">Low risk loans for beginners</p>
                                    <div className="text-success fw-bold small">Return: 8%</div>
                                </Card.Body>
                            </Card>
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="fw-bold">Growth Basket</h6>
                                    <p className="text-muted small mb-1">Balanced risk and return</p>
                                    <div className="text-primary fw-bold small">Return: 12%</div>
                                </Card.Body>
                            </Card>
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="fw-bold">High Yield Basket</h6>
                                    <p className="text-muted small mb-1">Higher return loans</p>
                                    <div className="text-danger fw-bold small">Return: 16%</div>
                                </Card.Body>
                            </Card>
                        </div>
                    </section>
                </Col>
            </Row>

            {/* FAQ SECTION */}
            <section className="mt-4 mb-4">
                <h4 className="mb-3">Frequently Asked Questions</h4>
                <Accordion defaultActiveKey="0" className="shadow-sm">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is CampusCred?</Accordion.Header>
                        <Accordion.Body>
                            A peer-to-peer lending platform within your organization.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Is lending safe?</Accordion.Header>
                        <Accordion.Body>
                            Risk exists, but trust scores and verification reduce it.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>How do I earn returns?</Accordion.Header>
                        <Accordion.Body>
                            You earn interest when borrowers repay loans.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </section>

            {/* RISK DISCLAIMER */}
            <section className="mt-5 mb-5 p-4 bg-light rounded-3 border">
                <h5 className="mb-3 text-secondary">Risk Disclaimer</h5>
                <ul className="text-muted small mb-0 ps-3">
                    <li className="mb-2">
                        P2P lending returns are subject to risk.
                        Click here to understand the risk involved.
                    </li>
                    <li>
                        Principal Loss (NPA) is calculated after loan crosses
                        120 Days delay from the last due date.
                    </li>
                </ul>
            </section>
        </Container>
    );
};

export default Dashboard;