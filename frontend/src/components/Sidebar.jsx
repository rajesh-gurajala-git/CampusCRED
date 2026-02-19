import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, PlusCircle, Briefcase, User, ChevronLeft, ChevronRight, Banknote } from 'lucide-react';
import { Nav, Button } from 'react-bootstrap';

const Sidebar = ({ collapsed, onToggle }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
        { path: '/create-loan', icon: PlusCircle, label: 'Request Loan' },
        { path: '/lend-money', icon: Banknote, label: 'Lend Money' },
        { path: '/my-loans', icon: Briefcase, label: 'My Loans' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="d-flex flex-column h-100 bg-white border-end">
            {/* Toggle Button */}
            <div className="d-flex justify-content-end p-2 mt-3">
                <Button variant="light" size="sm" onClick={onToggle} className="p-1">
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </Button>
            </div>

            <Nav className="flex-column p-2" activeKey={location.pathname}>
                {navItems.map((item) => (
                    <Nav.Item key={item.path} className="mb-2">
                        <Nav.Link
                            as={Link}
                            to={item.path}
                            eventKey={item.path}
                            className={`d-flex align-items-center gap-3 text-dark rounded py-2 ${collapsed ? 'justify-content-center px-0' : 'px-3'}`}
                            title={collapsed ? item.label : ''}
                        >
                            <item.icon size={22} />
                            {!collapsed && <span>{item.label}</span>}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
};

export default Sidebar;
