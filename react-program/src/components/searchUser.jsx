import React, { useState } from 'react';
import axios from 'axios';

const UserDetailsSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  const handleSearch = () => {
    // Get the authentication token from localStorage
    const authToken = localStorage.getItem('token');

    // Create an API endpoint URL with the user's ID
    const apiEndpoint = `http://localhost:8080/users/${searchInput}`;

    // Use axios to make a GET request with the authentication token in the header
    axios
      .get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setUserDetails(null);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px' }}>
        <h2>User Details Search</h2>
        <input
          type="number"
          placeholder="Enter User ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {userDetails ? (
          <div>
            <h3>User Details</h3>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
          </div>
        ) : (
          <p>No user details found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailsSearch;
