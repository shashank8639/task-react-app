import React, { useState } from 'react';
import './AuthForm.css'; // Optional external CSS if you want to separate styling
import { login,setAuthToken,register } from '../service/api';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
    try {
            const response = await login(loginData);
            setAuthToken(response.jwtToken);
            console.log('Token: ',response.jwtToken);
            navigate('/dashboard');
        } catch(error) {
            console.log(`Error: ${error}`);
            setError('Invalid Credentials');
        }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log('Register Data:', registerData);
    try {
          await register(registerData);
          console.log(registerData.password);
          setMessage('Registration successful! You can now log in.');
          setIsRegister(false);
        } catch (error) {
            console.log(`The Error: ${error}`);
          setMessage('Registration failed!');
        }
};

  return (
    <div className="auth_wrapper">
      <div className="switch_box">
        <label onClick={() => setIsRegister(false)}>Login</label>
        <label onClick={() => setIsRegister(true)}>Register</label>
      </div>
      <div className="slider" style={{ transform: isRegister ? 'translateX(100%)' : 'translateX(0%)' }}></div>

      <div className="form_wrapper">
        {!isRegister ? (
          <form className="form login_form" onSubmit={handleLoginSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="form register_form" onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={handleRegisterChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
