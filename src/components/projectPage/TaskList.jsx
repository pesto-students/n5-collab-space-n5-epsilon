import React, { useEffect } from "react";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";

import useInput from "../../hooks/useInput";

import styles from "../../../styles/Home.module.scss";
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
                    deleteTaskListHandler({ taskListId, projectId });
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
      )}
    </Droppable>
  );
}

export default TaskList;
