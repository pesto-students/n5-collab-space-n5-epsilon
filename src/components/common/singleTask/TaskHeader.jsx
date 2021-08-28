import React, { useState } from "react";
import styles from "../../../../styles/singleTask.module.scss";
import ResizableTextArea from "../../textArea/ResizeableTextArea";
export default function TaskHeader({
  taskInfo,
  updateTaskName,
  updateTaskDescription,
}) {
  const [descriptionToggle, setDescriptionToggle] = useState(true);
  const [taskNameToggle, setTaskNameToggle] = useState(true);
  const [description, setDescription] = useState(taskInfo.description);
  const [taskName, setTaskName] = useState(taskInfo.taskName);
  const handleDescriptionToggle = () => {
    const newDescriptionToggle = !descriptionToggle;
    setDescriptionToggle(newDescriptionToggle);
  };
  const handleTaskNameToggle = () => {
    const newTaskNameToggle = !taskNameToggle;
    setTaskNameToggle(newTaskNameToggle);
  };
  const saveTaskNameHandler = () => {
    updateTaskName(taskName);
    handleTaskNameToggle();
  };
  const saveDescriptionHandler = () => {
    updateTaskDescription(description);
    handleDescriptionToggle();
  };
  return (
    <>
      <div className={styles.task_header}>
        <div className="task_information">
          {/* <h1>{taskInfo.taskName}</h1> */}
          {taskNameToggle ? (
            <h1
              onDoubleClick={() => {
                handleTaskNameToggle();
              }}
              className={styles.task_name_heading_name}
            >
              {taskInfo.taskName
                ? taskInfo.taskName
                : "Double Click To Add  Title"}
            </h1>
          ) : (
            <div className={styles.edit_description}>
              <div className={styles.edit_textArea}>
                <ResizableTextArea
                  className={styles.description_textarea}
                  setValue={setTaskName}
                  value={taskName}
                  maxRows={1}
                  minRows={1}
                  rows={1}
                  placeholder="task Name ..."
                  outsideClickCallback={saveTaskNameHandler}
                />
              </div>
              <div className={styles.edit_actions}>
                <button
                  className={styles.edit_actions_save}
                  onClick={saveTaskNameHandler}
                >
                  save
                </button>
                <button onClick={saveTaskNameHandler}>cancel</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.task_description}>
          <div className="task_description_heading">
            <h1> Description</h1>
          </div>
          {descriptionToggle ? (
            <p
              onDoubleClick={() => {
                handleDescriptionToggle();
              }}
            >
              {taskInfo.description
                ? taskInfo.description
                : "Double click here to add a description"}
            </p>
          ) : (
            <div className={styles.edit_description}>
              <div className={styles.edit_textArea}>
                <ResizableTextArea
                  className={styles.description_textarea}
                  setValue={setDescription}
                  value={description}
                  maxRows={5}
                  placeholder="description ..."
                  outsideClickCallback={saveDescriptionHandler}
                />
              </div>
              <div className={styles.edit_actions}>
                <button
                  className={styles.edit_actions_save}
                  onClick={saveDescriptionHandler}
                >
                  save
                </button>
                <button onClick={handleDescriptionToggle}>cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
