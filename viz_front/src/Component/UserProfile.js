import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = ({ accessToken,navigateToPage }) => {
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);
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
          <li>
            <strong>Class:</strong> {userData.Class}
          </li>
          <li>
            <strong>Roll No:</strong> {userData.RollNo}
          </li>
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}

      <button onClick={() => navigateToPage('weather')}>Go to Weather</button>
      <button onClick={() => navigateToPage('navigation')}>Go to Navigation</button>
      
    </div>

  );
};

export default UserProfile;
