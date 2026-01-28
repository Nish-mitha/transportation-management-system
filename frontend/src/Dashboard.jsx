import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import {
    Search,
    Filter,
    MoreVertical,
    LayoutGrid,
    List,
    X,
    Package,
    MapPin,
    Truck,
    DollarSign,
    ChevronLeft,
    ChevronRight,
    Plus,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import EditShipmentModal from './components/shipments/EditShipmentModal';
import AddShipmentModal from './components/shipments/AddShipmentModal';

const GET_SHIPMENTS = gql`
  query GetShipments($limit: Int, $offset: Int, $filter: ShipmentFilterInput, $sort: ShipmentSortInput) {
    shipments(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
      id
      status
      customer: shipperName
      carrier: carrierName
      origin: pickupLocation
      destination: deliveryLocation
      cost: rate
      date: estimatedDelivery
    }
  }
`;

// Helper for status colors
const getStatusColor = (status) => {
    if (!status) return 'status-unknown';
    const s = status.toUpperCase();
    switch (s) {
        case 'IN_TRANSIT': return 'status-in-transit';
        case 'DELIVERED': return 'status-delivered';
        case 'PENDING': return 'status-pending';
        case 'DELAYED': return 'status-delayed';
        case 'CANCELLED': return 'status-cancelled';
        default: return 'status-unknown';
    }
};

const Dashboard = ({ user }) => {
    const [viewMode, setViewMode] = useState('grid');
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [editingShipment, setEditingShipment] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Pagination & Sorting State
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [sortConfig, setSortConfig] = useState({ field: 'createdAt', order: 'DESC' });

    const { loading, error, data: queryData, refetch } = useQuery(GET_SHIPMENTS, {
        variables: {
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
            filter: statusFilter !== 'ALL' ? { status: statusFilter } : null,
            sort: sortConfig
        }
    });

    const handleEditClick = (shipment) => {
        setEditingShipment(shipment);
        setSelectedShipment(null);
    };

    const handleUpdateSuccess = () => {
        refetch();
    };

    const handleSort = (field) => {
        setSortConfig(prev => ({
            field,
            order: prev.field === field && prev.order === 'ASC' ? 'DESC' : 'ASC'
        }));
        setCurrentPage(1); // Reset to first page on sort
    };

    const shipments = queryData?.shipments.map(s => ({
        ...s,
        type: 'General',
        weight: 'N/A',
        priority: 'Standard',
        cost: `$${s.cost}`,
        date: new Date(s.date).toLocaleDateString()
    })) || [];

    // Client-side search (as backend currently only supports status/carrierName filtering)
    const filteredShipments = shipments.filter(shipment => {
        const searchLower = searchTerm.toLowerCase();
        return (
            shipment.id.toLowerCase().includes(searchLower) ||
            (shipment.customer && shipment.customer.toLowerCase().includes(searchLower)) ||
            (shipment.carrier && shipment.carrier.toLowerCase().includes(searchLower)) ||
            (shipment.origin && shipment.origin.toLowerCase().includes(searchLower)) ||
            (shipment.destination && shipment.destination.toLowerCase().includes(searchLower))
        );
    });

    if (loading && currentPage === 1) return <div className="loading">Loading shipments...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    const SortIcon = ({ field }) => {
        if (sortConfig.field !== field) return null;
        return sortConfig.order === 'ASC' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
    };

    return (
        <div className="dashboard">
            <header className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div>
                        <h1 className="page-title">Shipment Overview</h1>
                        <p className="page-subtitle">Manage and track your active consignments</p>
                    </div>
                    {user?.role === 'ADMIN' && (
                        <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                            <Plus size={18} style={{ marginRight: '0.5rem' }} />
                            Add Shipment
                        </button>
                    )}
                </div>
                <div className="header-actions">
                    <div className="filter-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div className="search-bar glass-panel" style={{ padding: '0 1rem', borderRadius: 'var(--radius-md)' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                style={{ background: 'transparent', border: 'none', color: 'white', padding: '0.6rem 0', outline: 'none', width: '180px' }}
                            />
                        </div>
                        <select
                            className="status-dropdown glass-panel"
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            style={{ background: 'var(--glass)', color: 'white', border: '1px solid var(--glass-border)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', outline: 'none' }}
                        >
                            <option value="ALL">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="IN_TRANSIT">In Transit</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="DELAYED">Delayed</option>
                        </select>
                    </div>
                    <div className="view-toggle glass-panel">
                        <button
                            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                            title="Grid View"
                        >
                            <List size={20} />
                        </button>
                        <button
                            className={`toggle-btn ${viewMode === 'tile' ? 'active' : ''}`}
                            onClick={() => setViewMode('tile')}
                            title="Tile View"
                        >
                            <LayoutGrid size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {filteredShipments.length === 0 ? (
                <div className="empty-state glass-panel">
                    <div className="empty-state-icon">
                        <Package size={48} strokeWidth={1} />
                    </div>
                    <h3 className="empty-state-title">No shipments found</h3>
                    <p className="empty-state-text">We couldn't find any shipments matching your search or filters.</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="table-container glass-panel">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID <SortIcon field="id" /></th>
                                <th>Status</th>
                                <th onClick={() => handleSort('shipperName')} style={{ cursor: 'pointer' }}>Customer <SortIcon field="shipperName" /></th>
                                <th onClick={() => handleSort('carrierName')} style={{ cursor: 'pointer' }}>Carrier <SortIcon field="carrierName" /></th>
                                <th onClick={() => handleSort('pickupLocation')} style={{ cursor: 'pointer' }}>Origin <SortIcon field="pickupLocation" /></th>
                                <th onClick={() => handleSort('deliveryLocation')} style={{ cursor: 'pointer' }}>Destination <SortIcon field="deliveryLocation" /></th>
                                <th onClick={() => handleSort('rate')} style={{ cursor: 'pointer' }}>Cost <SortIcon field="rate" /></th>
                                <th onClick={() => handleSort('estimatedDelivery')} style={{ cursor: 'pointer' }}>Date <SortIcon field="estimatedDelivery" /></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShipments.map((shipment) => (
                                <tr key={shipment.id} onClick={() => setSelectedShipment(shipment)} className="clickable-row">
                                    <td className="font-mono">{shipment.id}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusColor(shipment.status)}`}>
                                            {shipment.status}
                                        </span>
                                    </td>
                                    <td>{shipment.customer}</td>
                                    <td>{shipment.carrier}</td>
                                    <td>{shipment.origin}</td>
                                    <td>{shipment.destination}</td>
                                    <td>{shipment.cost}</td>
                                    <td>{shipment.date}</td>
                                    {user?.role === 'ADMIN' && (
                                        <td onClick={(e) => e.stopPropagation()}>
                                            <button className="icon-btn-sm" onClick={() => handleEditClick(shipment)}><MoreVertical size={16} /></button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="tiles-grid">
                    {filteredShipments.map((shipment) => (
                        <div key={shipment.id} className="shipment-card glass-panel" onClick={() => setSelectedShipment(shipment)}>
                            <div className="card-header">
                                <div className="card-id">{shipment.id}</div>
                                {user?.role === 'ADMIN' && (
                                    <button className="icon-btn-sm" onClick={(e) => { e.stopPropagation(); handleEditClick(shipment); }}>
                                        <MoreVertical size={18} />
                                    </button>
                                )}
                            </div>

                            <div className="route-visual">
                                <div className="location">
                                    <div className="dot start"></div>
                                    <span className="loc-name">{shipment.origin.split(',')[0]}</span>
                                </div>
                                <div className="route-line"></div>
                                <div className="location">
                                    <div className="dot end"></div>
                                    <span className="loc-name">{shipment.destination.split(',')[0]}</span>
                                </div>
                            </div>

                            <div className="card-details">
                                <div className="detail-item">
                                    <span className="label">Carrier</span>
                                    <span className="value">{shipment.carrier}</span>
                                </div>
                                <div className="detail-item">
                                    <span className={`status-badge ${getStatusColor(shipment.status)}`}>
                                        {shipment.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pagination-controls">
                <span className="page-info">
                    Page {currentPage}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        <ChevronLeft size={18} /> Prev
                    </button>
                    <button
                        className="pagination-btn"
                        disabled={shipments.length < pageSize}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Details Modal / Enhanced View */}
            {selectedShipment && (
                <div className="modal-overlay" onClick={() => setSelectedShipment(null)}>
                    <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedShipment(null)}>
                            <X size={24} />
                        </button>

                        <div className="modal-header">
                            <div className="modal-icon">
                                <Package size={32} />
                            </div>
                            <div>
                                <h2>Shipment {selectedShipment.id}</h2>
                                <span className={`status-badge ${getStatusColor(selectedShipment.status)}`}>
                                    {selectedShipment.status}
                                </span>
                            </div>
                        </div>

                        <div className="modal-body">
                            <section className="info-group">
                                <h3><MapPin size={18} /> Route Details</h3>
                                <div className="info-grid">
                                    <div>
                                        <label>Origin</label>
                                        <p>{selectedShipment.origin}</p>
                                    </div>
                                    <div className="arrow">→</div>
                                    <div>
                                        <label>Destination</label>
                                        <p>{selectedShipment.destination}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="info-group">
                                <h3><Truck size={18} /> Carrier Info</h3>
                                <div className="info-row">
                                    <div>
                                        <label>Carrier</label>
                                        <p>{selectedShipment.carrier}</p>
                                    </div>
                                    <div>
                                        <label>Type</label>
                                        <p className="font-mono">{selectedShipment.type}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="info-group">
                                <h3><DollarSign size={18} /> Financials</h3>
                                <div className="info-row">
                                    <div>
                                        <label>Cost</label>
                                        <p className="text-xl">{selectedShipment.cost}</p>
                                    </div>
                                    <div>
                                        <label>Date</label>
                                        <p>{selectedShipment.date}</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedShipment(null)}>Close</button>
                            {user?.role === 'ADMIN' && (
                                <button className="btn btn-primary" onClick={() => handleEditClick(selectedShipment)}>Edit Details</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .dashboard {
          padding-top: 1rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-subtitle {
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .glass-btn {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        
        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .view-toggle {
          display: flex;
          padding: 0.25rem;
          border-radius: var(--radius-md);
          gap: 0.25rem;
        }

        .toggle-btn {
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: transparent;
        }

        .toggle-btn:hover {
          color: var(--text-primary);
        }

        .toggle-btn.active {
          background: var(--bg-accent);
          color: var(--primary);
        }

        /* Table Styles */
        .table-container {
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .data-table th {
          text-align: left;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.2);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .data-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          color: var(--text-primary);
        }

        .clickable-row {
          cursor: pointer;
          transition: background 0.15s;
        }

        .clickable-row:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        /* Tile Grid Styles */
        .tiles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .shipment-card {
           padding: 1.5rem;
           border-radius: var(--radius-lg);
           transition: transform 0.2s, box-shadow 0.2s;
           cursor: pointer;
           position: relative;
        }

        .shipment-card:hover {
           transform: translateY(-4px);
           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
           border-color: var(--primary-glow);
        }

        .card-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 1.5rem;
        }

        .card-id {
           font-family: monospace;
           font-weight: 700;
           color: var(--text-secondary);
        }

        .route-visual {
           display: flex;
           align-items: center;
           gap: 1rem;
           margin-bottom: 1.5rem;
        }

        .location {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 0.25rem;
        }
        
        .dot {
           width: 10px;
           height: 10px;
           border-radius: 50%;
        }
        
        .dot.start { background: var(--primary); }
        .dot.end { background: var(--success); }
        
        .route-line {
           flex: 1;
           height: 2px;
           background: var(--bg-accent);
           position: relative;
           top: -8px;
        }

        .loc-name {
           font-size: 0.85rem;
           font-weight: 500;
        }

        .card-details {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding-top: 1rem;
           border-top: 1px solid var(--glass-border);
        }

        .detail-item .label {
           display: block;
           font-size: 0.75rem;
           color: var(--text-secondary);
           margin-bottom: 0.25rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .status-pending { color: #fbbf24; background: rgba(251, 191, 36, 0.1); }
        .status-in-transit { color: #60a5fa; background: rgba(96, 165, 250, 0.1); }
        .status-delivered { color: #34d399; background: rgba(52, 211, 153, 0.1); }
        .status-delayed { color: #f87171; background: rgba(248, 113, 113, 0.1); }
        .status-cancelled { color: #94a3b8; background: rgba(148, 163, 184, 0.1); }
        .status-unknown { color: #94a3b8; background: rgba(148, 163, 184, 0.1); }

        .font-mono { font-family: monospace; }
        .text-xl { font-size: 1.25rem; font-weight: 600; }

        /* Modal Styles */
        .modal-overlay {
           position: fixed;
           top: 0; left: 0; right: 0; bottom: 0;
           background: rgba(0, 0, 0, 0.7);
           backdrop-filter: blur(4px);
           z-index: 100;
           display: flex;
           align-items: center;
           justify-content: center;
           padding: 2rem;
        }

        .modal-content {
           width: 100%;
           max-width: 600px;
           border-radius: var(--radius-lg);
           background: #1e293b; 
           position: relative;
           animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
           from { transform: translateY(20px); opacity: 0; }
           to { transform: translateY(0); opacity: 1; }
        }

        .close-btn {
           position: absolute;
           top: 1rem;
           right: 1rem;
           background: none;
           color: var(--text-secondary);
        }
        
        .close-btn:hover { color: var(--text-primary); }

        .modal-header {
           padding: 2rem;
           border-bottom: 1px solid var(--glass-border);
           display: flex;
           align-items: center;
           gap: 1.5rem;
        }

        .modal-icon {
           width: 64px; 
           height: 64px;
           background: rgba(59, 130, 246, 0.1);
           border-radius: var(--radius-md);
           display: flex;
           align-items: center;
           justify-content: center;
           color: var(--primary);
        }

        .modal-body {
           padding: 2rem;
           display: flex;
           flex-direction: column;
           gap: 2rem;
        }

        .info-group h3 {
           font-size: 0.9rem;
           text-transform: uppercase;
           color: var(--text-secondary);
           margin-bottom: 1rem;
           display: flex;
           align-items: center;
           gap: 0.5rem;
        }

        .info-grid {
           display: flex;
           align-items: center;
           justify-content: space-between;
           background: rgba(0,0,0,0.2);
           padding: 1.5rem;
           border-radius: var(--radius-md);
        }

        .info-grid label, .info-row label {
           display: block;
           font-size: 0.8rem;
           color: var(--text-secondary);
           margin-bottom: 0.25rem;
        }
        
        .arrow {
           color: var(--text-secondary);
           font-size: 1.5rem;
        }

        .info-row {
           display: flex;
           gap: 3rem;
        }

        .modal-footer {
           padding: 1.5rem 2rem;
           border-top: 1px solid var(--glass-border);
           display: flex;
           justify-content: flex-end;
           gap: 1rem;
        }

        .btn {
           padding: 0.75rem 1.5rem;
           border-radius: var(--radius-md);
           font-weight: 600;
           transition: all 0.2s;
        }

        .btn-primary {
           background: var(--primary);
           color: white;
        }
        
        .btn-primary:hover { background: #2563eb; }

        .btn-secondary {
           background: transparent;
           border: 1px solid var(--glass-border);
           color: var(--text-primary);
        }
        
        .btn-secondary:hover { background: rgba(255,255,255,0.05); }

      `}</style>
            {editingShipment && (
                <EditShipmentModal
                    shipment={editingShipment}
                    onClose={() => setEditingShipment(null)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}

            {isAddModalOpen && (
                <AddShipmentModal
                    onClose={() => setIsAddModalOpen(false)}
                    onSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default Dashboard;
