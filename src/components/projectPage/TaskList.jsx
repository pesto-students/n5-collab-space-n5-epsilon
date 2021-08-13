import React, { useEffect } from "react";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewTask,
  deleteTask,
  deleteTaskList,
} from "../../redux/actions/projectPageActions";
import useInput from "../../hooks/useInput";

import styles from "../../../styles/Home.module.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function TaskList({ taskList }) {
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userPermission = projectInfo.roleInfo;
  const [taskName, userInput] = useInput({ type: "text" });
  const { _id, taskListName, task } = taskList;
  const taskListId = _id;
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

  const deleteTaskListHandler = (taskListId) => {
    dispatch(deleteTaskList({ taskListId: taskListId }));
  };

  return (
    <Droppable droppableId={taskList._id}>
      {(provided, snapshot) => (
        <div
          className={styles.taskList}
          ref={provided.innerRef}
          style={getStatusStyle(snapshot.isDraggingOver)}
        >
          <div className={styles.cardHeader}>
            <h5>{taskListName}</h5>
            <h6>{task && task.length > 0 ? task.length : ""}</h6>
            {userPermission.hasOwnProperty("taskList") &&
              userPermission.taskList.includes("Delete") && (
                <button
                  onClick={() => {
                    deleteTaskListHandler(taskListId);
                  }}
                >
                  x
                </button>
              )}
          </div>
          <div>
            {userInput}
            <button
              onClick={() => {
                addTaskHandler(taskListId);
              }}
            >
              name
            </button>
          </div>

          {task &&
            task.map((taskIn, index) => {
              return (
                <Task
                  key={taskIn._id}
                  taskListId={taskListId}
                  deleteTaskHandler={deleteTaskHandler}
                  index={index}
                  task={taskIn}
                />
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
