import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BorrowBook = () => {
  const { bookId } = useParams();
  const [borrowDate, setBorrowDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `http://localhost:8080/books/${bookId}/borrow`,
        {
          bowrrowDate: borrowDate,
          duedate: dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log('Borrow Book Response:', response.data);

      // Display a success message with React-Toastify
      toast.success('Book borrowed successfully');
      navigate('/books');
      // Update book availability to false
     
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
          <h2 className="text-center">Borrow a Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="borrowDate">Borrow Date:</label>
              <input
                type="date"
                className="form-control"
                id="borrowDate"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date:</label>
              <input
                type="date"
                className="form-control"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Borrow Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
