import { useState } from 'react';
import { assignRoleToUser } from '../service/api';
import { Link } from 'react-router-dom';

const AssignRole = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignRoleToUser(username, role);
      setMessage('Role assigned successfully!');
      setUsername('');
      setRole('');
    } catch (error) {
        console.log(`The Error: ${error}`);
      setMessage('Failed to assign role!');
    }
  };

  return (
    <div className='loginForm'>
      <Link className='link' to="/dashboard">Dashboard</Link>
      <h2>Assign Role to User</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Role Name" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          required 
        />
        <button type="submit">Assign Role</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignRole;
