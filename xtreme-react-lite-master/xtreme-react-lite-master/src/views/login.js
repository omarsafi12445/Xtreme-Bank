import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      // Verify if the user is an employee using the API
      // Make a request to "http://localhost:8085/Ebank/getEmployes" with the entered email and password
      // Redirect to "/employeelist" if the user is an employee
      navigate('/employeelist');
    } else if (name && code) {
      // Redirect to "/mypage" if the user is a client
      window.location.href = '/mypage';
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Render the input fields for email, password, name, and code */}
        {/* Update the state on input change */}
        {/* Add labels and other necessary attributes */}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

