import { Calendar, IndianRupee, User, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoan } from '../context/LoanContext';
import { useAuth } from '../context/AuthContext';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';

const LoanCard = ({ loan, showActions = true }) => {
    const { user } = useAuth();
    const { fundLoan, repayLoan } = useLoan();

    const isLender = user?.id === loan.lenderId;
    const isBorrower = user?.id === loan.borrowerId;
    const isPending = loan.status === 'PENDING';
    const isActive = loan.status === 'ACTIVE';

    const [isFunding, setIsFunding] = useState(false);
    const [isRepaying, setIsRepaying] = useState(false);

    const handleFund = async () => {
        setIsFunding(true);
        try {
            await fundLoan(loan.id, user);
            alert('Loan funded successfully on Algorand!');
        } catch (error) {
            console.error(error);
            alert('Failed to fund loan: ' + error.message);
        } finally {
            setIsFunding(false);
        }
    };

    const handleRepay = async () => {
        setIsRepaying(true);
        try {
            await repayLoan(loan.id);
            alert('Loan repayment marked on-chain!');
        } catch (error) {
            console.error(error);
            alert('Failed to repay loan: ' + error.message);
        } finally {
            setIsRepaying(false);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'ACTIVE': return 'primary';
            case 'PENDING': return 'warning';
            case 'REPAID': return 'success';
            case 'DEFAULTED': return 'danger';
            default: return 'secondary';
        }
    };

    return (
        <Card className="h-100 border-0 shadow-sm transition-hover">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0 fw-bold text-truncate">
                        <Link to={`/loans/${loan.id}`} className="text-decoration-none text-dark stretched-link">
                            {loan.purpose}
                        </Link>
                    </h5>
                    <Badge bg={getStatusVariant(loan.status)} pill>
                        {loan.status}
                    </Badge>
                </div>

                <div className="d-flex align-items-center gap-2 text-muted mb-3">
                    <User size={16} />
                    <small>{loan.borrowerName}</small>
                </div>

                <div className="border-top pt-3">
                    <Row>
                        <Col>
                            <small className="text-muted d-block">Amount</small>
                            <div className="d-flex align-items-center fw-bold fs-5 text-primary">
                                <IndianRupee size={16} />
                                {loan.amount}
                            </div>
                        </Col>
                        <Col className="text-end">
                            <small className="text-muted d-block">Due Date</small>
                            <div className="d-flex align-items-center justify-content-end gap-1 small fw-medium">
                                <Calendar size={14} />
                                {loan.repaymentDate}
                            </div>
                        </Col>
                    </Row>
                </div>

                {showActions && (
                    <div className="mt-3 position-relative" style={{ zIndex: 2 }}>
                        {isPending && !isBorrower && user && (
                            <Button
                                variant="primary"
                                className="w-100"
                                onClick={handleFund}
                                disabled={isFunding}
                            >
                                {isFunding ? 'Processing...' : 'Fund Loan'}
                            </Button>
                        )}
                        {isActive && isBorrower && (
                            <Button
                                variant="success"
                                className="w-100"
                                onClick={handleRepay}
                                disabled={isRepaying}
                            >
                                {isRepaying ? 'Processing...' : 'Mark as Repaid'}
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default LoanCard;
