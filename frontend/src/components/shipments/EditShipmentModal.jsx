import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment(
    $id: ID!
    $shipperName: String
    $carrierName: String
    $pickupLocation: String
    $deliveryLocation: String
    $status: ShipmentStatus
    $rate: Float
  ) {
    updateShipment(
      id: $id
      shipperName: $shipperName
      carrierName: $carrierName
      pickupLocation: $pickupLocation
      deliveryLocation: $deliveryLocation
      status: $status
      rate: $rate
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

const EditShipmentModal = ({ shipment, onClose, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        shipperName: shipment.customer || shipment.shipperName,
        carrierName: shipment.carrier || shipment.carrierName,
        pickupLocation: shipment.origin || shipment.pickupLocation,
        deliveryLocation: shipment.destination || shipment.deliveryLocation,
        status: shipment.status,
        rate: parseFloat(shipment.cost?.replace('$', '') || shipment.rate || 0)
    });

    const [updateShipment, { loading, error }] = useMutation(UPDATE_SHIPMENT, {
        onCompleted: (data) => {
            onUpdateSuccess(data.updateShipment);
            onClose();
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rate' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateShipment({
            variables: {
                id: shipment.id,
                ...formData
            }
        });
    };

    return (
        <div className="modal-overlay" style={{ zIndex: 1000 }}>
            <div className="modal-content glass-panel" style={{ maxWidth: '500px', padding: '2rem' }}>
                <div className="modal-header" style={{ border: 'none', padding: 0, marginBottom: '2rem' }}>
                    <h2>Edit Shipment</h2>
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
                            />
                        </div>
                        <div className="form-group">
                            <label>Carrier Name</label>
                            <input
                                name="carrierName"
                                value={formData.carrierName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Pickup Location</label>
                            <input
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Delivery Location</label>
                            <input
                                name="deliveryLocation"
                                value={formData.deliveryLocation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                <option value="PENDING">Pending</option>
                                <option value="IN_TRANSIT">In Transit</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="DELAYED">Delayed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Rate ($)</label>
                            <input
                                type="number"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="error-message" style={{ color: 'var(--danger)', marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <AlertCircle size={16} />
                            {error.message}
                        </div>
                    )}

                    <div className="form-actions" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            <Save size={18} style={{ marginRight: '0.5rem' }} />
                            {loading ? 'Saving...' : 'Save Changes'}
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

export default EditShipmentModal;
