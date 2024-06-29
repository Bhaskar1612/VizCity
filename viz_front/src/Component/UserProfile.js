import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './UserProfile.css';

function UserProfile() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const accessToken = location.state.token;
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {userData ? (
        <ul>
          <li>
            <strong>Username:</strong> {userData.username}
          </li>
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
      

        <div className="role-links">
          <Link to='/Component/Weatherapi' className='role-link'>Weatherapi</Link>
          <Link to='/Component/Navigation' className='role-link'>Navigation</Link>
          <Link to='/Component/Translate' className='role-link'>Translate</Link>
          <Link to='/Component/News' className='role-link'>News</Link>
          <Link to='/Component/Exchange' className='role-link'>Exchange</Link>
          <Link to='/Component/Timezone' className='role-link'>Timezone</Link>
          <Link to='/Component/Covid' className='role-link'>Covid_19_Data</Link>
        </div>
      
      </div>

  );
};

export default UserProfile;
