import { useRouter } from "next/router";
import { getProjectInfo } from "../../../src/redux/actions/projectPageActions";
import {
  deleteTask,
  moveTaskAction,
  reorderTask,
} from "../../../src/redux/actions/taskActions";
import { wrapper } from "../../../src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "../../../src/components/projectPage/TaskList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { CHANGE_TASK_ORDER } from "../../../src/redux/constants/taskActionConstants";
import NoSSR from "react-no-ssr";
import useInput from "../../../src/hooks/useInput";
import { verify } from "jsonwebtoken";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import {
  createNewTaskList,
  deleteTaskList,
} from "../../../src/redux/actions/taskListActions";
import WorkSpaceTitle from "../../../src/components/workspace/WorkSpaceTitle";
import { useEffect, useState } from "react";
import ResizableTextArea from "../../../src/components/textArea/ResizeableTextArea";
import styles from "../../../styles/description.module.scss";

const ProjectPage = () => {
  resetServerContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectPageState = useSelector((state) => state.ProjectReducer);
  const projectInfo = projectPageState.projectInfo;
  const loading = projectPageState.loading;
  const is_404 = projectPageState.is_404;

  const userRole = projectInfo.roleInfo.name;
  const userPermission = projectInfo.roleInfo;
  const { projectId } = router.query;
  const { taskLists, taskListsOrder } = projectInfo;
  const [tab, setTab] = useState("TaskList");
  const [layout, setLayout] = useState("");
  const [taskTypeFilter, setTaskTypeFilter] = useState("");
  const [taskTagFilter, setTaskTagFilter] = useState("");
  const [taskAssignedFilter, setTaskAssignedFilter] = useState("");
  const [submittedForm, setSubmittedForm] = useState({
    formTouched: false,
    error: false,
    submitting: false,
  });
  const [toggleDescription, setToggleDescription] = useState(true);
  const [description, setDescription] = useState(projectInfo.description);
  const handleDescriptionToggle = () => {
    const newDescription = !toggleDescription;
    setToggleDescription(newDescription);
  };
  const saveDescriptionHandler = () => {
    const newDescription = description;
    setDescription(newDescription);
    handleDescriptionToggle();
  };
  const [taskListName, setTaskListName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const regex = {
    nameRegex: /^([a-zA-Z]+( [a-zA-Z]+)|[a-zA-Z]){2,50}$/,
  };
  const [taskListsName, setTaskListsName] = useState([]);
  const [taskTagNames, setTaskTagNames] = useState({});
  const addTaskListHandler = () => {
    setTaskListName("");
    setSubmittedForm({
      formTouched: false,
      error: false,
      submitting: false,
    });
    setShowForm(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === "delete") {
      const taskName =
        projectInfo.taskLists[result.source.droppableId].task[
          result.draggableId
        ].name;
      dispatch(
        deleteTask({
          taskId: result.draggableId,
          taskListId: result.source.droppableId,
        })
      );
      toast.success(`Delete task ${taskName} Successfully `);
      return;
    }
    if (result.destination.droppableId === result.source.droppableId) {
      if (result.destination.index === result.source.index) {
        return;
      }
      dispatch(
        reorderTask({
          taskId: result.draggableId,
          initialIndex: result.source.index,
          finalIndex: result.destination.index,
          taskListId: result.destination.droppableId,
          tasksOrder: [
            ...projectInfo.taskLists[result.destination.droppableId].tasksOrder,
          ],
        })
      );
    }
    if (result.destination.droppableId !== result.source.droppableId) {
      dispatch(
        moveTaskAction({
          taskId: result.draggableId,
          sourceTaskListId: result.source.droppableId,
          destinationTaskListId: result.destination.droppableId,
          initialIndex: result.source.index,
          finalIndex: result.destination.index,
          sourceTaskOrder: [
            ...projectInfo.taskLists[result.source.droppableId].tasksOrder,
          ],
          destinationTaskOrder: [
            ...projectInfo.taskLists[result.destination.droppableId].tasksOrder,
          ],
        })
      );
    }
  };

  const toggle = (layout) => {
    localStorage.setItem("task-layout", layout);
    setLayout(layout);
  };

  useEffect(() => {
    setLayout(localStorage.getItem("task-layout") || "vertical");

    const taskLNames = [];
    const taskTNames = {};

    Object.keys(taskLists).map((taskListId) => {
      if (!taskLNames.includes(taskLists[taskListId].taskListName)) {
        taskLNames.push(taskLists[taskListId].taskListName);
      }
      // console.log('===test===', taskLists[taskListId].taskListName, taskLists[taskListId]);

      Object.keys(taskLists[taskListId].task).map((singleTask) => {
        // console.log('===test===', taskLists[taskListId].taskListName, taskLists[taskListId].task[singleTask].tags);
        taskLists[taskListId].task[singleTask].tags.forEach((tag) => {
          taskTNames[tag] = true;
        });
      });
    });
    setTaskTagNames(taskTNames);
    setTaskListsName(taskLNames);
    console.log("===test===", taskTNames);
  }, [taskLists]);

  return (
    <>
      {userRole && (
        <div className="mainContainerBody">
          <NoSSR>
            <WorkSpaceTitle title={projectInfo.projectName} isProject={true} />
            <div className="project-data">
              <div className="tab-list">
                <span
                  className={`${tab === "TaskList" && "active"}`}
                  onClick={() => {
                    setTab("TaskList");
                  }}
                >
                  Tasks
                </span>
                <span
                  className={`${tab === "Description" && "active"}`}
                  onClick={() => {
                    setTab("Description");
                  }}
                >
                  Description
                </span>
              </div>
              {tab === "TaskList" && (
                <div
                  className={`task-list-box ${
                    layout === "horizontal" ? "rowLayout" : ""
                  }`}
                >
                  <DragDropContext onDragEnd={onDragEnd}>
                    <div className="top-panel-row">
                      <div className="filter-box">
                        <div className="filter-wrapper">
                          <p>Task Type</p>
                          <select
                            onChange={(e) => setTaskTypeFilter(e.target.value)}
                          >
                            <option value="any">Any</option>
                            {taskListsName.length &&
                              taskListsName.map((taskListName) => {
                                return (
                                  <option
                                    key={taskListName}
                                    value={taskListName}
                                  >
                                    {taskListName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>

                        <div className="filter-wrapper">
                          <p>Tag Type</p>
                          <select
                            onChange={(e) => setTaskTagFilter(e.target.value)}
                          >
                            <option value="any">Any</option>
                            {Object.keys(taskTagNames).length &&
                              Object.keys(taskTagNames).map((tagName) => {
                                return (
                                  <option key={tagName} value={tagName}>
                                    {tagName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="layout-toggle">
                        <Droppable droppableId="delete">
                          {(provided, snapshot) => (
                            <span
                              ref={provided.innerRef}
                              className={`icon trash-can`}
                              data-position="delete"
                            >
                              <svg
                                className="empty"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                width="1em"
                                height="1em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37l3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2m2 0h8v-6.8L10.46 9H8v10z"
                                  fill="#6d6d73"
                                />
                              </svg>
                            </span>
                          )}
                        </Droppable>
                        <span
                          className={`icon ${
                            layout === "vertical" ? "active" : ""
                          }`}
                          onClick={() => {
                            toggle("vertical");
                          }}
                        >
                          <svg
                            width="15px"
                            height="15px"
                            viewBox="0 0 15 15"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g stroke="none" strokeWidth="1" fillRule="evenodd">
                              <path
                                d="M0,0 L15,0 L15,3 L0,3 L0,0 Z M0,6 L15,6 L15,9 L0,9 L0,6 Z M0,12 L15,12 L15,15 L0,15 L0,12 Z"
                                id="column_ic"
                                fillRule="nonzero"
                                transform="translate(7.500000, 7.500000) rotate(-270.000000) translate(-7.500000, -7.500000) "
                              />
                            </g>
                          </svg>
                        </span>
                        <span
                          className={`icon ${
                            layout === "horizontal" ? "active" : ""
                          }`}
                          onClick={() => {
                            toggle("horizontal");
                          }}
                        >
                          <svg
                            width="15px"
                            height="15px"
                            viewBox="0 0 15 15"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0,0 L15,0 L15,3 L0,3 L0,0 Z M0,6 L15,6 L15,9 L0,9 L0,6 Z M0,12 L15,12 L15,15 L0,15 L0,12 Z"
                              fillRule="nonzero"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="taskListContainer">
                      {taskListsOrder &&
                        taskListsOrder.map((taskListId) => {
                          return (
                            <TaskList
                              key={taskListId}
                              taskList={taskLists[taskListId]}
                              layout={layout || "Vertical"}
                              taskTypeFilter={taskTypeFilter}
                              taskTagFilter={taskTagFilter}
                              taskAssignedFilter={taskAssignedFilter}
                            />
                          );
                        })}

                      {userPermission.hasOwnProperty("taskList") &&
                        userPermission.taskList.includes("Create") && (
                          <button
                            className="add-task-list"
                            onClick={addTaskListHandler}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="img"
                              width="1em"
                              height="1em"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="#6d6d73"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v8" />
                                <path d="M8 12h8" />
                              </g>
                            </svg>
                            <span>Add New Task List</span>
                          </button>
                        )}
                    </div>
                  </DragDropContext>
                </div>
              )}
              {tab === "Description" && (
                <>
                  {toggleDescription ? (
                    <div
                      className="description"
                      onDoubleClick={handleDescriptionToggle}
                    >
                      {projectInfo.description
                        ? projectInfo.description
                        : "Double click here to add a description"}
                    </div>
                  ) : (
                    <div className={styles.edit_description}>
                      <h1>{toggleDescription}</h1>
                      <div className={styles.edit_textArea}>
                        <ResizableTextArea
                          className={styles.description_textarea}
                          setValue={setDescription}
                          value={description}
                          maxRows={20}
                          rows={20}
                          placeholder="description ..."
                        />
                      </div>
                      <div className={styles.edit_actions}>
                        <button
                          className={styles.edit_actions_save}
                          onClick={saveDescriptionHandler}
                        >
                          save
                        </button>
                        <button onClick={handleDescriptionToggle}>
                          cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <ToastContainer autoClose={2000} />
            {showForm && (
              <div className="modal-form">
                <div className="content-wrapper">
                  <img
                    className="cross"
                    onClick={() => {
                      setShowForm(false);
                    }}
                    src="https://api.iconify.design/maki/cross.svg?color=black"
                    alt="cross"
                  />
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
                          if (
                            projectInfo.taskLists[key].taskListName ==
                            taskListName
                          ) {
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
            )}
          </NoSSR>
        </div>
      )}
    </>
  );
};

export default ProjectPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      if (!req.cookies.token)
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
      const validToken = await verify(
        req.cookies.token,
        process.env.REACT_APP_SECRET_TOKEN
      );
      if (validToken) {
        await store.dispatch(
          getProjectInfo({ projectId: params.projectId, cookies: req.cookies })
        );

        const projectReducer = store.getState().ProjectReducer;
        if (projectReducer.is_404) {
          return {
            redirect: {
              destination: "/workspace",
              permanent: false,
            },
          };
        }
      } else {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
);
