import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    isAvailable: 'AvailAble',
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the book details by bookId and populate the form
    axios
      .get(`http://localhost:8080/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { name, author, isAvailable } = response.data;
        setBookData({ name, author, isAvailable });
      })
      .catch((error) => {
       
        toast.error('Failed to fetch book details');
      });
  }, [token, bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an API endpoint for the update request
    const apiEndpoint = `http://localhost:8080/books/update/${bookId}`;
  
    console.log('Sending PUT request with data:', bookData);
  
    // Use axios to make a PUT request with the updated book data and token
    axios
      .put(apiEndpoint, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Response from the server:', response);
        toast.success('Book updated successfully');
        navigate('/books'); // Redirect to the book list page after successful update
      })
      .catch((error) => {
        console.error('Error while updating book:', error);
        toast.error('Failed to update book');
      });
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Book Name:</label>
          <input type="text" name="name" value={bookData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" name="author" value={bookData.author} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="isAvailable">Availability:</label>
          <select name="isAvailable" value={bookData.isAvailable} onChange={handleChange} required>
            <option value="AvailAble">Available</option>
            <option value="OCCUPIED">Occupied</option>
          </select>
        </div>
        <button type="submit">Update Book</button>
      </form>
     
    </div>
  );
};

export default UpdateBook;
