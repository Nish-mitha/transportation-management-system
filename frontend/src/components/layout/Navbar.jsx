import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck, Bell } from 'lucide-react';

const Navbar = ({ isMenuOpen, setIsMenuOpen, user }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar glass-panel">
            <div className="nav-left">
                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="logo">
                    <Truck className="logo-icon" size={28} />
                    <span className="logo-text">VORTEX TMS</span>
                </div>
            </div>

            <div className="nav-items">
                <Link to="/" className={`nav-link ${isActive('/')}`}>Dashboard</Link>
                <Link to="/shipments" className={`nav-link ${isActive('/shipments')}`}>Shipments</Link>
                <Link to="/analytics" className={`nav-link ${isActive('/analytics')}`}>Analytics</Link>
            </div>

            <div className="nav-right">
                <button className="icon-btn"><Bell size={20} /></button>
                <div className="user-profile">
                    <div className="avatar">{user?.username?.[0].toUpperCase() || 'U'}</div>
                    <div className="user-info">
                        <span className="user-name">{user?.username || 'User'}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
