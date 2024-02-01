import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Review = () => {
  const { bookId } = useParams();
  const [comments, setComments] = useState('');
  const [ratings, setRatings] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `http://localhost:8080/books/${bookId}/reviews/create`,
        {
          comments,
          ratings,
          book_id: bookId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log('Review Response:', response.data);

      // Display a success message with React-Toastify
      toast.success('Review submitted successfully');

      // Clear the form fields
      setComments('');
      setRatings(0);
      navigate('/books');
    } catch (err) {
      // Handle the error
      console.error('Error:', err);

      // Display an error message with React-Toastify
      toast.error('An error occurred while submitting the review');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Submit a FeedBack</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <textarea
                id="comments"
                className="form-control"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="ratings">Ratings:</label>
              <input
                type="number"
                id="ratings"
                className="form-control"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                min="0"
                max="5"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Review;
