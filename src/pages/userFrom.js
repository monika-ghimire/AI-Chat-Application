import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Lottie from 'react-lottie';
import loadingrobo from './loadingrobo.json'; 
import './user.css';

const UserForm = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [showForm, setShowForm] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate(); // useNavigate hook to navigate to different routes

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
      setShowForm(true);
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    // Navigate to the UserProfile page after submitting
    navigate('/user-profile');
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingrobo,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <section className='flex justify-center items-center h-screen w-screen'>
      {isLoading && (
        <div className="flex justify-center items-center absolute">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}

      {showForm && (
        <div className="from-wrapper p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">User Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-gray-600 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-4 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-4 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default UserForm;
