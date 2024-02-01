import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyFeedback = () => {
  const { bookId } = useParams();
  const navigate = useNavigate(); // Get the navigate function
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/books/${bookId}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [bookId, token]);

  const handleDelete = (feedbackId) => {
    axios
      .delete(`http://localhost:8080/books/${bookId}/reviews/${feedbackId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // If successful, update the reviews list
        setReviews(reviews.filter((review) => review.reviewId !== feedbackId));

        // Show a success message with Toastify
        toast.success('Feedback deleted successfully');

        // Navigate to a different route (e.g., BookList) after a successful delete
        navigate('/books');
      })
      .catch((err) => {
        setError(err.message);

        // Show an error message with Toastify
        toast.error('An error occurred while deleting the feedback');
      });
  };




  return (
    <div>
      <h2>My Feedback</h2>
      {error && <p>Error: {error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Feedback ID</th>
            <th>Comments</th>
            <th>Ratings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.reviewId}>
              <td>{review.reviewId}</td>
              <td>{review.comments}</td>
              <td>{review.ratings}</td>
              <td>
                <button onClick={() => handleDelete(review.reviewId)}>Delete</button>
              </td>
              <td>
                <button onClick={() => navigate(`/update/${bookId}/${review.reviewId}`)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFeedback;
