import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './borrowBook.css';


const centerContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?w=1060&t=st=1697977713~exp=1697978313~hmac=85ca2d6c44d8072637ce21bfe27af113896473ac49247baaab492894e854cd05')`, // Replace 'your-image-url.jpg' with the URL of your background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: 'white', // This keeps the background fixed while scrolling
};

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the token and user ID from localStorage
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    // Make a GET request to the API to fetch the borrowed books
    axios.get(`http://localhost:8080/users/${id}/borrowed-books`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the 'Authorization' header
      },
    })
      .then((response) => {
        // If the request is successful, set the borrowedBooks state
        setBorrowedBooks(response.data);
      })
      .catch((err) => {
        // If there's an error, set the error state
        setError(err.message);
      });
  }, []);

  return (
    <div style={centerContentStyle}>
      {error && <p>Error: {error}</p>}
      <h2>Borrowed Books</h2>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book.bookId}>
            <p>Name: {book.name}</p>
            <p>Author: {book.author}</p>
            <p>Is Available: {book.isAvailable}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooks;
