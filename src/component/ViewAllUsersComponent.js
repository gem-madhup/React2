import React, { useEffect, useState } from 'react';
import { fetchUserRecordsFromService } from '../services/UserService'; // Import the shared service

const ViewAllUsersComponent = () => {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    fetchUserRecords();
  }, []);

  const fetchUserRecords = async () => {
    try {
      const response = await fetchUserRecordsFromService();
      setUsers(response.data); 
    } catch (error) {
      console.error('Error fetching user records:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>View All Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Mobile</th>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Technologies</th>
            <th style={tableHeaderStyle}>Profile Picture</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{user.name}</td>
              <td style={tableCellStyle}>{user.gender}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>{user.mobile}</td>
              <td style={tableCellStyle}>{user.category}</td>
              <td style={tableCellStyle}>{user.technologies.join(', ')}</td>
              <td style={tableCellStyle}>{user.profilePicture}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  textAlign: 'center',
  border: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

export default ViewAllUsersComponent;
