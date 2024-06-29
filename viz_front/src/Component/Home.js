import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file

function Home() {
  return (
    <div>
    <header className="title">VizCity</header>
    <div className="home-container">
      <h1 className="home-title">Welcome</h1>
      <h2 className='next-title'>Travel and Explore</h2>
      <div className="role-links">
        <Link to="/Component/Login" className="role-link">SignIn</Link>
        <Link to="/Component/CreateMember" className="role-link">SignUp</Link>
      </div>
    </div>
    </div>
  );
}

export default Home;