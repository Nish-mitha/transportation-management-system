import React from 'react';
import { X, MapPin, Calendar, Truck, Package, DollarSign, User, AlertCircle, Clock } from 'lucide-react';
import './ShipmentDetail.css';

const ShipmentDetail = ({ shipment, onClose, onEdit }) => {
  if (!shipment) return null;

  return (
    <div className="detail-overlay">
      <div className="detail-modal glass-panel">
        <div className="detail-header">
          <div className="header-left">
            <h2>Shipment Details</h2>
            <span className="shipment-id">{shipment.id}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="detail-content">
          <div className="status-banner">
            <div className={`status-pill ${shipment.status.toLowerCase().replace(' ', '-')}`}>
              {shipment.status}
            </div>
            <div className="priority-pill">
              <AlertCircle size={16} />
              {shipment.priority} Priority
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <h3>Route</h3>
              <div className="route-detail">
                <div className="location-row">
                  <div className="dot origin"></div>
                  <div>
                    <label>Origin</label>
                    <p>{shipment.origin}</p>
                  </div>
                </div>
                <div className="route-connector"></div>
                <div className="location-row">
                  <div className="dot dest"></div>
                  <div>
                    <label>Destination</label>
                    <p>{shipment.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <h3>Logistics</h3>
              <div className="info-row">
                <Truck size={18} className="icon" />
                <div>
                  <label>Carrier</label>
                  <p>{shipment.carrier}</p>
                </div>
              </div>
              <div className="info-row">
                <Package size={18} className="icon" />
                <div>
                  <label>Type / Weight</label>
                  <p>{shipment.type} • {shipment.weight}</p>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <h3>Financials</h3>
              <div className="info-row">
                <DollarSign size={18} className="icon" />
                <div>
                  <label>Cost</label>
                  <p className="cost-val">{shipment.cost}</p>
                </div>
              </div>
              <div className="info-row">
                <User size={18} className="icon" />
                <div>
                  <label>Customer</label>
                  <p>{shipment.customer}</p>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <h3>Timeline</h3>
              <div className="info-row">
                <Calendar size={18} className="icon" />
                <div>
                  <label>Scheduled Date</label>
                  <p>{shipment.date}</p>
                </div>
              </div>
              <div className="info-row">
                <Clock size={18} className="icon" />
                <div>
                  <label>Estimated Arrival</label>
                  <p>In 2 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={() => onEdit(shipment)}>Edit Shipment</button>
        </div>
      </div>

    </div>
  );
};

export default ShipmentDetail;
