import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Inbox from '../Pages/Inbox';
import Message from '../Pages/Message';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/"  element={<Home/>} exact />
        <Route path="/inbox"  element={<Inbox/>} exact />
        <Route path="/message/:id"  element={<Message/>} exact/>
      </Routes>
    );
  };

  export default AppRoutes;