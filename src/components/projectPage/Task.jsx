import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import styles from "../../../styles/Home.module.scss";
import Modal from "../common/modal/Modal";
import SingleTask from "../common/singleTask/SingleTask";
function Task({ task, index, deleteTaskHandler }) {
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
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
            className={styles.task}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            onClick={toggleModal}
          >
            <div className={styles.cardBody}>{task.taskName}</div>
            <div className={styles.taskStatus}>{task.status}</div>
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
      {showModal ? (
        <Modal closeCallback={toggleModal} showModal={showModal}>
          <SingleTask taskId={task._id} />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default Task;
