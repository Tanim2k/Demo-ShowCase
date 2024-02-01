import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backgroundImageUrl = "https://img.freepik.com/free-photo/office-supplies_23-2148103963.jpg?w=1060&t=st=1697967731~exp=1697968331~hmac=7179fbba973caa7c55c433fa24c475a950a824ee1ee84c0e904364e1a85d514a";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};

const registrationTitleStyle = {
  color: "white",
};

function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:8080/api/v2/user/register', formData)
      .then(function (response) {
        console.log(response.data);
        toast.success('Registration Successful! You can now log in.');
      })
      .catch(function (error) {
        console.error("Registration error:", error);
        toast.error('Registration failed. Please try again.');
      });
  };

  return (
    <div style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center align-items-center" style={{ flex: 1 }}>
          <div className="col-md-6">
            <h2 className="text-center" style={registrationTitleStyle}>Registration</h2>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary btn-block" onClick={register}>Register</button>
          </div>
        </div>
        <div className="row justify-content-center">
          <p className="text-success" style={registrationTitleStyle}></p>
        </div>
      </div>
     
    </div>
  );
}

export default Registration;
