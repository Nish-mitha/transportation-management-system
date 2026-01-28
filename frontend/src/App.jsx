import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { ApolloProvider, useQuery } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import './index.css';
import Dashboard from './Dashboard';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './Login';
import ShipmentsPage from './pages/ShipmentsPage';
import PreferencesPage from './pages/PreferencesPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticsPage from './pages/AnalyticsPage';
import DocsPage from './pages/DocsPage';
import { ThemeProvider } from './context/ThemeContext';

const httpLink = createHttpLink({
  uri: 'https://transportation-management-system-g1ms.onrender.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      role
      email
    }
  }
`;

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, loading, error } = useQuery(GET_ME);
  const token = localStorage.getItem('token');

  if (!token) return <Login />;
  if (loading) return <div className="loading" style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading user session...</div>;

  const user = data?.me;

  return (
    <Router>
      <div className="app-container">
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} user={user} />

        <div className="main-layout">
          <Sidebar isOpen={isMenuOpen} user={user} />

          <main className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/shipments" element={<ShipmentsPage user={user} />} />
              <Route path="/shipments/*" element={<ShipmentsPage user={user} />} />
              <Route path="/analytics" element={<AnalyticsPage user={user} />} />
              <Route path="/docs" element={<DocsPage user={user} />} />
              <Route path="/preferences" element={<PreferencesPage user={user} />} />
              <Route path="/profile" element={<ProfilePage user={user} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
