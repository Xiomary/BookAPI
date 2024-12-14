import React, { useState } from "react";
import './index.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => { 
    e.preventDefault();
    axios.post('http://localhost:8081/api/users/signup', {
      email,
      password,
    }, {
      withCredentials: true, 
    })
    .then((response) => {
      console.log(response); 
      if(response.data.message === 'User created successfully') {
        navigate("/login");
      }else {
        console.log("Unexpected response data:", response.data);
        navigate("/home");
      }
    })
    .catch((error) => console.log(error)); 
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignUp;
