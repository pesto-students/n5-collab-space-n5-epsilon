import React from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
function Task({ task, index, deleteTaskHandler }) {
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userPermission = projectInfo.roleInfo;

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "C0C0C0" : "",
    ...draggableStyle,
  });

  const { taskListId } = task;
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          className='task'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div>{task.taskName}</div>
          <div>{task.status}</div>
          {userPermission.hasOwnProperty("taskList") &&
            userPermission.taskList.includes("Delete") && (
              <button
                onClick={() => {
                  deleteTaskHandler(taskListId, task._id);
                }}
              >
                delete
              </button>
            )}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
