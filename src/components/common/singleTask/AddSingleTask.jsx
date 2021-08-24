import { useState, useEffect } from "react";
import { taskURL } from "../../../client_apis/workSpaceApi";
import produce from "immer";
import styles from "../../../../styles/singleTask.module.scss";
import React from "react";
import TagBox from "./TagBox";
import TaskHeader from "./TaskHeader";
import { toast } from "react-toastify";
import AssignSelect from "./AssignSelect";
import CustomSelect from "../customSelect/CustomSelect";
function AddSingleTask({
  taskListId,
  addTaskHandler,
  toggleAddTaskModal,
  assignedTo,
  allCollaborators,
}) {
  const [taskInfo, setTaskInfo] = useState({
    taskName: "",
    status: "inactive",
    description: "",
    taskListId: taskListId,
    tags: [],
    assignedTo,
  });

  const collaboratorOptions = allCollaborators.map((user) => {
    return {
      _id: user.userId._id,
      name: user.userId.name,
      value: user.userId.email,
    };
  });
  const assignedToCollaborators = {
    _id: assignedTo._id,
    name: assignedTo.name,
    value: assignedTo.email,
  };
  console.log("assignedToCollaborators", assignedTo);
  const [value, setValue] = useState(assignedToCollaborators);
  const assignCollaboratorsHandler = (option) => {
    const selectedUserId = option._id;
    if (value._id === selectedUserId) {
      toast.info("Task Already Assigned to " + option.name);
    } else {
      setValue(option);
      setTaskInfo(
        produce((draft) => {
          draft.assignedTo = selectedUserId;
        })
      );
    }
  };

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
        <div className="assigned-box">
          <span>Assigned to:</span>
          {collaboratorOptions.length > 0 && (
            <CustomSelect
              prompt="Assign To"
              options={collaboratorOptions}
              value={value}
              onChange={assignCollaboratorsHandler}
              label="name"
            />
          )}
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
