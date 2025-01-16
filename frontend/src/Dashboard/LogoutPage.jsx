import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Send logout request to backend
        await axios.post('http://localhost:8080/student/logout');
        
        // Show the logout message to the user
        setTimeout(() => {
          // Redirect to login page after a few seconds
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } catch (error) {
        console.error('Error logging out', error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="logout-page">
      <h2>You have successfully logged out!</h2>
      <p>Redirecting you to the login page...</p>
    </div>
  );
};

export default LogoutPage;
