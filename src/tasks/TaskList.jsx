import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserTasks,
  getAllTasks,
  getPendingTasks,
  getCompletedTasks,
  updateTask,
  deleteTaskById,
} from "../service/api";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ checkAdmin }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async (filter = "all") => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (checkAdmin) {
        if (filter === "pending") {
          data = await getPendingTasks();
        } else if (filter === "completed") {
          data = await getCompletedTasks();
        } else {
          data = await getAllTasks();
        }
      } else {
        data = await getUserTasks();
      }
      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTaskById(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleUpdate = async (id, completed) => {
    try {
      await updateTask(id, { isCompleted: completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted: completed } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-header-bar">
        <h2>{checkAdmin ? "All Tasks (Admin)" : "Your Tasks"}</h2>
        {checkAdmin && (
          <button
            className="btn btn-add pulse"
            onClick={() => navigate("/create-task")}
          >
            ➕ Add Task
          </button>
        )}
      </div>

      {checkAdmin && (
        <div className="filter-buttons">
          <button className="btn pulse" onClick={() => fetchTasks("pending")}>Show Pending Tasks</button>
          <button className="btn pulse" onClick={() => fetchTasks("completed")}>Show Completed Tasks</button>
        </div>
      )}

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              checkAdmin={checkAdmin}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
