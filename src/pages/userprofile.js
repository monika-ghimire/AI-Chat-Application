import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const UserProfile = () => {
  const [userData, setUserData] = useState({ username: '', email: '', avatar: '' });
  const [image, setImage] = useState(null); // State for storing the uploaded image
  const [displayedText, setDisplayedText] = useState(''); // State for typing effect
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate function

  // Load user data from localStorage
  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    if (savedUserData) {
      setUserData(savedUserData);
      // Optionally load avatar from localStorage if saved previously
      const savedAvatar = localStorage.getItem('avatar');
      if (savedAvatar) {
        setUserData((prevData) => ({ ...prevData, avatar: savedAvatar }));
      }
    }
  }, []);

  // Typing effect for the welcome message
  useEffect(() => {
    if (index < `Welcome, ${userData.username}`.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + `Welcome, ${userData.username}`[index]);
        setIndex(index + 1);
      }, 100); // Adjust typing speed here
      return () => clearTimeout(timeout);
    }
  }, [index, userData.username]);

  // Handle avatar selection from predefined options
  const handleAvatarSelect = (avatar) => {
    setUserData((prevData) => ({ ...prevData, avatar }));
    localStorage.setItem('avatar', avatar); // Save avatar to localStorage
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setUserData((prevData) => ({ ...prevData, avatar: reader.result }));
      localStorage.setItem('avatar', reader.result); // Save uploaded avatar to localStorage
    };

    if (file) {
      reader.readAsDataURL(file); // Convert image to base64 format
    }
  };

  // Handle "Next" button click (navigation)
  const handleNextClick = () => {
    navigate('/chat-ai'); // Navigate to the "chat-ai" route
  };

  return (
    <div className="user-profile p-6 flex flex-col h-screen gap-8 items-center py-20">
      <div className="flex flex-col justify-between items-center">
        <h2 className="text-3xl font-semibold">{displayedText}</h2>
        <p className="text-sm text-gray-600">{userData.email}</p>
      </div>

      <div className="flex items-center justify-between w-2/5 mt-12">
        <div>
          <h3 className="text-lg font-semibold">Select Avatar</h3>
          <div className="avatars flex space-x-4 mt-4">
            {/* Predefined avatars */}
            {['img1', 'img2'].map((img, index) => (
              <img
                key={index}
                src={`/${img}.jpg`}
                alt={`Avatar ${index + 1}`}
                className={`w-10 h-10 cursor-pointer ${userData.avatar === img ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleAvatarSelect(img)}
              />
            ))}
          </div>

          <div className="mt-6">
            <h1 className="text-sm">OR</h1>
            <h1 className="text-lg font-semibold mt-2">Upload Your Avatar</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="">
          <h4 className="text-lg font-semibold">Your Avatar:</h4>
          <div className="avatar-display mt-2">
            {image || userData.avatar ? (
              <img
                src={image || `/${userData.avatar}.jpg`}
                alt="User Avatar"
                className="w-60 h-60 rounded-full"
              />
            ) : (
              <p>No avatar selected</p>
            )}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 text-2xl cursor-pointer" onClick={handleNextClick}>
          {image || userData.avatar ? 'Next' : null}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
