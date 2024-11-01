import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.scss";

const apiBaseURL = "https://671f301ee7a5792f052d41f2.mockapi.io/API/v1/"; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
 
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiBaseURL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Unable to fetch users. Please try again later.");
      }
    };
    fetchUsers();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();


    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-pag">
      <img src="/Group.svg" className="brand-title" alt="Brand Logo" />
      <div className="login-page">
        <div className="login-page__left">
          <img src="/pablo-sign-in1.svg" alt="Illustration" />
        </div>
        <div className="login-page__right">
          <div className="login-container">
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                />
              </div>
              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                />
                <span onClick={togglePasswordVisibility}>
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              {error && <div className="error-message">{error}</div>}
              <a href="#" className="forgot-password">
                FORGOT PASSWORD?
              </a>
              <button type="submit" className="login-button">
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
