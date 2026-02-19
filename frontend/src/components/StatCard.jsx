import { Card } from 'react-bootstrap';

const StatCard = ({ title, value, icon, color }) => {
    return (
        <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex align-items-center">
                <div
                    className="rounded-circle p-3 d-flex align-items-center justify-content-center me-3"
                    style={{ backgroundColor: `${color}20`, color: color }}
                >
                    {icon}
                </div>
                <div>
                    <h6 className="text-muted mb-1 fw-medium">{title}</h6>
                    <h3 className="mb-0 fw-bold">{value}</h3>
                </div>
            </Card.Body>
        </Card>
    );
};

export default StatCard;
