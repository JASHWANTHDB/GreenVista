import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    apartmentNumber: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.phone,
        formData.password,
        formData.apartmentNumber,
        formData.address
      );
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.error || err.message || 'Registration failed';
      if (errorMessage.includes('already exists')) {
        setError('Email already registered. Please use a different email or login.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Register as Property Owner</h1>
        <p style={styles.subtitle}>Create your account to submit maintenance requests</p>
        
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your property address"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Apartment Number (Optional)</label>
            <input
              type="text"
              name="apartmentNumber"
              value={formData.apartmentNumber}
              onChange={handleChange}
              placeholder="A101"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password (min 6 characters)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter secure password"
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={styles.loginLink}>
          Already have an account? <a href="/login" style={styles.link}>Login here</a>
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
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    '@media (maxWidth: 768px)': {
      padding: '15px',
      minHeight: 'auto',
      paddingTop: '20px',
      paddingBottom: '20px'
    },
    '@media (maxWidth: 480px)': {
      padding: '10px'
    }
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
    '@media (maxWidth: 768px)': {
      padding: '30px',
      borderRadius: '6px'
    },
    '@media (maxWidth: 480px)': {
      padding: '20px',
      borderRadius: '6px'
    }
  },
  title: {
    marginBottom: '10px',
    color: '#2c3e50',
    fontSize: '24px',
    '@media (maxWidth: 768px)': {
      fontSize: '22px'
    },
    '@media (maxWidth: 480px)': {
      fontSize: '20px',
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
    marginBottom: '15px',
    '@media (maxWidth: 480px)': {
      marginBottom: '12px'
    }
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2c3e50',
    '@media (maxWidth: 480px)': {
      fontSize: '13px'
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
  loginLink: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#7f8c8d',
    '@media (maxWidth: 480px)': {
      fontSize: '12px'
    }
  },
  link: {
    color: '#27ae60',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease'
  }
};

export default Register;
