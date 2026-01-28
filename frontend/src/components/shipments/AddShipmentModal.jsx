import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

const ADD_SHIPMENT = gql`
  mutation AddShipment(
    $shipperName: String!
    $carrierName: String!
    $pickupLocation: String!
    $deliveryLocation: String!
    $trackingNumber: String
    $status: ShipmentStatus
    $rate: Float
    $estimatedDelivery: String
  ) {
    addShipment(
      shipperName: $shipperName
      carrierName: $carrierName
      pickupLocation: $pickupLocation
      deliveryLocation: $deliveryLocation
      trackingNumber: $trackingNumber
      status: $status
      rate: $rate
      estimatedDelivery: $estimatedDelivery
    ) {
      id
      status
      shipperName
      carrierName
      pickupLocation
      deliveryLocation
      rate
      estimatedDelivery
    }
  }
`;

const AddShipmentModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        shipperName: '',
        carrierName: '',
        pickupLocation: '',
        deliveryLocation: '',
        trackingNumber: '',
        status: 'PENDING',
        rate: 0,
        estimatedDelivery: ''
    });

    const [addShipment, { loading, error }] = useMutation(ADD_SHIPMENT, {
        onCompleted: (data) => {
            onSuccess(data.addShipment);
            onClose();
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rate' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addShipment({
            variables: formData
        });
    };

    return (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
            <div className="modal-content glass-panel" style={{ maxWidth: '500px', padding: '2rem' }}>
                <div className="modal-header" style={{ border: 'none', padding: 0, marginBottom: '2rem' }}>
                    <h2>Add New Shipment</h2>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-grid">

                        <div className="form-group">
                            <label>Shipper Name</label>
                            <input
                                name="shipperName"
                                value={formData.shipperName}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Acme Corp"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Carrier Name</label>
                            <input
                                name="carrierName"
                                value={formData.carrierName}
                                onChange={handleChange}
                                required
                                placeholder="e.g. FastTrans"
                            />
                        </div>

                        <div className="form-group">
                            <label>Pickup Location</label>
                            <input
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleChange}
                                required
                                placeholder="City, State"
                            />
                        </div>
                        <div className="form-group">
                            <label>Delivery Location</label>
                            <input
                                name="deliveryLocation"
                                value={formData.deliveryLocation}
                                onChange={handleChange}
                                required
                                placeholder="City, State"
                            />
                        </div>

                        <div className="form-group">
                            <label>Tracking Number</label>
                            <input
                                name="trackingNumber"
                                value={formData.trackingNumber}
                                onChange={handleChange}
                                placeholder="e.g. TRK123456"
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                            >
                                <option value="PENDING" style={{ background: '#1e293b' }}>Pending</option>
                                <option value="IN_TRANSIT" style={{ background: '#1e293b' }}>In Transit</option>
                                <option value="DELIVERED" style={{ background: '#1e293b' }}>Delivered</option>
                                <option value="DELAYED" style={{ background: '#1e293b' }}>Delayed</option>
                                <option value="CANCELLED" style={{ background: '#1e293b' }}>Cancelled</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Estimated Delivery</label>
                            <input
                                type="date"
                                name="estimatedDelivery"
                                value={formData.estimatedDelivery}
                                onChange={handleChange}
                                required
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Rate ($)</label>
                            <input
                                type="number"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                required
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="error-message" style={{ color: 'var(--danger)', marginTop: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px' }}>
                            <AlertCircle size={16} />
                            {error.message}
                        </div>
                    )}

                    <div className="form-actions" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            <Plus size={18} style={{ marginRight: '0.5rem' }} />
                            {loading ? 'Creating...' : 'Create Shipment'}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .edit-form .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .edit-form .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .edit-form label {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }
                .edit-form input, .edit-form select {
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-sm);
                    padding: 0.6rem 0.8rem;
                    color: var(--text-primary);
                    outline: none;
                }
                .edit-form input:focus, .edit-form select:focus {
                    border-color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default AddShipmentModal;
