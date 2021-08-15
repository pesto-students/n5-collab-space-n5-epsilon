import React, { useEffect } from "react";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";

import useInput from "../../hooks/useInput";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { createNewTask, deleteTask } from "../../redux/actions/taskActions";
import { deleteTaskList } from "../../redux/actions/taskListActions";

function TaskList({ taskList }) {
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userPermission = projectInfo.roleInfo;
  const projectId = projectInfo._id;
  const [taskName, userInput] = useInput({ type: "text" });
  const { taskListName, task, tasksOrder } = taskList;
  const taskListId = taskList._id;
  const getStatusStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#00BFFF" : "",
  });
  const addTaskHandler = (taskListId) => {
    dispatch(
      createNewTask({
        taskName: taskName,
        status: "inactive",
        taskListId: taskListId,
      })
    );
  };

  const deleteTaskHandler = (taskListId, taskId) => {
    dispatch(
      deleteTask({
        taskId: taskId,
        taskListId: taskListId,
      })
    );
  };

  const deleteTaskListHandler = (taskListInfo) => {
    dispatch(deleteTaskList(taskListInfo));
  };

  const AddTask = (id) =>{
    addTaskHandler(id);
  }

  return (
    <Droppable droppableId={taskList._id}>
      {(provided, snapshot) => (
        <div
          className='taskList'
          ref={provided.innerRef}
          style={getStatusStyle(snapshot.isDraggingOver)}
        >
          <div className='list-header'>
            <div className='header-content'>
            <h5>{taskListName}</h5> {Object.keys(task).length !== 0 && <span>{`( ${Object.keys(task).length} )`}</span>}
            </div>
              <button className="add" onClick={() => {AddTask(taskListId)}}>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <g fill="none" stroke="#6d6d73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                  </g>
                </svg>
                </button>
              {userPermission.hasOwnProperty("taskList") &&
              userPermission.taskList.includes("Delete") && (
                <button className="delete" onClick={() => {
                  deleteTaskListHandler({ taskListId, projectId });
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em"
                       preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
                    <path fill="#FF8A65" d="M24 21.3L12.7 10L26 1.7L38.3 10z"/>
                    <path fill="#FFAB91" d="M24 21.3L12.7 10L17 4.7L38.3 10z"/>
                    <path fill="#B39DDB" d="M30.6 44H17.4c-2 0-3.7-1.4-4-3.4L9 11h30l-4.5 29.6c-.3 2-2 3.4-3.9 3.4z"/>
                    <path fill="#7E57C2" d="M38 13H10c-1.1 0-2-.9-2-2s.9-2 2-2h28c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
                  </svg>
                </button>
              )}
          </div>
          <div className='list-wrapper'>
          {tasksOrder &&
            tasksOrder.map((taskId, index) => {
              const taskObj = task[taskId];
              return (
                <>
                  {taskObj && (
                    <Task
                      key={taskObj._id}
                      taskListId={taskListId}
                      deleteTaskHandler={deleteTaskHandler}
                      index={index}
                      task={taskObj}
                    />
                  )}
                </>
              );
            })}
          {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
