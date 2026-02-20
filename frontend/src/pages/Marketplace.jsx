import { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import LoanCard from '../components/LoanCard';
import { Search, Filter, IndianRupee, Clock, Percent, User } from 'lucide-react';
import { Container, Row, Col, Form, InputGroup, Tabs, Tab, Card, Badge } from 'react-bootstrap';

const Marketplace = () => {
    const { getMarketplaceLoans, getActiveLoans, lendingOffers } = useLoan();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('requests');

    const pendingLoans = getMarketplaceLoans();
    const activeLoans = getActiveLoans();

    const filterList = (list, field = 'purpose') => {
        return list.filter((item) => {
            const searchVal = item[field] || item.borrowerName || item.lenderName || '';
            return searchVal.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    return (
        <Container className="py-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-dark mb-2">Campus Marketplace</h1>
                <p className="text-muted">Explore active peer-to-peer lending opportunities at SRM AP</p>
            </div>

            <div className="d-flex justify-content-center mb-5">
                <InputGroup style={{ maxWidth: '600px' }} className="shadow-sm">
                    <InputGroup.Text className="bg-white border-end-0 border-primary border-opacity-25 ps-3">
                        <Search size={20} className="text-primary" />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search for students, purposes, or lenders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-start-0 border-primary border-opacity-25 py-3 ps-2"
                        style={{ fontSize: '1.1rem' }}
                    />
                </InputGroup>
            </div>

            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4 marketplace-tabs justify-content-center border-0"
                variant="pills"
            >
                <Tab eventKey="requests" title={`Loan Requests (${pendingLoans.length})`}>
                    <div className="pt-3">
                        {filterList(pendingLoans).length === 0 ? (
                            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-sm">
                                <p className="fs-5 mb-0">No active loan requests found.</p>
                            </div>
                        ) : (
                            <Row className="g-4">
                                {filterList(pendingLoans).map((loan) => (
                                    <Col key={loan.id} lg={4} md={6}>
                                        <LoanCard loan={loan} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                </Tab>

                <Tab eventKey="ecosystem" title={`Active Ecosystem (${activeLoans.length})`}>
                    <div className="pt-3">
                        {filterList(activeLoans).length === 0 ? (
                            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-sm">
                                <p className="fs-5 mb-0">No funded loans are currently active.</p>
                            </div>
                        ) : (
                            <Row className="g-4">
                                {filterList(activeLoans).map((loan) => (
                                    <Col key={loan.id} lg={4} md={6}>
                                        <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                                            <div className="bg-success py-2 px-3 text-white text-center small fw-bold">
                                                ACTIVE LOAN
                                            </div>
                                            <Card.Body className="p-4">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div>
                                                        <h3 className="fw-bold mb-0 text-primary">₹{loan.amount}</h3>
                                                        <small className="text-muted">To be repaid by {loan.repaymentDate}</small>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="d-flex align-items-center gap-2 mb-1">
                                                        <User size={16} className="text-muted" />
                                                        <span className="fw-semibold">{loan.borrowerName}</span>
                                                    </div>
                                                    <p className="text-muted mb-0 small">{loan.purpose}</p>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between text-muted small">
                                                    <span>Lender: <strong>{loan.lenderName}</strong></span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                </Tab>

                <Tab eventKey="offers" title={`Lender Offers (${lendingOffers.length})`}>
                    <div className="pt-3">
                        {filterList(lendingOffers, 'lenderName').length === 0 ? (
                            <div className="text-center py-5 text-muted bg-white rounded-4 shadow-sm">
                                <p className="fs-5 mb-0">No lending offers are currently available.</p>
                            </div>
                        ) : (
                            <Row className="g-4">
                                {filterList(lendingOffers, 'lenderName').map((offer) => (
                                    <Col key={offer.id} lg={4} md={6}>
                                        <Card className="border-0 shadow-sm rounded-4 h-100 hover-lift">
                                            <Card.Body className="p-4">
                                                <div className="d-flex align-items-center gap-3 mb-4">
                                                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                                        <IndianRupee size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="fw-bold mb-0">₹{offer.amount}</h4>
                                                        <small className="text-success fw-bold">OPEN OFFER</small>
                                                    </div>
                                                </div>

                                                <div className="d-flex gap-4 mb-4">
                                                    <div>
                                                        <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                                                            <Clock size={14} /> Duration
                                                        </div>
                                                        <div className="fw-bold">{offer.durationMonths} Months</div>
                                                    </div>
                                                    <div>
                                                        <div className="d-flex align-items-center gap-1 text-muted small mb-1">
                                                            <Percent size={14} /> Interest
                                                        </div>
                                                        <div className="fw-bold text-primary">{offer.interestRate}%</div>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-3 border-top">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className="avatar avatar-xs bg-light text-primary rounded-circle">
                                                                <User size={14} />
                                                            </div>
                                                            <span className="small fw-semibold">{offer.lenderName || 'Verified Lender'}</span>
                                                        </div>
                                                        <Badge bg="light" text="dark" className="fw-normal">
                                                            {offer.createdAt}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                </Tab>
            </Tabs>

            <style>{`
                .marketplace-tabs .nav-link {
                    padding: 0.8rem 1.5rem;
                    color: var(--bs-gray-600);
                    font-weight: 600;
                    margin: 0 0.5rem;
                    border-radius: 50px;
                    transition: all 0.2s;
                }
                .marketplace-tabs .nav-link:hover {
                    background-color: var(--bs-gray-100);
                }
                .marketplace-tabs .nav-link.active {
                    background-color: var(--bs-primary) !important;
                    color: white !important;
                    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.25);
                }
                .hover-lift { transition: transform 0.2s; }
                .hover-lift:hover { transform: translateY(-5px); }
            `}</style>
        </Container>
    );
};

export default Marketplace;
