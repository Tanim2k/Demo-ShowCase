import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const updateTaskContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')`, // Replace with your background image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: 'white',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  margin: '10px',
  padding: '10px',
  width: '300px',
  borderRadius: '5px',
};

const buttonStyle = {
  background: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Make a GET request to the API to fetch task details for the update
    axios.get(`http://localhost:8080/api/v2/task/getTask/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // Populate the form with task details
        setTaskData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Make a PUT request to the API to update the task
    axios.put(`http://localhost:8080/api/v2/task/update/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        // After successful update, navigate back to the "MyTasks" component
        navigate('/myTasks');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div style={updateTaskContainerStyle}>
      {error && <p>Error: {error}</p>}
      <h2>Update Task</h2>
      <form style={formStyle} onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          style={inputStyle}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          style={inputStyle}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="status"
          value={taskData.status}
          onChange={handleChange}
          style={inputStyle}
          placeholder="Status"
          required
        />
        <button type="submit" style={buttonStyle}>
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
