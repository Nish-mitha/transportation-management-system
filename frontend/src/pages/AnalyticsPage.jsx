import React from 'react';
import { BarChart2, TrendingUp, Package, Clock, CheckCircle } from 'lucide-react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_SHIPMENTS = gql`
  query GetShipments($limit: Int) {
    shipments(limit: $limit) {
      id
      status
      rate
    }
  }
`;

const AnalyticsPage = () => {
    const { loading, error, data } = useQuery(GET_SHIPMENTS, {
        variables: { limit: 1000 }
    });

    if (loading) return <div className="page-container"><p>Loading analytics...</p></div>;
    if (error) return <div className="page-container"><p>Error loading analytics: {error.message}</p></div>;

    const shipments = data?.shipments || [];
    const totalShipments = shipments.length;

    // Status counts
    const statusCounts = shipments.reduce((acc, s) => {
        acc[s.status] = (acc[s.status] || 0) + 1;
        return acc;
    }, {});

    const completedShipments = statusCounts['DELIVERED'] || 0;
    const pendingShipments = statusCounts['PENDING'] || 0;
    const inTransitShipments = statusCounts['IN_TRANSIT'] || 0;
    const delayedShipments = statusCounts['DELAYED'] || 0;
    const cancelledShipments = statusCounts['CANCELLED'] || 0;

    const activeShipments = pendingShipments + inTransitShipments + delayedShipments;
    const completionRate = totalShipments > 0 ? ((completedShipments / totalShipments) * 100).toFixed(1) : 0;

    // Financial calculations
    const totalRevenue = shipments.reduce((sum, s) => sum + (s.rate || 0), 0);
    const avgRate = totalShipments > 0 ? (totalRevenue / totalShipments).toFixed(2) : 0;

    const stats = [
        { label: 'Total Shipments', value: totalShipments, icon: <Package size={24} />, color: 'var(--primary)' },
        { label: 'Active', value: activeShipments, icon: <Clock size={24} />, color: 'var(--warning)' },
        { label: 'Completed', value: completedShipments, icon: <CheckCircle size={24} />, color: 'var(--success)' },
        { label: 'Completion Rate', value: `${completionRate}%`, icon: <TrendingUp size={24} />, color: '#8b5cf6' },
    ];

    const getStatusWidth = (count) => totalShipments > 0 ? `${(count / totalShipments) * 100}%` : '0%';

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Analytics</h1>
                    <p className="page-subtitle">Real-time performance metrics and logistics overview</p>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card glass-panel">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="charts-section">
                <div className="chart-container glass-panel">
                    <h3 className="chart-title">Shipment Status Distribution</h3>
                    <div className="bar-chart">
                        <div className="bar-item">
                            <div className="bar-label">Delivered</div>
                            <div className="bar-wrapper">
                                <div className="bar" style={{ width: getStatusWidth(completedShipments), backgroundColor: 'var(--success)' }}></div>
                                <span className="bar-value">{completedShipments}</span>
                            </div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">In Transit</div>
                            <div className="bar-wrapper">
                                <div className="bar" style={{ width: getStatusWidth(inTransitShipments), backgroundColor: 'var(--primary)' }}></div>
                                <span className="bar-value">{inTransitShipments}</span>
                            </div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">Pending</div>
                            <div className="bar-wrapper">
                                <div className="bar" style={{ width: getStatusWidth(pendingShipments), backgroundColor: 'var(--warning)' }}></div>
                                <span className="bar-value">{pendingShipments}</span>
                            </div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">Delayed</div>
                            <div className="bar-wrapper">
                                <div className="bar" style={{ width: getStatusWidth(delayedShipments), backgroundColor: 'var(--danger)' }}></div>
                                <span className="bar-value">{delayedShipments}</span>
                            </div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">Cancelled</div>
                            <div className="bar-wrapper">
                                <div className="bar" style={{ width: getStatusWidth(cancelledShipments), backgroundColor: 'var(--text-secondary)' }}></div>
                                <span className="bar-value">{cancelledShipments}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chart-container glass-panel">
                    <h3 className="chart-title">Financial Overview</h3>
                    <div className="revenue-summary">
                        <div className="revenue-item">
                            <span className="revenue-label">Total Volume (Est. Revenue)</span>
                            <span className="revenue-value">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="revenue-item">
                            <span className="revenue-label">Average Shipment Rate</span>
                            <span className="revenue-value">${avgRate}</span>
                        </div>
                        <div className="revenue-item">
                            <span className="revenue-label">Active Shipment Value</span>
                            <span className="revenue-value">
                                ${(shipments
                                    .filter(s => ['PENDING', 'IN_TRANSIT', 'DELAYED'].includes(s.status))
                                    .reduce((sum, s) => sum + (s.rate || 0), 0))
                                    .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .stat-card {
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                }

                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-info {
                    display: flex;
                    flex-direction: column;
                }

                .stat-label {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .charts-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                .chart-container {
                    padding: 1.5rem;
                    border-radius: var(--radius-lg);
                }

                .chart-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: var(--text-primary);
                }

                .bar-chart {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .bar-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .bar-label {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .bar-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(255,255,255,0.05);
                    border-radius: 4px;
                    height: 24px;
                    overflow: hidden;
                    position: relative;
                }

                .bar {
                    height: 100%;
                    transition: width 0.6s ease-out;
                }

                .bar-value {
                    position: absolute;
                    right: 10px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

                .revenue-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .revenue-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid var(--glass-border);
                }

                .revenue-label {
                    color: var(--text-secondary);
                }

                .revenue-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default AnalyticsPage;
