# Transportation Management System (TMS)

A modern, full-stack Transportation Management System designed for efficient shipment tracking and management. Built with a premium UI and a robust GraphQL backend.

## 🚀 Features

- **Shipment Management**: Create, view, update, and track shipments with ease.
- **Role-Based Access Control (RBAC)**: secure access for different user roles (Admin, Employee).
- **Interactive Dashboard**: Visual overview of shipment statuses and key metrics.
- **Dynamic Views**: Toggle between grid, tile, and detailed views for shipments.
- **Real-time Updates**: Powered by GraphQL for a responsive user experience.
- **Premium UI**: Crafted with Vanilla CSS and modern design principles for a high-end feel.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **State/Data**: Apollo Client
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Modern design patterns)

### Backend
- **Server**: Apollo Server (Node.js)
- **API**: GraphQL
- **Authentication**: JWT-based auth
- **Mock Data**: In-memory data store for quick demonstration

## 📂 Project Structure

```text
transportation-management-system/
├── backend/            # GraphQL Apollo Server
│   ├── data/           # Mock data and stores
│   ├── schema/         # GraphQL type definitions and resolvers
│   ├── utils/          # Authentication and utility functions
│   └── index.js        # Server entry point
├── frontend/           # React Vite Application
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React Context providers (Theme, Auth)
│   │   ├── pages/      # Main application pages
│   │   └── App.jsx     # Main application component
│   └── index.html      # HTML template
└── README.md           # Project documentation
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd transportation-management-system
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # The server runs on http://localhost:4000
   node index.js
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   # Start the development server
   npm run dev
   ```

## 🔐 Credentials (Demo)

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `password` |
| Employee | `employee` | `password` |

## 📜 License

This project is licensed under the ISC License.
