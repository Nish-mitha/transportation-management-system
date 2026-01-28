import { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { Truck } from 'lucide-react';
import './Login.css';

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin'); // Default for demo
  const [password, setPassword] = useState('password123'); // Default for demo
  const [login, { loading, error }] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('token', data.login.token);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="logo-large">
          <Truck size={48} />
          <h1>VORTEX TMS</h1>
        </div>
        <p>Enter Credentials to Access</p>

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#1e293b', color: 'white' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#1e293b', color: 'white' }}
          />

          {error && <div className="error-msg">{error.message}</div>}

          <button className="btn btn-primary full-width" type="submit" disabled={loading}>
            {loading ? 'Accessing...' : 'Login'}
          </button>
        </form>

        <div className="demo-credentials" style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
          <p>Demo: admin / password123</p>
          <p>Demo: employee / password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
