import React from "react";

const TaskItem = ({ task, checkAdmin, onDelete, onUpdate }) => {
  return (
    <li
      className={`task-item ${
        task.isCompleted
          ? task.isConfirmedByAdmin
            ? "confirmed"
            : "completed"
          : "pending"
      }`}
    >
      <div className="task-header">
        <h3>{task.taskName}</h3>
        <span className="task-status">
          {task.isCompleted ? (
            task.isConfirmedByAdmin ? (
              "✅ Confirmed by Admin"
            ) : (
              "🟡 Awaiting Confirmation"
            )
          ) : (
            "⏳ Pending"
          )}
        </span>
      </div>

      <p>
        <strong>Assigned to:</strong> {task.assignedTo}
      </p>
      <p>
        <strong>Duration:</strong> {task.duration} hours
      </p>

      {checkAdmin ? (
        <div className="task-actions">
          {task.isCompleted && !task.isConfirmedByAdmin && (
            <button
              className="btn btn-confirm"
              onClick={() => onUpdate(task.id, true)}
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
          <label className="slider-label">
            {task.isCompleted
              ? task.isConfirmedByAdmin
                ? "✅ Confirmed"
                : "✅ Completed (Unconfirmed)"
              : "❌ Incomplete"}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            value={task.isCompleted ? 1 : 0}
            disabled={task.isConfirmedByAdmin}
            onChange={() => onUpdate(task.id, !task.isCompleted)}
          />
        </div>
      )}
    </li>
  );
};

export default TaskItem;
