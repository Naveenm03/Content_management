import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Home.css';
import user22 from './user22.png';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeComponent from './HomeComponent'
function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserModal, setShowUserModal] = useState(false);
  const [defaultPicture, setDefaultPicture] = useState(user22);
  const [userName, setUserName] = useState('');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  useEffect(() => {
    if (location.state && location.state.user) {
      const { user } = location.state;
      console.log(user);
    }
  }, [location]);

  useEffect(() => {
    const userNameFromLocation = localStorage.getItem('userName');
    if (userNameFromLocation) {
      setUserName(userNameFromLocation);
    }
  }, []);

  function handleSignOut() {
    navigate('/');
  }

  function handleUserIconClick() {
    setShowUserModal(true);
  }

  function closeModal() {
    setShowUserModal(false);
  }

  function toggleSidePanel() {
    setIsSidePanelOpen((prevIsSidePanelOpen) => !prevIsSidePanelOpen);
  }

  return (
    <div className={`home-container ${isSidePanelOpen ? 'side-panel-open' : 'side-panel-closed'}`}>
      <nav className="navbar">
        <div className="navbar-side-panel">
         
          <Link to="/post" className="navbar-link">Post</Link>
          <Link to="/account" className="navbar-link" >Account</Link>
          <Link to="/settings" className="navbar-link" >Settings</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
        </div>
        <div className="navbar-brand">
          <button className="navbar-toggle" onClick={toggleSidePanel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <Link to="/" className="navbar-link" style={{ paddingLeft: "20px" }}>Home</Link>
          <Link to="/about" className="navbar-link" style={{ paddingLeft: "20px" }}>About</Link>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search" className="search-field" />
        </div>
        <div className="navbar-user-icon" onClick={handleUserIconClick}>
          <img
            src={location.state?.user?.picture || defaultPicture}
            alt="User Profile"
            style={{
              height: '50px',
              width: '50px',
              borderRadius: '50%',
              margin: '0',
              padding: '0',
              border: 'none',
              display: 'inline-block',
            }}
          />
        </div>
      </nav>

      {showUserModal && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="user-modal">
            <div className="user-info">
              <img src={location.state?.user?.picture || defaultPicture} alt="user22" />
              <h3>{location.state?.user?.name}</h3>
              <h3>{userName}</h3>
            </div>
            <button className="sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </>
      )}

      <h1 style={{ textAlign: "center" }}>Welcome to the Home Page</h1>
      <h3 style={{ textAlign: "center" }}>Hello, {userName || location.state?.user?.name}</h3>
      <div className='postcard'>
      <HomeComponent/></div>
    </div>
  );
}

export default Home;
