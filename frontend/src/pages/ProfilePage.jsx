import React from 'react';
import { User, Mail, Shield, Clock, MapPin, Phone, Building } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
    // Dummy user data
    const user = {
        name: 'Admin User',
        role: 'System Administrator',
        email: 'admin@vortextms.com',
        id: 'ADM-001',
        department: 'Operations',
        location: 'New York, NY',
        phone: '+1 (555) 123-4567',
        lastLogin: 'Today, 10:23 AM',
        joinDate: 'Jan 15, 2023'
    };

    return (
        <div className="profile-container">
            <h1 className="page-title">User Profile</h1>
            <p className="page-subtitle">Manage your account information</p>

            <div className="profile-card glass-panel">
                <div className="profile-header">
                    <div className="profile-avatar-large">
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="profile-identity">
                        <h2>{user.name}</h2>
                        <span className="role-badge">{user.role}</span>
                    </div>
                </div>

                <div className="profile-grid">
                    <div className="info-group">
                        <h3>Personal Information</h3>
                        <div className="info-item">
                            <Mail size={18} />
                            <div>
                                <label>Email</label>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Phone size={18} />
                            <div>
                                <label>Phone</label>
                                <p>{user.phone}</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <MapPin size={18} />
                            <div>
                                <label>Location</label>
                                <p>{user.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-group">
                        <h3>Account Details</h3>
                        <div className="info-item">
                            <Shield size={18} />
                            <div>
                                <label>User ID</label>
                                <p className="font-mono">{user.id}</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Building size={18} />
                            <div>
                                <label>Department</label>
                                <p>{user.department}</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Clock size={18} />
                            <div>
                                <label>Last Login</label>
                                <p>{user.lastLogin}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ProfilePage;
