import { useEffect, useState } from 'react';
import TaskList from '../tasks/TaskList';
import { getAllTasks,getUserTasks } from '../service/api';
import Navbar from './Navbar';
import { getUserRole } from '../service/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [checkAdmin, setCheckAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('dashboard loding');
        const profile = await getUserProfile();
        console.log('profile: ', profile);
        console.log('username: ', profile.username);
        const roleNames = profile.roles.map(r => r.roleName);
        setCheckAdmin(roleNames.includes("ROLE_ADMIN"));
        const result = checkAdmin ? await getAllTasks() : await getUserTasks();
        setData(result);
        console.log('From Dashboard loading : ', checkAdmin);
        console.log(result);
        console.log(localStorage.getItem('uname'));
      } catch (error) {
        console.log(`The Error: ${error}`);
        console.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Dashboard</h2>
      {data ? <TaskList checkAdmin={checkAdmin}/> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
