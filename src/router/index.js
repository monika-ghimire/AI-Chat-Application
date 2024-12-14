// src/router/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/homePage'; 
import AboutPage from '../pages/aboutPage';
import UserForm from '../pages/userFrom';
import UserProfile from '../pages/userprofile';
import ChatAI from '../pages/chatai';

const AppRouter = () => {
  return (
    <Router>  {/* Wrapping your routes in BrowserRouter */}
      <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path='/chat-ai' element={<ChatAI />}/>


        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
