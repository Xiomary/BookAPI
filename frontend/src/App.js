import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

      <div className="App">
        <Navbar /> 
        <div className="pages">
          <Home />
        </div>
      </div>
    
  );
}

export default App;

