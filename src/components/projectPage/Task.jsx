import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import styles from "../../../styles/Home.module.scss";
import Modal from "../common/modal/Modal";
import SingleTask from "../common/singleTask/SingleTask";
import modalStyles from "../../../styles/modal.module.scss";
import DeleteStackIcon from "../iconComponents/DeleteStackIcon";

function Task({ task, index, deleteTaskHandler,taskCssClassName="task"
 }) {
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userRole = projectInfo.roleInfo.name;
  const userPermission = projectInfo.roleInfo;
  const [showModal, setShowModal] = useState(false);

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "C0C0C0" : "",
    ...draggableStyle,
  });

  const { taskListId } = task;
  const toggleModal = () => {
    let stateShowModal = !showModal;
    setShowModal(stateShowModal);
  };
  return (
    <React.Fragment>
      <Draggable draggableId={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            className={taskCssClassName}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            onClick={toggleModal}
          >
            <div className="name">{task.taskName}</div>
            <div className="status">{task.status}</div>
            <div className="tags">
              {task.tags?.map((tag, index) => {
                return <p key={tag + index}>{tag}</p>;
              })}
            </div>
            {userPermission.hasOwnProperty("taskList") &&
              userPermission.taskList.includes("Delete") && (
                <span
                  className="delete"
                  onClick={() => {
                    deleteTaskHandler(taskListId, task._id);
                  }}
                >
                  <DeleteStackIcon />
                </span>
              )}
          </div>
        )}
      </Draggable>
      {showModal ? (
        <Modal
          closeCallback={toggleModal}
          showModal={showModal}
          styles={modalStyles}
        >
          <SingleTask
            taskId={task._id}
            taskListId={taskListId}
            userRole={userRole}
            userPermission={userPermission}
            projectInfo={projectInfo}
          />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default Task;
