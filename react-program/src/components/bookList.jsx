import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get the user's token
  const isAdmin = localStorage.getItem('role') === 'ADMIN';
  // Fetch the list of books
  useEffect(() => {
    axios
      .get('http://localhost:8080/books/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token]);

  const handleBorrow = (bookId, isAvailable) => {
    if (isAvailable === 'AvailAble') {
      // You can navigate to the borrow page with bookId as a parameter
      navigate(`/borrow-book/${bookId}`);
    } else {
      // Handle the case where the book is not available
      toast.error('This book is not available for borrowing.');
    }
  };

  const handleReturn = (bookId, isAvailable) => {
    if (isAvailable === 'OCCUPIED') {
      // You can navigate to the return page with bookId as a parameter
      navigate(`/return-book/${bookId}`);
    } else {
      // Handle the case where the book is not borrowed and cannot be returned
      toast.error('This book cannot be returned as it has not been borrowed.');
    }
  };

  const handleBorrowSuccess = () => {
    // Update the list of books after a successful borrow
    // You can fetch the list of books again with a new API request
    axios
      .get('http://localhost:8080/books/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
        toast.success('Book borrowed successfully.');
      })
      .catch((err) => {
        setError(err.message);
        toast.error('An error occurred while updating the book list.');
      });
  };

  const handleReturnSuccess = () => {
    // Update the list of books after a successful return
    // You can fetch the list of books again with a new API request
    axios
      .get('http://localhost:8080/books/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
        toast.success('Book returned successfully.');
      })
      .catch((err) => {
        setError(err.message);
        toast.error('An error occurred while updating the book list.');
      });
  };

  const handleDelete = (bookId) => {
    // Create an API endpoint for the DELETE request
    const apiEndpoint = `http://localhost:8080/books/delete/${bookId}`;
    

    // Use axios to make a DELETE request with the authentication token in the header
    axios
      .delete(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // Remove the deleted book from the list
        setBooks(books.filter((book) => book.bookId !== bookId));
        toast.success('Book deleted successfully.');
        navigate('/books')
      })
      .catch((error) => {
        toast.error('Failed to delete book');
      });
  };

  return (
    <div className="text-center"> {/* Center the text */}
      <h2>Book List</h2>
      {error && <p>Error: {error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Is Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.bookId}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.isAvailable === 'AvailAble' ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleBorrow(book.bookId, book.isAvailable)}>
                  Borrow
                </button>
                <button onClick={() => handleReturn(book.bookId, book.isAvailable)}>
                  Return
                </button>
                <button onClick={() => navigate(`/books/${book.bookId}/allreviews`)}>
                  Reviews
                </button>
                <button onClick={() => navigate(`/books/${book.bookId}/review`)}>
                  Feedback
                </button>
                <button onClick={() => navigate(`/books/reviews/${book.bookId}`)}>
                  MyFeedbacks
                </button>
               { isAdmin &&(<button onClick={() => navigate(`/updatebook/${book.bookId}`)}>
                  Update
                </button>)}
               {isAdmin &&( <button onClick={() => handleDelete(book.bookId)}>
                  Delete
                </button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
