import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './chat.css'

const ChatAI = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]); // Store messages in an array
  const [loading, setLoading] = useState(false); // Handle loading state
  const navigate = useNavigate();

  // List of interesting questions with static answers
  const questions = [
    { question: 'What is the meaning of life?', answer: 'The meaning of life is to find your gift. The purpose of life is to give it away.' },
    { question: 'How do I become a good programmer?', answer: 'Practice, learn from mistakes, and keep improving every day.' },
    { question: 'What is the secret to happiness?', answer: 'Happiness is found when we focus on the present and cherish simple moments.' },
    { question: 'What is AI?', answer: 'Artificial Intelligence (AI) refers to the simulation of human intelligence in machines.' },
    { question: 'Why is the sky blue?', answer: 'The sky appears blue because of the scattering of sunlight by the atmosphere.' },
  ];

  // Simulated AI response with "typing..." effect
  const simulateAIResponse = (answer) => {
    setLoading(true);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: answer },
      ]);
      setLoading(false);
    }, 2000); // Simulate typing delay
  };

  // Function to handle the sending of messages
  const handleSend = () => {
    if (!userInput.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput },
    ]);

    // Simulate AI response based on question
    const question = questions.find(q => q.question.toLowerCase() === userInput.toLowerCase());
    if (question) {
      simulateAIResponse(question.answer);
    } else {
      simulateAIResponse('Sorry, I don\'t have an answer for that.');
    }

    // Clear the input field after sending the message
    setUserInput('');
  };

  // Function to handle question click
  const handleQuestionClick = (question) => {
    setUserInput(question); // Set selected question as input
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

      {/* Predefined Question List */}
      <div className="question-list">
        {questions.map((item, index) => (
          <div
            key={index}
            className="question-item cursor-pointer text-blue-500 hover:underline"
            onClick={() => handleQuestionClick(item.question)}
          >
            {item.question}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            {msg.sender === 'ai' && (
              <div className="ai-profile-pic">
                <img src="https://placekitten.com/50/50" alt="AI Profile" className="rounded-full" />
              </div>
            )}
            <div className="message-text">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message ai-message">
            <div className="ai-profile-pic">
              <img src="https://placekitten.com/50/50" alt="AI Profile" className="rounded-full" />
            </div>
            <div className="message-text">
              <p>AI is typing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Field & Send Button */}
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
