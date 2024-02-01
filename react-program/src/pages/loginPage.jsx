import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/authContext";

const backgroundStyle = {
  backgroundImage: 'url("https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};

const loginTitleStyle = {
  color: "Black",
};

function Login() {
  const [formData, setFormData] = useState({
    username: "", // Change "email" to "username"
    password: "",
  });
  const navigate = useNavigate();
  const { login: updateLoginStatus } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = () => {
    axios
      .post("http://localhost:8080/api/v2/user/login", formData)
      .then(function (response) {
        const { Authorization, role, id } = response.data;
        if (Authorization) {
          localStorage.setItem("token", Authorization);
          localStorage.setItem("role", role);
          localStorage.setItem("id", id);

          updateLoginStatus();
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
      });
  };

  return (
    <div style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center align-items-center" style={{ flex: 1 }}>
          <div className="col-md-6">
            <h2 className="text-center" style={loginTitleStyle}>
              SignIn Here
            </h2>
            <div className="form-group">
              <input
                type="text" // Change "email" to "text"
                name="username" // Change "email" to "username"
                className="form-control"
                placeholder="Username" // Change "Email" to "Username"
                value={formData.username} // Change "email" to "username"
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
            <button className="btn btn-primary btn-block" onClick={login}>
              Login
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="toast-container">
            {/* Toast messages will appear here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
