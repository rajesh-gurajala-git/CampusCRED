import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Container } from 'react-bootstrap';

const Layout = () => {
    const { user } = useAuth();
    const [collapsed, setCollapsed] = useState(false);

    if (!user) {
        return (
            <div className="public-layout">
                <Navbar />
                <main className="content">
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100" style={{ '--sidebar-width': collapsed ? '80px' : '250px' }}>
            <Navbar />
            <Container fluid className="flex-grow-1 d-flex p-0 position-relative">
                {/* Sidebar Wrapper */}
                <div className="sidebar-wrapper d-none d-md-block bg-white position-fixed overflow-y-auto border-end"
                    style={{ zIndex: 1000, top: 'var(--navbar-height)', height: 'calc(100vh - var(--navbar-height))' }}>
                    <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
                </div>

                {/* Content Wrapper */}
                <div className="content-wrapper flex-grow-1 p-4 bg-light">
                    <Outlet />
                </div>
            </Container>
        </div>
    );
};

export default Layout;
