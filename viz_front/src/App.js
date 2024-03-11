import React, { useState } from 'react';
import Login from './Component/Login';
import Password from './Component/Password';
import UserProfile from './Component/UserProfile'
import CreateMember from './Component/CreateMember';
import './App.css';
import Weatherapi from './Component/Weatherapi';
import Navigation from './Component/Navigation';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [currentState, setCurrentPage] = useState('login');
  const [createdMember, setCreatedMember] = useState(null);

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };
  

  return (
    <div>
      <h1>Welcome to VizCity </h1>
      <div>
        <button onClick={() => navigateToPage('login')}>Login</button>
        <button onClick={() => navigateToPage('create')}>Create Member</button>
      </div>

      {currentState==='login' ? (
        !accessToken ? (
          <Login setAccessToken={setAccessToken} />
        ) : (
          <UserProfile accessToken={accessToken} navigateToPage={navigateToPage} />
        )
        
      ) : currentState==='create' ?(
        !createdMember ? (
          <CreateMember setCreatedMember={setCreatedMember} />
        ) : (
          <Password setCreatedMember = {setCreatedMember} />
        )
      ) : currentState==='weather' ?(
          <Weatherapi/>
      ) : currentState==='navigation' ?(
          <Navigation/>
      ) : null}
    </div>
  );
};

export default App;
