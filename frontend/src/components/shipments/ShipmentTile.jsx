import React, { useState } from 'react';
import { MoreVertical, MapPin, Calendar, Truck, Package } from 'lucide-react';

const ShipmentTile = ({ shipment, onClick, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleAction = (action, e) => {
    e.stopPropagation();
    if (action === 'Edit' && onEdit) {
      onEdit(shipment);
    }
    console.log(`${action} shipment ${shipment.id}`);
    setShowMenu(false);
  };

  return (
    <div className="shipment-tile glass-panel" onClick={() => onClick(shipment)}>
      <div className="tile-header">
        <div className="tile-id">
          <Truck size={16} />
          <span>{shipment.id}</span>
        </div>
        <div className="tile-actions">
          <span className={`status-badge small ${shipment.status.toLowerCase().replace(' ', '-')}`}>
            {shipment.status}
          </span>
          <div className="menu-container">
            <button className="icon-btn bun-btn" onClick={handleMenuClick}>
              <MoreVertical size={18} />
            </button>
            {showMenu && (
              <div className="dropdown-menu glass-panel">
                <div onClick={(e) => handleAction('Edit', e)} className="dropdown-item">Edit</div>
                <div onClick={(e) => handleAction('Delete', e)} className="dropdown-item delete">Delete</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tile-body">
        <div className="route-info">
          <div className="location">
            <div className="dot origin"></div>
            <span>{shipment.origin.split(',')[0]}</span>
          </div>
          <div className="route-line"></div>
          <div className="location">
            <div className="dot dest"></div>
            <span>{shipment.destination.split(',')[0]}</span>
          </div>
        </div>

        <div className="tile-details">
          <div className="detail-item">
            <Calendar size={14} />
            <span>{shipment.date}</span>
          </div>
          <div className="detail-item">
            <Package size={14} />
            <span>{shipment.weight}</span>
          </div>
          <div className="detail-item cost">
            <span>{shipment.cost}</span>
          </div>
        </div>
      </div>

      <style>{`
        .shipment-tile {
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          position: relative;
        }
        
        .shipment-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.4);
          background: rgba(30, 41, 59, 0.9);
        }

        .tile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .tile-id {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
        }

        .tile-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .menu-container {
          position: relative;
        }
        
        .bun-btn {
          padding: 4px;
          border-radius: 4px;
        }
        .bun-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          width: 120px;
          background: var(--bg-secondary);
          z-index: 10;
          border-radius: var(--radius-md);
          overflow: hidden;
          padding: 0.25rem;
        }

        .dropdown-item {
          padding: 0.5rem 0.75rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: 0.2s;
          border-radius: 4px;
        }
        
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }
        .dropdown-item.delete:hover {
          background: rgba(239, 68, 68, 0.2);
          color: var(--danger);
        }

        .route-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1rem;
          position: relative;
          padding-left: 1rem;
        }
        
        .route-line {
          position: absolute;
          left: 3px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: var(--glass-border);
        }

        .location {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        
        .location span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          z-index: 2;
        }
        .dot.origin { background: var(--primary); }
        .dot.dest { background: var(--success); }

        .tile-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          border-top: 1px solid var(--glass-border);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        
        .detail-item.cost {
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default ShipmentTile;
