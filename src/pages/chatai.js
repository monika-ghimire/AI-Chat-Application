import React, { useState } from 'react';
import axios from 'axios';
import { URL } from 'url';

import { useNavigate } from 'react-router-dom';

const ChatAI = () => {
  const [messages, setMessages] = useState([]); // Store messages in an array
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false); // Handle loading state
  const navigate = useNavigate();

  // Function to handle the sending of messages
  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput }
    ]);

    // Set loading to true while waiting for AI response
    setLoading(true);

    try {
      // Call the OpenAI API to get a response
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: userInput,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`, // Replace with your OpenAI API key
            'Content-Type': 'application/json',
          }
        }
      );

      // Get the AI's response text
      const aiResponse = response.data.choices[0].text.trim();

      // Add AI response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: aiResponse }
      ]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: 'Sorry, I could not process your request at the moment.' }
      ]);
    } finally {
      setLoading(false);
    }

    // Clear the input field after sending the message
    setUserInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="text-2xl font-bold">Chat with AI</h2>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-blue-500 hover:underline"
        >
          Back to Profile
        </button>
      </div>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-center">AI is typing...</p>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask a question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAI;
