import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { bookId } = useParams(); // Get the bookId from the URL
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch the list of reviews for the specific book using the bookId
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
  }, [bookId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Reviews for Book {bookId}</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Comments</th>
                <th>Ratings</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={index}>
                    <td>{review.user_id}</td>
                  <td>{review.comments}</td>
                  <td>{review.ratings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
