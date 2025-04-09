import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login,setAuthToken } from "../service/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await login({username, password});
        setAuthToken(response.jwtToken);
        console.log('Token: ',response.jwtToken);
        navigate('/dashboard');
    } catch(error) {
        console.log(`Error: ${error}`);
        setError('Invalid Credentials');
    }
  };
  return (
    <div className="loginForm">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button role="submit">Submit</button>
      </form>
      <Link to="/register">
        <button className="register">Register</button>
      </Link>
    </div>
  );
}

export default Login;
