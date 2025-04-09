import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateTask } from '../service/api';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ taskName: '', duration: '', isCompleted: false});

  useEffect(() => {
    const fetchTask = async () => {
      const data = await getTaskById(id);
      setTask(data);
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task);
    navigate('/tasks');
  };

  return (
    <div className='loginForm'>
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={task.taskName} onChange={handleChange} placeholder="Task Name" required />
        <input name="number" value={task.duration} onChange={handleChange} placeholder="Duration" required />
        <input type="checkbox" name="isCompleted" value={task.isCompleted} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTask;
