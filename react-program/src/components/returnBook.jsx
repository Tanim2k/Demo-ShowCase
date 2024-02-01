import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReturnBook = () => {
    const navigate = useNavigate();
  const { bookId } = useParams();
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `http://localhost:8080/books/${bookId}/return`,
        {
          book_id: bookId,
          returnDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log('Return Book Response:', response.data);

      // Display a success message with React-Toastify
      toast.success('Book returned successfully');
      navigate('/books');
      // Update book availability to true
      
    } catch (err) {
      // Handle the error
      console.error('Error:', err);

      // Display an error message with React-Toastify
      toast.error('An error occurred.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Return a Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="returnDate">Return Date:</label>
              <input
                type="date"
                className="form-control"
                id="returnDate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Return Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;
