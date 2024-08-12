import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateMember.css'; // Import your CSS file

const CreateMember = () => {
  const navigate = useNavigate();
  const [memberDetails, setMemberDetails] = useState({
    username: '',
    Class: null,
    RollNo: null,
    hashed_password: '',
    disabled: false,
  });
  const handleCreateMember = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/Member`, memberDetails);

      console.log('Member created:', response.data);
      navigate('/Component/Login');
      // Handle success or navigate to a different page if needed
    } catch (error) {
      console.error('Error creating member:', error.response.data);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <div className="create-member-container">
      <h2>Create Member</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={memberDetails.username} onChange={(e) => setMemberDetails({ ...memberDetails, username: e.target.value })} />
      </div>
      <div>
        <label>Password:</label>
        <input type="text" value={memberDetails.hashed_password} onChange={(e) => setMemberDetails({ ...memberDetails, hashed_password: (e.target.value) ?? null })} />
      </div>
      <button onClick={handleCreateMember}>Create Member</button>
    </div>
  );
};

export default CreateMember;
