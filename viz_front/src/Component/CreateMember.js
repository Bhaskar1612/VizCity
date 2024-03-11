import React, { useState } from 'react';
import axios from 'axios';
import './CreateMember.css'; // Import your CSS file

const CreateMember = ({setCreatedMember}) => {
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
      setCreatedMember(3);
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
        <label>Class:</label>
        <input type="number" value={memberDetails.Class} onChange={(e) => setMemberDetails({ ...memberDetails, Class: parseInt(e.target.value, 10) || null })} />
      </div>
      <div>
        <label>Roll No:</label>
        <input type="number" value={memberDetails.RollNo} onChange={(e) => setMemberDetails({ ...memberDetails, RollNo: parseInt(e.target.value, 10) || null })} />
      </div>
      <div>
        <label>Disabled:</label>
        <input type="checkbox" checked={memberDetails.disabled} onChange={(e) => setMemberDetails({ ...memberDetails, disabled: e.target.checked })} />
      </div>
      <button onClick={handleCreateMember}>Create Member</button>
    </div>
  );
};

export default CreateMember;
