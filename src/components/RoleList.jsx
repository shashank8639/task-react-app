import { useEffect, useState } from 'react';
import { getAllRoles } from '../service/api';

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getAllRoles();
        setRoles(data);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div>
      <h2>All Roles</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} - {role.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;
