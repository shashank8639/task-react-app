import React from "react";

const TaskItem = ({ task, checkAdmin, onDelete, onUpdate }) => {
  console.log("Mapped Task", task);
  
  const handleSliderChange = (e) => {
    if (e.target.value === "1" && !task.isCompleted) {
      onUpdate(task.id, "complete"); // user marks task as completed
    }
  };

  return (
    <li
      className={`task-item ${
        task.isCompleted
          ? task.isConfirmed
            ? "confirmed"
            : "completed"
          : "pending"
      }`}
    >
      <div className="task-header">
        <h3>{task.taskName}</h3>
        <span className="task-status">
          {task.isCompleted
            ? task.isConfirmed
              ? "✅ Confirmed by Admin"
              : "🟡 Awaiting Confirmation"
            : "⏳ Pending"}
        </span>
      </div>

      <p>
        <label className="field">Assigned to:</label>
        <span className="ans">{task.assignedTo}</span>
      </p>
      <p>
        <label className="field">Duration:</label>
        <span className="ans">{task.duration} hours</span>
      </p>

      {checkAdmin ? (
        <div className="task-actions">
          {checkAdmin &&
            task.isCompleted === true &&
            task.isConfirmed === false && (
              <button
                className="btn btn-confirm"
                onClick={() => onUpdate(task.id, "confirm")}
              >
                ✅ Confirm Completion
              </button>
            )}

          <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      ) : (
        <div className="slider-container">
          {!task.isCompleted ? (
            <>
              <label className="slider-label">❌ Mark as Completed</label>
              <input
                className="small-slider"
                type="range"
                min="0"
                max="1"
                defaultValue={0}
                onChange={handleSliderChange}
              />
            </>
          ) : (
            <p className="completed-text">
              ✅ Task marked as completed. Awaiting confirmation.
            </p>
          )}
        </div>
      )}
    </li>
  );
};

export default TaskItem;
