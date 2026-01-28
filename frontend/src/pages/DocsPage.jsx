import React from 'react';
import {
    Cpu,
    Layers,
    ShieldCheck,
    BarChart,
    Settings,
    Zap,
    ListFilter,
    History,
    Search,
    BookOpen
} from 'lucide-react';

const DocsPage = () => {
    return (
        <div className="docs-page">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Project Documentation</h1>
                    <p className="page-subtitle">Architecture, Features, and Implementation Details</p>
                </div>
                <BookOpen size={40} className="text-primary" />
            </header>

            <div className="docs-grid">
                <section className="docs-card glass-panel">
                    <div className="docs-card-header">
                        <Cpu size={24} />
                        <h2>Tech Stack</h2>
                    </div>
                    <div className="docs-card-body">
                        <ul>
                            <li><strong>Frontend:</strong> React, Apollo Client (GraphQL), Vite</li>
                            <li><strong>Backend:</strong> Node.js, Apollo Server, Express</li>
                            <li><strong>Styling:</strong> Vanilla CSS with CSS Variables & Glassmorphism</li>
                            <li><strong>Icons:</strong> Lucide React</li>
                            <li><strong>State:</strong> GraphQL queries/mutations with local React state</li>
                        </ul>
                    </div>
                </section>

                <section className="docs-card glass-panel">
                    <div className="docs-card-header">
                        <ShieldCheck size={24} />
                        <h2>Security & RBAC</h2>
                    </div>
                    <div className="docs-card-body">
                        <p>Implemented Role-Based Access Control (RBAC) across full-stack:</p>
                        <ul>
                            <li><strong>Admin:</strong> Full CRUD access, Analytics, User Management.</li>
                            <li><strong>Employee:</strong> Read-only access to shipments, restricted from Editing and Analytics.</li>
                            <li><strong>Auth:</strong> JWT-based authentication with local storage session management.</li>
                        </ul>
                    </div>
                </section>

                <section className="docs-card glass-panel">
                    <div className="docs-card-header">
                        <Zap size={24} />
                        <h2>Performance & Optimization</h2>
                    </div>
                    <div className="docs-card-body">
                        <ul>
                            <li><strong>Pagination:</strong> Server-side slicing to handle large datasets efficiently.</li>
                            <li><strong>Data Limits:</strong> Configurable fetch limits for Analytics (1,000+) vs Dashboard (10).</li>
                            <li><strong>Timeouts:</strong> Implemented backend request timeouts and logging.</li>
                            <li><strong>Debouncing:</strong> Search and filter operations are optimized for responsiveness.</li>
                        </ul>
                    </div>
                </section>

                <section className="docs-card glass-panel">
                    <div className="docs-card-header">
                        <ListFilter size={24} />
                        <h2>Core Features</h2>
                    </div>
                    <div className="docs-card-body">
                        <ul>
                            <li><strong>Shipment Management:</strong> Grid/Tile views, detailed modals, and synced Create/Edit forms.</li>
                            <li><strong>Dynamic Sorting:</strong> Client-side and server-side ready sorting for all columns.</li>
                            <li><strong>Theme Engine:</strong> 4 Premium themes (Light, Dark, Ocean, Emerald) with CSS Variables.</li>
                            <li><strong>Analytics:</strong> Distribution charts and financial metrics aggregation.</li>
                            <li><strong>History/Active:</strong> Context-aware views with specific UI simplifications.</li>
                        </ul>
                    </div>
                </section>
            </div>

            <style>{`
                .docs-page {
                    animation: fadeEntry 0.4s ease-out;
                    padding-bottom: 4rem;
                }

                .docs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 2rem;
                    margin-top: 2rem;
                }

                .docs-card {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .docs-card-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: var(--primary);
                    border-bottom: 1px solid var(--glass-border);
                    padding-bottom: 1rem;
                }

                .docs-card-header h2 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin: 0;
                    color: white;
                }

                .docs-card-body {
                    color: var(--text-secondary);
                    line-height: 1.6;
                }

                .docs-card-body ul {
                    padding-left: 1.5rem;
                    margin: 0;
                }

                .docs-card-body li {
                    margin-bottom: 0.75rem;
                }

                .docs-card-body strong {
                    color: var(--text-primary);
                }

                @keyframes fadeEntry {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .docs-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default DocsPage;
