import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBook from './CreateBook';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateBook />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

