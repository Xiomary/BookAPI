import React, { useState } from "react";
import './index.css'; 
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/api/users/signup', {
      email,
      password,
    }).then((response) => {
      console.log(response);
    })
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
