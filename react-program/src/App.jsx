import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/homePage";
import RegistrationPage from "./pages/registrationPage";
import LoginPage from "./pages/loginPage";

import NotFoundPage from "./pages/notFoundPage";
import SearchPage from "./pages/searchPage";
import Navbar from "./components/header";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/dashBoard";
import Profile from "./components/profile";
import BorrowedBooks from "./components/boroowedBook";
import History from "./components/myTasks";
import BooksList from "./components/bookList";
import BorrowBook from "./components/borrowBooks";
import ReturnBook from "./components/returnBook";
import Review from "./components/feedBack";
import Reviews from "./components/allReviews";
import MyFeedback from "./components/myFeedback";
import UpdateFeedback from "./components/updateFeedback";
import UserDetailsSearch from "./components/searchUser";

import UpdateBook from "./components/updateBook";
import AddTask from "./components/addTask";
import MyTasks from "./components/myTasks";
import UpdateTask from "./components/updateTasks";
import AllTasks from "./components/allTasks";


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/borrowed-books" element={<BorrowedBooks />} />
          <Route path="/myTasks" element={<MyTasks />} />
          <Route path="/update-task/:taskId" element={<UpdateTask />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/allTasks" element={<AllTasks />} />
          
          <Route path="/borrow-book/:bookId" element={<BorrowBook />} />
          <Route path="/return-book/:bookId" element={<ReturnBook/>} />
          <Route path="/books/:bookId/review" element={<Review/>} />
          <Route path="/books/:bookId/allreviews" element={<Reviews/>} />
          <Route path="/books/reviews/:bookId" element={<MyFeedback/>} />
          <Route path="/update/:bookId/:feedbackId" element={<UpdateFeedback/>} />
          <Route path="/search" element={<UserDetailsSearch/>} />
          <Route path="/create" element={<AddTask/>} />
          <Route path="/updatebook/:bookId" element={<UpdateBook/>} />
          
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Footer/>
    </div>
  );
}

export default App;
