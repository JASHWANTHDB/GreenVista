import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .navbar-container {
          animation: slideInDown 0.5s ease-out;
        }
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #fff;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
      <div style={styles.container} className="navbar-container">
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🌿</span> GREEN VISTA (Where Nature Meets Art)
        </Link>
        <div style={styles.menu}>
          {user ? (
            <>
              <div style={styles.userBadge}>
                {user.role === 'admin' ? '🔐' : '👤'} {user.name}
              </div>
              {user.role === 'admin' && (
                <>
                  <NavLink 
                    to="/dashboard" 
                    label="Admin Dashboard"
                    icon="📊"
                    hovered={hoveredLink === 'dashboard'}
                    onHover={() => setHoveredLink('dashboard')}
                  />
                  <NavLink 
                    to="/users" 
                    label="Users"
                    icon="👥"
                    hovered={hoveredLink === 'users'}
                    onHover={() => setHoveredLink('users')}
                  />
                </>
              )}
              {user.role === 'owner' && (
                <>
                  <NavLink 
                    to="/dashboard" 
                    label="My Dashboard"
                    icon="🏠"
                    hovered={hoveredLink === 'dashboard'}
                    onHover={() => setHoveredLink('dashboard')}
                  />
                  <NavLink 
                    to="/requests" 
                    label="Requests"
                    icon="📋"
                    hovered={hoveredLink === 'requests'}
                    onHover={() => setHoveredLink('requests')}
                  />
                </>
              )}
              <NavLink 
                to="/invoices" 
                label="Invoices"
                icon="💰"
                hovered={hoveredLink === 'invoices'}
                onHover={() => setHoveredLink('invoices')}
              />
              <NavLink 
                to="/notices" 
                label="Notices"
                icon="📢"
                hovered={hoveredLink === 'notices'}
                onHover={() => setHoveredLink('notices')}
              />
              <button 
                onClick={handleLogout} 
                style={styles.logoutBtn}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                label="Login"
                hovered={hoveredLink === 'login'}
                onHover={() => setHoveredLink('login')}
              />
              <NavLink 
                to="/register" 
                label="Register"
                hovered={hoveredLink === 'register'}
                onHover={() => setHoveredLink('register')}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, icon, hovered, onHover }) => (
  <Link 
    to={to} 
    style={{
      ...styles.link,
      color: hovered ? '#fff' : 'white',
      transform: hovered ? 'scale(1.05)' : 'scale(1)',
      transition: 'all 0.3s ease'
    }}
    className="nav-link"
    onMouseEnter={onHover}
  >
    {icon && <span style={{ marginRight: '5px' }}>{icon}</span>}
    {label}
  </Link>
);

const styles = {
  navbar: {
    backgroundColor: '#27ae60',
    padding: '15px 0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'transform 0.3s ease'
  },
  logoIcon: {
    fontSize: '28px'
  },
  menu: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  userBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  link: {
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  logoutBtn: {
    padding: '10px 18px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(231, 76, 60, 0.3)',
    marginLeft: '10px'
  }
};

export default Navbar;
