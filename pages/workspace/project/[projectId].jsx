import { useRouter } from "next/router";
import { getProjectInfo } from "../../../src/redux/actions/projectPageActions";

import { wrapper } from "../../../src/redux/store";
import { useSelector, useDispatch } from "react-redux";

import { resetServerContext } from "react-beautiful-dnd";
import NoSSR from "react-no-ssr";
import { verify } from "jsonwebtoken";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { createNewTaskList } from "../../../src/redux/actions/taskListActions";
import WorkSpaceTitle from "../../../src/components/workspace/WorkSpaceTitle";
import { useEffect, useState } from "react";

import TaskTab from "../../../src/components/projectPage/TaskTab";
import DescriptionTab from "../../../src/components/projectPage/DescriptionTab";
import AddNewTaskListModal from "../../../src/components/common/modal/AddNewTaskListModal";

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

      Object.keys(taskLists[taskListId].task).map((singleTask) => {
        taskLists[taskListId].task[singleTask].tags.forEach((tag) => {
          taskTNames[tag] = true;
        });
      });
    });
    setTaskTagNames(taskTNames);
    setTaskListsName(taskLNames);
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
                  <TaskTab
                    projectInfo={projectInfo}
                    taskListsName={taskListsName}
                    taskTagNames={taskTagNames}
                    taskListsOrder={taskListsOrder}
                    taskTypeFilter={taskTypeFilter}
                    taskAssignedFilter={taskAssignedFilter}
                    addTaskListHandler={addTaskListHandler}
                    userPermission={userPermission}
                    layout={layout}
                    taskLists={taskLists}
                    taskTagFilter={taskTagFilter}
                  />
                </div>
              )}
              {tab === "Description" && (
                <DescriptionTab
                  toggleDescription={toggleDescription}
                  projectInfo={projectInfo}
                  description={description}
                  setDescription={setDescription}
                  saveDescriptionHandler={saveDescriptionHandler}
                  handleDescriptionToggle={handleDescriptionToggle}
                />
              )}
            </div>
            <ToastContainer autoClose={2000} />
            {showForm && (
              <AddNewTaskListModal
                submittedForm={submittedForm}
                setSubmittedForm={setSubmittedForm}
                setTaskListName={setTaskListName}
                setShowForm={setShowForm}
                projectInfo={projectInfo}
                taskListName={taskListName}
                projectId={projectId}
              />
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
