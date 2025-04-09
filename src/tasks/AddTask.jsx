import React, { useState } from "react";
import { addTask } from "../service/api";
import Navbar from "../components/Navbar";

const AddTask = () => {
  const [task, setTask] = useState({
    taskName: "",
    duration: "",
    isCompleted: false,
    assignedTo: ""
  });

  const [message, setMessage] = useState("");

  //  Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert duration to integer
      const requestData = {
        ...task,
        duration: parseInt(task.duration, 10)  // Ensure duration is an integer
      };

      await addTask(requestData);
      setMessage("Task added successfully!");
      
      // Reset form
      setTask({
        taskName: "",
        duration: "",
        isCompleted: false,
        assignedTo: ""
      });

    } catch (error) {
      console.error("Error adding task:", error);
      setMessage("Failed to add task. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Navbar />
      <h2>Add New Task</h2>

      {message && (
        <p style={{ color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        
        {/* Task Name */}
        <label>Task Name:</label>
        <input
          type="text"
          name="taskName"
          value={task.taskName}
          onChange={handleChange}
          required
          placeholder="Enter task name"
        />

        {/* Duration */}
        <label>Duration:</label>
        <input
          type="number"
          name="duration"
          value={task.duration}
          onChange={handleChange}
          required
          min="1"
          placeholder="Enter duration in hours"
        />        

        {/* Assigned To */}
        <label>Assigned To:</label>
        <input
          type="text"
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          required
          placeholder="Enter username"
        />

        {/* Submit Button */}
        <button type="submit" style={{ marginTop: "15px", cursor: "pointer" }}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
