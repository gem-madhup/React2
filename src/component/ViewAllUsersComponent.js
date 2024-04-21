import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
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
      <h2>View All Users</h2>
      <Table striped bordered hover responsive> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Category</th>
            <th>Technologies</th>
            <th>Profile Picture</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.category}</td>
              <td>{user.technologies.join(', ')}</td>
              <td>{user.profilePicture}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAllUsersComponent;
