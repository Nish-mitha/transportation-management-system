import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import ShipmentTile from '../components/shipments/ShipmentTile';
import ShipmentDetail from '../components/shipments/ShipmentDetail';
import EditShipmentModal from '../components/shipments/EditShipmentModal';
import { ChevronLeft, ChevronRight, Plus, ArrowUp, ArrowDown } from 'lucide-react';

const GET_SHIPMENTS = gql`
  query GetShipments($limit: Int, $offset: Int, $filter: ShipmentFilterInput, $sort: ShipmentSortInput) {
    shipments(limit: $limit, offset: $offset, filter: $filter, sort: $sort) {
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

const ShipmentsPage = ({ user }) => {
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [editingShipment, setEditingShipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const location = useLocation();

  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = useState({ field: 'createdAt', order: 'DESC' });

  const isHistory = location.pathname.includes('/history');
  const isActive = location.pathname.includes('/active');

  const getEffectiveFilter = () => {
    if (statusFilter !== 'ALL') return { status: statusFilter };
    if (isHistory) return { status: 'DELIVERED' };
    // isActive is more complex because it's multiple statuses, 
    // but the backend currently only supports single status filter.
    // For now, let's just pass the statusFilter if set.
    return null;
  };

  const { loading, error, data, refetch } = useQuery(GET_SHIPMENTS, {
    variables: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      filter: getEffectiveFilter(),
      sort: sortConfig
    }
  });

  const handleRowClick = (shipment) => {
    setSelectedShipment(shipment);
  };

  const handleEditClick = (shipment) => {
    setEditingShipment(shipment);
  };

  const handleCloseDetail = () => {
    setSelectedShipment(null);
  };

  const handleUpdateSuccess = () => {
    refetch();
    if (selectedShipment) {
      setSelectedShipment(null);
    }
  };

  const shipments = data?.shipments.map(s => ({
    ...s,
    customer: s.shipperName,
    carrier: s.carrierName,
    origin: s.pickupLocation,
    destination: s.deliveryLocation,
    weight: 'N/A',
    cost: `$${s.rate}`,
    date: new Date(s.estimatedDelivery).toLocaleDateString()
  })) || [];

  // Client-side filtering for active/history/search (since backend is limited)
  const filteredShipments = shipments.filter(shipment => {
    // Path-based filter (refinement)
    if (isHistory && shipment.status !== 'DELIVERED') return false;
    if (isActive && shipment.status === 'DELIVERED') return false;

    // Search filter
    const searchLower = searchTerm.toLowerCase();
    return (
      shipment.id.toLowerCase().includes(searchLower) ||
      (shipment.customer && shipment.customer.toLowerCase().includes(searchLower)) ||
      (shipment.carrier && shipment.carrier.toLowerCase().includes(searchLower)) ||
      (shipment.origin && shipment.origin.toLowerCase().includes(searchLower)) ||
      (shipment.destination && shipment.destination.toLowerCase().includes(searchLower))
    );
  });

  const pageTitle = isHistory ? 'Shipment History' : (isActive ? 'Active Shipments' : 'All Shipments');
  const pageSubtitle = isHistory ? 'View your completed deliveries' : (isActive ? 'Manage and track your current shipments' : 'Full overview of all shipments');

  if (loading && currentPage === 1) return <div className="page-container"><p>Loading shipments...</p></div>;
  if (error) return <div className="page-container"><p>Error loading shipments: {error.message}</p></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="title-section">
          <h1 className="page-title">{pageTitle}</h1>
          <p className="page-subtitle">{pageSubtitle}</p>
        </div>
        {!isHistory && !isActive && (
          <div className="filter-controls">
            <div className="search-bar glass-panel">
              <input
                type="text"
                placeholder="Search shipments..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <select
              className="status-dropdown glass-panel"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
              <option value="DELAYED">Delayed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        )}
      </div>

      <div className="content-wrapper">
        <div className="tile-grid">
          {filteredShipments.map((shipment) => (
            <ShipmentTile
              key={shipment.id}
              shipment={shipment}
              onClick={handleRowClick}
              onEdit={user?.role === 'ADMIN' ? handleEditClick : null}
            />
          ))}
        </div>
      </div>

      <div className="pagination-controls" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Page {currentPage}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="glass-panel"
            style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <ChevronLeft size={18} /> Prev
          </button>
          <button
            className="glass-panel"
            style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            disabled={shipments.length < pageSize}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {selectedShipment && (
        <ShipmentDetail
          shipment={selectedShipment}
          onClose={handleCloseDetail}
          onEdit={handleEditClick}
          user={user}
        />
      )}

      {editingShipment && (
        <EditShipmentModal
          shipment={editingShipment}
          onClose={() => setEditingShipment(null)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      <style>{`
        .page-container {
          animation: fadeEntry 0.4s ease-out;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          width: 250px;
          outline: none;
        }

        .status-dropdown {
          background: var(--glass);
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          outline: none;
          cursor: pointer;
        }

        .status-dropdown option {
          background: var(--bg-secondary);
          color: var(--text-primary);
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

        .tile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        @keyframes fadeEntry {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ShipmentsPage;
