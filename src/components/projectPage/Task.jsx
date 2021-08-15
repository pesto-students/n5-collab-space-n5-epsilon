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
          <div className='name'>{task.taskName}</div>
          <div className='status'>{task.status}</div>
          <div className='tags'>
            {
              task.tags?.map((tag) => {
                return <span>{tag}</span>
              })
            }
          </div>
          {userPermission.hasOwnProperty("taskList") &&
            userPermission.taskList.includes("Delete") && (
              <span className='delete' onClick={() => {deleteTaskHandler(taskListId, task._id);}}>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
                  <g fill="#D1C4E9"><path d="M38 7H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/>
                    <path d="M38 19H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z"/>
                    <path d="M38 31H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z"/>
                  </g>
                  <circle fill="#F44336" cx="38" cy="38" r="10"/>
                  <g fill="#fff"><path d="M43.31 41.181l-2.12 2.122l-8.485-8.484l2.121-2.122z"/>
                    <path d="M34.819 43.31l-2.122-2.12l8.484-8.485l2.122 2.121z"/>
                  </g>
                </svg>
              </span>
            )}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
