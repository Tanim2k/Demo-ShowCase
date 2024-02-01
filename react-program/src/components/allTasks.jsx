import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState([]);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Make a GET request to the API to fetch all tasks
    axios.get(`http://localhost:8080/api/v2/task/getAllTasks`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        setAllTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [authToken]);

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
        setAllTasks(allTasks.filter((task) => task.taskId !== taskId));
        setFilteredTasks(filteredTasks.filter((task) => task.taskId !== taskId));
      })
      .catch((error) => {
        setError(error.message);
        console.error('Failed to delete task', error);
      });
  };

  const handleSearch = () => {
    // Filter tasks based on the search query
    const filtered = allTasks.filter((task) =>
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
    <div style={{ padding: '20px', background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYKARPRZ8MAVf8Ti_hw5kiaRQ0acYFM2ZGpQ&usqp=CAU')`, backgroundSize: 'cover', minHeight: '100vh', backgroundAttachment: 'fixed' }}>
      {error && <p> {error}</p>}
      <h2>All Tasks</h2>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '5px', marginRight: '10px', border: '2px solid #4CAF50' }}
        />
        <button
          style={{ background: '#4CAF50', color: 'white', padding: '10px 20px', margin: '0 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          onClick={handleSearch}
        >
          Search
        </button>
        <label style={{ marginLeft: '10px' }}>
          Sort Order:
          <select
            value={sortOrder}
            onChange={handleSortChange}
            style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', border: '2px solid #4CAF50' }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
        {filteredTasks.map((task) => (
          <li key={task.taskId} style={{ marginBottom: '20px', padding: '15px', border: '2px solid black', borderRadius: '8px', width: '40%', background: 'rgba(255, 255, 255, 0.1)', color: 'black', boxSizing: 'border-box' }}>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Status: {task.status}</p>
            <button
              style={{ background: 'red', color: 'white', padding: '10px 20px', margin: '0 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => handleDelete(task.taskId)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
