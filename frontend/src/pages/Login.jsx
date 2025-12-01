import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>GREEN VISTA - Where Nature Meets Art</p>
        
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.contactInfo}>
          <h3>Contact Information</h3>
          <p>📧 Email: punithvillamint@zohomail.in</p>
          <p>📞 Phone: +91 9535167488</p>
          <p>⏰ Hours: Monday - Friday, 9 AM - 6 PM</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    padding: '20px',
    '@media (maxWidth: 768px)': {
      padding: '15px',
      minHeight: '50vh'
    },
    '@media (maxWidth: 480px)': {
      padding: '10px',
      minHeight: '40vh'
    }
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    '@media (maxWidth: 768px)': {
      padding: '30px',
      maxWidth: '100%'
    },
    '@media (maxWidth: 480px)': {
      padding: '20px',
      borderRadius: '6px'
    }
  },
  title: {
    marginBottom: '10px',
    color: '#2c3e50',
    fontSize: '28px',
    '@media (maxWidth: 480px)': {
      fontSize: '24px',
      marginBottom: '8px'
    }
  },
  subtitle: {
    fontSize: '14px',
    color: '#7f8c8d',
    marginBottom: '20px',
    '@media (maxWidth: 480px)': {
      fontSize: '12px',
      marginBottom: '15px'
    }
  },
  error: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
    '@media (maxWidth: 480px)': {
      padding: '10px',
      fontSize: '13px',
      marginBottom: '15px'
    }
  },
  form: {
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '20px',
    '@media (maxWidth: 480px)': {
      marginBottom: '15px'
    }
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2c3e50',
    '@media (maxWidth: 480px)': {
      fontSize: '13px',
      marginBottom: '6px'
    }
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    '@media (maxWidth: 480px)': {
      padding: '12px',
      fontSize: '16px'
    }
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '@media (maxWidth: 480px)': {
      padding: '14px',
      fontSize: '15px'
    }
  },
  contactInfo: {
    backgroundColor: '#ecf0f1',
    padding: '15px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#2c3e50',
    '@media (maxWidth: 480px)': {
      padding: '12px',
      fontSize: '11px',
      lineHeight: '1.6'
    }
  }
};

export default Login;
