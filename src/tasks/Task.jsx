import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById } from "../service/api";
import { useRole } from "../context/RoleProvider";

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const { isAdmin } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id);
        setTask(response);
      } catch (error) {
        setError(error.response?.data || "Failed to load task.");
      }
    };
    fetchTask();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>{task.taskName}</h2>
      <p>Duration: {task.duration} days</p>
      <p>Progress: {task.isCompleted ? "Completed" : "In Progress"}</p>
      <p>Assigned To: {task.assignedTo}</p>
      {isAdmin ? (
        <p><strong>Admin View</strong> - You can see all tasks</p>
      ) : (
        <p><strong>User View</strong> - You can only see your tasks</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Task;
