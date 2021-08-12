import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "../../../styles/Home.module.scss";
function Task({ task, index, deleteTaskHandler }) {
  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "C0C0C0" : "",
    ...draggableStyle,
  });

  const { taskListId } = task;
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div className={styles.cardBody}>{task.taskName}</div>
          <div className={styles.taskStatus}>{task.status}</div>
          <button
            onClick={() => {
              deleteTaskHandler(taskListId, task._id);
            }}
          >
            delete
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
