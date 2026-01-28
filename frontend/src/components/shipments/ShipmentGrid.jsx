import React from 'react';

const ShipmentGrid = ({ shipments, onRowClick }) => {
    return (
        <div className="table-container glass-panel">
            <table className="shipment-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Carrier</th>
                        <th>Type</th>
                        <th>Weight</th>
                        <th>Cost</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map((shipment) => (
                        <tr key={shipment.id} onClick={() => onRowClick(shipment)}>
                            <td className="font-mono">{shipment.id}</td>
                            <td>
                                <span className={`status-badge ${shipment.status.toLowerCase().replace(' ', '-')}`}>
                                    {shipment.status}
                                </span>
                            </td>
                            <td>{shipment.origin}</td>
                            <td>{shipment.destination}</td>
                            <td>{shipment.customer}</td>
                            <td>{shipment.date}</td>
                            <td>{shipment.carrier}</td>
                            <td>{shipment.type}</td>
                            <td>{shipment.weight}</td>
                            <td>{shipment.cost}</td>
                            <td>
                                <span className={`priority-indicator ${shipment.priority.toLowerCase()}`}>
                                    {shipment.priority}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style>{`
        .table-container {
          overflow-x: auto;
          border-radius: var(--radius-md);
        }
        
        .shipment-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px; /* Force scroll on small screens */
        }
        
        .shipment-table th {
          text-align: left;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.85rem;
          border-bottom: 1px solid var(--glass-border);
        }
        
        .shipment-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .shipment-table tr:hover td {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
          color: var(--primary);
        }
        
        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .status-badge.delivered { background: rgba(16, 185, 129, 0.2); color: var(--success); }
        .status-badge.in-transit { background: rgba(59, 130, 246, 0.2); color: var(--primary); }
        .status-badge.pending { background: rgba(245, 158, 11, 0.2); color: var(--warning); }
        .status-badge.delayed { background: rgba(239, 68, 68, 0.2); color: var(--danger); }
        
        .priority-indicator {
           font-size: 0.75rem;
           font-weight: 500;
        }
        .priority-indicator.critical { color: var(--danger); font-weight: 700; }
        .priority-indicator.high { color: var(--warning); }
        .priority-indicator.medium { color: var(--primary); }
        .priority-indicator.low { color: var(--text-secondary); }
      `}</style>
        </div>
    );
};

export default ShipmentGrid;
