import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import Register from "./components/Register";
import Task from "./tasks/Task";
import TaskList from "./tasks/TaskList";
import UpdateTask from "./tasks/UpdateTask";
import AddTask from "./tasks/AddTask";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import RoleList from "./components/RoleList";
import AddRole from "./components/AddRole";
import AssignRole from "./components/AssignRole";
import { RoleProvider } from "./context/RoleProvider";
import AuthForm from "./auth/AuthForm";

function App() {
  return (
    <div className="App">
      <Router>
        <RoleProvider>
          <Header reactLogo={reactLogo} title="Task Management App" />
          <Routes>
            <Route path="/" element={<AuthForm />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/roles" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
            <Route path="/add-role" element={<ProtectedRoute><AddRole /></ProtectedRoute>} />
            <Route path="/assign-role" element={<ProtectedRoute><AssignRole /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
            <Route path="/task/:id" element={<ProtectedRoute><Task /></ProtectedRoute>} />
            <Route path="/create-task" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
            <Route path="/update-task/:id" element={<ProtectedRoute><UpdateTask /></ProtectedRoute>} />
          </Routes>
        </RoleProvider>
      </Router>
    </div>
  );
}

export default App;
