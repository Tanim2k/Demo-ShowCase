import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const taskContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `url('https://images.squarespace-cdn.com/content/v1/51f08295e4b07acd2a169238/1410965847341-5ZR6ICWXAJW7BO90347H/image-asset.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: 'black',
};

const taskListStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100%',
};

const taskItemStyle = {
  marginBottom: '20px',
  padding: '15px',
  border: '2px solid black',
  borderRadius: '8px',
  width: '40%', // Adjusted width for side-by-side display
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'black',
  boxSizing: 'border-box', // Include padding and border in the width
};

const buttonStyle = {
  background: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  margin: '0 10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  marginRight: '10px',
  border: '2px solid #4CAF50',
};

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState([]);
  const authToken = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token and user ID from localStorage
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    // Make a GET request to the API to fetch my tasks
    axios.get(`http://localhost:8080/api/v2/task/getAllTaskForUserAndAdmin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setMyTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleUpdate = (taskId) => {
    // Implement the update logic here
    navigate(`/update-task/${taskId}`);
  };

  const handleDelete = (taskId) => {
    // Implement the delete logic here
    // For demonstration purposes, hit the delete API with taskId and token
    axios.delete(`http://localhost:8080/api/v2/task/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(() => {
        // Remove the deleted task from the list
        setMyTasks(myTasks.filter((task) => task.taskId !== taskId));
        setFilteredTasks(filteredTasks.filter((task) => task.taskId !== taskId));
      })
      .catch((error) => {
        setError(error.message);
        console.error('Failed to delete task', error);
      });
  };

  const handleSearch = () => {
    // Filter tasks based on the search query
    const filtered = myTasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort tasks based on sortOrder
    const sortedTasks = filtered.sort((a, b) => {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });

    setFilteredTasks(sortedTasks);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div style={taskContainerStyle}>
      {error && <p> {error}</p>}
      <h2>My Tasks</h2>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleChange}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={handleSearch}>
          Search
        </button>
        <label style={{ marginLeft: '10px' }}>
          Sort Order:
          <select value={sortOrder} onChange={handleSortChange} style={{ marginLeft: '10px' }}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul style={taskListStyle}>
        {filteredTasks.map((task) => (
          <li key={task.taskId} style={taskItemStyle}>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <button style={buttonStyle} onClick={() => handleUpdate(task.taskId)}>
              Update
            </button>
            <br />
            <br />
            <button style={buttonStyle} onClick={() => handleDelete(task.taskId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTasks;
