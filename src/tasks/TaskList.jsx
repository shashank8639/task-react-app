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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = ({ checkAdmin }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const fetchTasks = async (filterType = "all") => {
    try {
      setLoading(true);
      setError(null);
      setFilter(filterType);
      let data;

      if (checkAdmin) {
        switch (filterType) {
          case "pending":
            data = await getPendingTasks();
            break;
          case "completed":
            data = await getCompletedTasks();
            break;
          case "confirmed":
            data = await getAllTasks(); // fetch all and filter confirmed ones
            break;
          default:
            data = await getAllTasks();
        }
      } else {
        data = await getUserTasks();
      }

      let formattedTasks = Array.isArray(data)
        ? data.map((task) => ({
            ...task,
            isCompleted: Boolean(task.completed),
            isConfirmed: Boolean(task.confirmed),
          }))
        : [];

      if (filterType === "confirmed") {
        formattedTasks = formattedTasks.filter((task) => task.isConfirmed);
      }

      setTasks(formattedTasks);
    } catch (error) {
      setError("Failed to load tasks.");
      console.error(error);
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
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleUpdate = async (id, action) => {
    try {
      let updatePayload = {};

      if (action === "complete") {
        updatePayload = { completed: true };
      } else if (action === "confirm") {
        updatePayload = { confirmed: true };
      }

      await updateTask(id, updatePayload);
      toast.success(
        action === "confirm"
          ? "✅ Task confirmed by Admin!"
          : "✅ Task marked as completed!"
      );
      // re-fetch after update to reflect latest state
      fetchTasks(filter);
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("❌ Failed to update task.");
    }
  };

  return (
    <div className="task-list-container">
      <ToastContainer position="top-right" autoClose={2000} />
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
          {filter !== "all" && (
            <button className="btn pulse" onClick={() => fetchTasks("all")}>
              🔙 Back to All Tasks
            </button>
          )}
          {tasks.some((task) => !task.isConfirmed && task.isCompleted) &&
            filter !== "pending" && (
              <button
                className="btn pulse"
                onClick={() => fetchTasks("pending")}
              >
                Show Pending Tasks
              </button>
            )}
          {filter !== "completed" && (
            <button
              className="btn pulse"
              onClick={() => fetchTasks("completed")}
            >
              Show Completed Tasks
            </button>
          )}
          {filter !== "confirmed" && (
            <button
              className="btn pulse"
              onClick={() => fetchTasks("confirmed")}
            >
              ✅ Show Confirmed Tasks
            </button>
          )}
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
