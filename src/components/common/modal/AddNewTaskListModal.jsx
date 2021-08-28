import React from "react";
import { useDispatch } from "react-redux";
import { createNewTaskList } from "../../../redux/actions/taskListActions";
import Image from "next/image";
import { toast } from "react-toastify";
function AddNewTaskListModal({
  submittedForm,
  setSubmittedForm,
  setTaskListName,
  setShowForm,
  projectInfo,
  taskListName,
  projectId,
}) {
  const dispatch = useDispatch();
  const regex = {
    nameRegex: /^[a-zA-Z0-9_\s .]*$/,
  };
  return (
    <div className="modal-form">
      <div className="content-wrapper">
        <div className="cross">
          <Image
            onClick={() => {
              setShowForm(false);
            }}
            src="https://api.iconify.design/maki/cross.svg?color=black"
            alt="cross"
            width="14"
            height="14"
          />
        </div>
        <h1>Add New Task List</h1>
        <form>
          <input
            type="text"
            placeholder="Task List Name"
            onKeyUp={(e) => {
              if (!regex.nameRegex.test(e.target.value)) {
                setSubmittedForm({
                  ...submittedForm,
                  error: "Enter a valid name",
                });
              } else {
                setTaskListName(e.target.value);
                setSubmittedForm({
                  ...submittedForm,
                  formTouched: true,
                  error: false,
                });
              }
            }}
          />
          <button
            className="transparent-btn"
            disabled={
              !submittedForm.formTouched ||
              !!submittedForm.error ||
              submittedForm.submitting
            }
            onClick={async (e) => {
              e.preventDefault();
              let nameAlreadyTaken = false;
              for (const [key, value] of Object.entries(
                projectInfo.taskLists
              )) {
                if (value.taskListName == taskListName) {
                  nameAlreadyTaken = true;
                }
              }

              if (nameAlreadyTaken) {
                toast.warn(`${taskListName} already exists`);
              } else {
                await dispatch(
                  createNewTaskList({
                    taskListName: taskListName,
                    projectId: projectId,
                  })
                );
                setShowForm(false);
              }
            }}
          >
            Add Task List
          </button>
          {submittedForm.error && (
            <p className="error">{submittedForm.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddNewTaskListModal;
