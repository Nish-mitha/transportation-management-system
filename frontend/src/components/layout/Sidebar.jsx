import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Truck, User, Settings, LogOut, ChevronDown, ChevronRight, BarChart2, FileText } from 'lucide-react';

const Sidebar = ({ isOpen, user }) => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState(['shipments']); // Default expanded

    const toggleSubMenu = (key) => {
        setExpandedMenus(prev =>
            prev.includes(key)
                ? prev.filter(k => k !== key)
                : [...prev, key]
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
                <div className="sidebar-group">
                    <Link to="/" className={`sidebar-item ${isActive('/')}`}>
                        <div className="sidebar-item-content">
                            <Home size={20} />
                            <span>Overview</span>
                        </div>
                    </Link>

                    {/* Shipment Menu with Sub-menu */}
                    <div className="sidebar-item-group">
                        <div
                            className={`sidebar-item has-submenu ${expandedMenus.includes('shipments') ? 'expanded' : ''}`}
                            onClick={() => toggleSubMenu('shipments')}
                        >
                            <div className="sidebar-item-content">
                                <Truck size={20} />
                                <span>Shipments</span>
                            </div>
                            {expandedMenus.includes('shipments') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>

                        {expandedMenus.includes('shipments') && (
                            <div className="sidebar-submenu">
                                <Link to="/shipments" className={`sidebar-subitem ${isActive('/shipments')}`}>
                                    <span>All Shipments</span>
                                </Link>
                                <Link to="/shipments/active" className={`sidebar-subitem ${isActive('/shipments/active')}`}>
                                    <span>Active</span>
                                </Link>
                                <Link to="/shipments/history" className={`sidebar-subitem ${isActive('/shipments/history')}`}>
                                    <span>History</span>
                                </Link>
                            </div>
                        )}
                    </div>


                    {user?.role === 'ADMIN' && (
                        <Link to="/analytics" className={`sidebar-item ${isActive('/analytics')}`}>
                            <div className="sidebar-item-content">
                                <BarChart2 size={20} />
                                <span>Analytics</span>
                            </div>
                        </Link>
                    )}

                    <Link to="/docs" className={`sidebar-item ${isActive('/docs')}`}>
                        <div className="sidebar-item-content">
                            <FileText size={20} />
                            <span>Docs</span>
                        </div>
                    </Link>
                </div>

                <div className="sidebar-divider"></div>

                <div className="sidebar-group">
                    <div className="sidebar-label">SETTINGS</div>
                    <Link to="/profile" className={`sidebar-item ${isActive('/profile')}`}>
                        <div className="sidebar-item-content">
                            <User size={20} />
                            <span>Profile</span>
                        </div>
                    </Link>
                    <Link to="/preferences" className={`sidebar-item ${isActive('/preferences')}`}>
                        <div className="sidebar-item-content">
                            <Settings size={20} />
                            <span>Preferences</span>
                        </div>
                    </Link>
                </div>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <div className="sidebar-item-content">
                            <LogOut size={18} />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
