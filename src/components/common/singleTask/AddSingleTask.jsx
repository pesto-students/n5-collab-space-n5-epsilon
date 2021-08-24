import { useState, useEffect } from "react";
import { taskURL } from "../../../client_apis/workSpaceApi";
import produce from "immer";
import styles from "../../../../styles/singleTask.module.scss";
import React from "react";
import TagBox from "./TagBox";
import TaskHeader from "./TaskHeader";
import { toast } from "react-toastify";
function AddSingleTask({
  taskListId,
  addTaskHandler,
  toggleAddTaskModal,
  assignedTo,
}) {
  const [taskInfo, setTaskInfo] = useState({
    taskName: "",
    status: "inactive",
    description: "",
    taskListId: taskListId,
    tags: [],
    assignedTo,
  });

  const saveNewTask = () => {
    if (taskInfo.taskName) {
      addTaskHandler(taskInfo);
      toggleAddTaskModal();
    } else {
      toast.warn("Please add task Name");
    }
  };

  const addTagsHandler = (tagInputValue) => {
    setTaskInfo(
      produce((draft) => {
        draft.tags.push(tagInputValue);
      })
    );
  };
  const updateTaskDescription = (updateTaskDescriptionText) => {
    setTaskInfo(
      produce((draft) => {
        draft.description = updateTaskDescriptionText;
      })
    );
  };

  const updateTaskName = (updateTaskNameText) => {
    setTaskInfo(
      produce((draft) => {
        draft.taskName = updateTaskNameText;
      })
    );
  };
  const deleteTagsHandler = (tag) => {
    setTaskInfo(
      produce((draft) => {
        const index = draft.tags.indexOf(tag);
        draft.tags.splice(index, 1);
      })
    );
  };
  return (
    <>
      <div className={styles.add_single_task}>
        <div className={styles.first_panel}>
          <TaskHeader
            taskInfo={taskInfo}
            updateTaskDescription={updateTaskDescription}
            updateTaskName={updateTaskName}
          />
        </div>
        <div className={styles.second_panel}>
          <TagBox
            tagsCollection={taskInfo.tags}
            addTagsHandler={addTagsHandler}
            deleteTagsHandler={deleteTagsHandler}
          />
        </div>
        <div className={styles.edit_actions}>
          <button className={styles.edit_actions_save} onClick={saveNewTask}>
            save
          </button>
          <button onClick={toggleAddTaskModal}>cancel</button>
        </div>
      </div>
    </>
  );
}

export default AddSingleTask;
