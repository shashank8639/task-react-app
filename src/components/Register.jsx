import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      console.log(password);
      setMessage('Registration successful! You can now log in.');
      navigate('/');
    } catch (error) {
        console.log(`The Error: ${error}`);
      setMessage('Registration failed!');
    }
  };

  return (
    <div className="loginForm">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
