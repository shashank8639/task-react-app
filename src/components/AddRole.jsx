import { useState } from 'react';
import { addRole } from '../service/api';

const AddRole = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRole({ name, description });
      setMessage('Role added successfully!');
      setName('');
      setDescription('');
    } catch (error) {
        console.log(`The Error: ${error}`);
      setMessage('Failed to add role!');
    }
  };

  return (
    <div className='loginForm'>
      <h2>Add Role</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Role Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <button type="submit">Add Role</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRole;
