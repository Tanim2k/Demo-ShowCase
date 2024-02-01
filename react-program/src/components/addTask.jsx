import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddBook.css'; // Import your custom CSS file for styling

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'Pending', // Default value
  });
  const authToken = localStorage.getItem('token'); // Get the authentication token from localStorage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create an API endpoint for the POST request
    const apiEndpoint = 'http://localhost:8080/api/v2/task/create'; // Replace with your actual API endpoint for tasks

    // Use axios to make a POST request with the authentication token in the header
    axios
      .post(apiEndpoint, taskData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        toast.success('Task added successfully');
        setTaskData({ title: '', description: '', status: 'Pending' });
      })
      .catch((error) => {
        toast.error('Failed to add task');
      });
  };

  return (
    <div className="center-content">
      <div className="add-task-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title:</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddTask;
