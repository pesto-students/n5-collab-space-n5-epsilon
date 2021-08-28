import React, { useEffect, useState } from "react";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";

import useInput from "../../hooks/useInput";
import Modal from "../common/modal/Modal";
import AddSingleTask from "../common/singleTask/AddSingleTask";
import { Droppable } from "react-beautiful-dnd";
import { createNewTask, deleteTask } from "../../redux/actions/taskActions";
import { deleteTaskList } from "../../redux/actions/taskListActions";
import modalStyles from "../../../styles/truncatModal.module.scss";
import conformationModalStyles from "../../../styles/conformationModal.module.scss";
import ConformationPopUp from "../common/customPopUp/ConformationPopUp";
import { toast } from "react-toastify";
import CircularAddIcon from "../iconComponents/CircularAddIcon";
import TrashCanIcon from "../iconComponents/TrashCanIcon";

export default function TaskList({
  taskList,
  layout,
  taskTypeFilter,
  taskTagFilter,
  taskAssignedFilter,
  taskListKey,
  deleteTaskHandler,
}) {
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userPermission = projectInfo.roleInfo;
  const projectId = projectInfo._id;
  const [taskName, userInput] = useInput({ type: "text" });
  const { taskListName, task, tasksOrder } = taskList;
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allCollaborators, setAllCollaborators] = useState(
    projectInfo.contributions
  );
  const assignedTo = allCollaborators.filter(
    (contributions) => contributions.userId._id == projectInfo.userId
  )[0].userId;
  const toggleModal = () => {
    let showDeleteModals = !showDeleteModal;
    setShowDeleteModal(showDeleteModals);
  };
  const taskListId = taskList._id;
  const getStatusStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#b39ddb8a" : "",
  });
  const toggleAddTaskModal = () => {
    let stateShowModal = !showAddTaskModal;
    setShowAddTaskModal(stateShowModal);
  };
  const addTaskHandler = (newTaskInfo) => {
    dispatch(createNewTask(newTaskInfo));
  };
  const deleteTaskListHandler = (taskListInfo) => {
    dispatch(deleteTaskList(taskListInfo));
    toast.success("TaskList Deleted Successfully!");
  };

  const AddTask = (id) => {
    addTaskHandler(id);
  };

  return (
    <React.Fragment key={taskListKey}>
      <Droppable
        droppableId={taskList._id}
        direction={layout}
        key={taskListKey}
      >
        {(provided, snapshot) => (
          <div
            className="taskList"
            ref={provided.innerRef}
            style={getStatusStyle(snapshot.isDraggingOver)}
            key={taskListKey}
          >
            <div className="list-header">
              <div className="header-content">
                <h5>{taskListName}</h5>{" "}
                {Object.keys(task).length !== 0 && (
                  <span>{`( ${Object.keys(task).length} )`}</span>
                )}
              </div>
              <button
                className="add"
                onClick={() => {
                  toggleAddTaskModal();
                  // AddTask(taskListId);
                }}
              >
                <CircularAddIcon />
              </button>
              {userPermission.hasOwnProperty("taskList") &&
                userPermission.taskList.includes("Delete") && (
                  <button
                    className="delete"
                    onClick={() => {
                      toggleModal();
                      //deleteTaskListHandler({ taskListId, projectId });
                    }}
                  >
                    <TrashCanIcon />
                  </button>
                )}
            </div>
            <div className="list-wrapper">
              {tasksOrder &&
                tasksOrder.map((taskId, index) => {
                  const taskObj = task[taskId];
                  let tagFilter = false;
                  let listFilter = false;
                  let userFilter = false;
                  if (taskTypeFilter && taskTypeFilter !== "any") {
                    listFilter = true;
                  } else {
                    listFilter = false;
                  }
                  if (taskTagFilter && taskTagFilter !== "any") {
                    tagFilter = true;
                  } else {
                    tagFilter = false;
                  }
                  if (taskAssignedFilter && taskAssignedFilter !== "any") {
                    userFilter = true;
                  } else {
                    userFilter = false;
                  }

                  return (
                    <>
                      {taskObj &&
                        (listFilter
                          ? taskTypeFilter.toLowerCase() ===
                            taskListName.toLowerCase()
                          : true) &&
                        (tagFilter
                          ? taskObj.tags?.includes(taskTagFilter)
                          : true) &&
                        (userFilter
                          ? taskObj.assignedTo === taskAssignedFilter
                          : true) &&
                        (taskObj.status
                          ? taskObj.status != "completed"
                          : true) && (
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
            {showAddTaskModal ? (
              <Modal
                closeCallback={toggleAddTaskModal}
                showModal={showAddTaskModal}
                styles={modalStyles}
              >
                <AddSingleTask
                  taskListId={taskListId}
                  addTaskHandler={addTaskHandler}
                  toggleAddTaskModal={toggleAddTaskModal}
                  assignedTo={assignedTo}
                  allCollaborators={allCollaborators}
                />
              </Modal>
            ) : null}
            {showDeleteModal ? (
              <Modal
                showModal={showDeleteModal}
                styles={conformationModalStyles}
              >
                <ConformationPopUp
                  title={"Delete TaskList  ?"}
                  onAcceptHandler={() => {
                    deleteTaskListHandler({ taskListId, projectId });
                    //deleteProjectHandler(project.projectId);
                    toggleModal();
                  }}
                  onCancelHandler={toggleModal}
                />
              </Modal>
            ) : null}
          </div>
        )}
      </Droppable>
    </React.Fragment>
  );
}
