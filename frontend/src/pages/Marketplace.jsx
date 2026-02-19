import { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import LoanCard from '../components/LoanCard';
import { Search, Filter } from 'lucide-react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';

const Marketplace = () => {
    const { getMarketplaceLoans } = useLoan();
    const [searchTerm, setSearchTerm] = useState('');
    const [minScore, setMinScore] = useState(0);

    const loans = getMarketplaceLoans();

    const filteredLoans = loans.filter((loan) => {
        return (
            loan.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loan.borrowerName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Container fluid>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <h2 className="fw-bold mb-0">Loan Marketplace</h2>

                <div className="d-flex gap-3 flex-column flex-sm-row">
                    <InputGroup>
                        <InputGroup.Text className="bg-white border-end-0">
                            <Search size={18} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search by purpose..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-start-0"
                        />
                    </InputGroup>

                    <InputGroup style={{ minWidth: '180px' }}>
                        <InputGroup.Text className="bg-white border-end-0">
                            <Filter size={16} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Select
                            value={minScore}
                            onChange={(e) => setMinScore(Number(e.target.value))}
                            className="border-start-0"
                        >
                            <option value={0}>All Scores</option>
                            <option value={700}>700+</option>
                            <option value={800}>800+</option>
                        </Form.Select>
                    </InputGroup>
                </div>
            </div>

            {filteredLoans.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <p className="fs-5">No active loan requests found matching your criteria.</p>
                </div>
            ) : (
                <Row className="g-4">
                    {filteredLoans.map((loan) => (
                        <Col key={loan.id} sm={6} lg={4} xl={3}>
                            <LoanCard loan={loan} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Marketplace;
