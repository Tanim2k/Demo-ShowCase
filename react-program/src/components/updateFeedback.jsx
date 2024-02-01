import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateFeedback = () => {
  const { bookId, feedbackId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState('');
  const [ratings, setRatings] = useState('');
  const token = localStorage.getItem('token');

  const handleUpdate = () => {
    // Construct the update data
    const updateData = {
      comments,
      ratings: parseFloat(ratings), // Parse the ratings as a float
    };

    // Send a PUT request to update the feedback
    axios
      .put(`http://localhost:8080/books/${bookId}/reviews/${feedbackId}/update`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the success case
        toast.success('Feedback updated successfully');
        navigate('/books'); // Navigate to the feedback list page
      })
      .catch((err) => {
        // Handle errors
        toast.error('An error occurred while updating feedback');
        console.error('Error:', err);
      });
  };

  return (
    <div>
      <h2>Update Feedback</h2>
      <form>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            className="form-control"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ratings">Ratings:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className="form-control"
            id="ratings"
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update Feedback
        </button>
      </form>
    </div>
  );
};

export default UpdateFeedback;
