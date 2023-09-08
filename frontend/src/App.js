import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <div className="App">
       <GlobalStyle />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          </a>
        </div>
      </nav>
      <Router>
        <AppRoutes />
    </Router>
    </div>
  );
}

export default App;