// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { getUserRole } from '../service/api';
// import { useEffect } from "react";
// import { useState } from "react";

// const Navbar = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//       const fetchData = async () => {
//         try {
//           console.log('dashboard loding');
//           setIsAdmin(getUserRole())
          
//           console.log('From Dashboard loading : ', isAdmin);
//         } catch (error) {
//           console.log(`The Error: ${error}`);
//           console.error('Failed to load data');
//         }
//       };
//       fetchData();
//     }, []);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem('token');
//     navigate('/');
//   }
//   return (
//     <nav className="Nav">
//       <ul>
//         <li><Link className='link' to="/">Home</Link></li>
//         <li><Link className='link' to="/dashboard">Dashboard</Link></li>

//         {/* Only Admin can see Role-related links */}
//         {isAdmin && (
//           <>
//             <li><Link className='link' to="/roles">Roles</Link></li>
//             <li><Link className='link' to="/add-role">Add Role</Link></li>
//             <li><Link className='link' to="/assign-role">Assign Role</Link></li>
//           </>
//         )}
//         <li><Link className='link' to="/tasks">Tasks</Link></li>
//       </ul>
//       <div className="log-bloc">
//         <button onClick={handleLogout} className="logout">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from '../service/api';
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('dashboard loading');
        const role = await getUserRole();
        setIsAdmin(role); // assuming it returns 'admin'
        console.log('From Dashboard loading : ', role);
      } catch (error) {
        console.log(`The Error: ${error}`);
        console.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav className="nav-container">
      <div className="nav-header">
        {/* <Link to="/" className="logo">MyApp</Link> */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li><Link className='link' to="/">Home</Link></li>
        <li><Link className='link' to="/dashboard">Dashboard</Link></li>

        {isAdmin && (
          <>
            <li><Link className='link' to="/roles">Roles</Link></li>
            <li><Link className='link' to="/add-role">Add Role</Link></li>
            <li><Link className='link' to="/assign-role">Assign Role</Link></li>
          </>
        )}
        <li><Link className='link' to="/tasks">Tasks</Link></li>
        <li>
          <button onClick={handleLogout} className="logout">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
