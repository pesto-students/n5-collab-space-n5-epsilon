import WorkSpaceTitle from "./WorkSpaceTitle";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  addNewProject,
  deleteProject,
  leaveProject,
} from "../../redux/actions/workSpaceActions";
import ProjectContainer from "./ProjectContainer";
import { useEffect, useState } from "react";
const MainContainer = (props) => {
  const projects = useSelector((state) => state.WorkSpaceReducer.projects);
  const ownProjects = projects.filter((project) => project.role === "Admin");
  const sharedProjects = projects.filter((project) => project.role === "Guest");
  const dispatch = useDispatch();
  const [layout, setLayout] = useState("");
  const [projectIdForTrash, setProjectIdForTrash] = useState("");
  const [submittedForm, setSubmittedForm] = useState({
    formTouched: false,
    error: false,
    submitting: false,
  });
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const userId = Cookies.get("userId");

  const addProjectHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      addNewProject({
        projectName: projectForm.name,
        description: projectForm.description,
        role: "Admin",
      })
    );
    setShowForm(false);
  };
  const deleteProjectHandler = (projectId) => {
      // debugger
    const curr_project = projects.find(
      (project) => project.projectId == projectId
    );
    console.log("curr_project", curr_project);
    if (curr_project.role === "Admin") {
      dispatch(deleteProject({ projectId: projectId }));
    } else {
      dispatch(
        leaveProject({
          projectId: projectId,
          userId,
          userToBeRemovedId: userId,
        })
      );
    }
  };

  useEffect(() => {
    setLayout(localStorage.getItem("layout") || "grid");
  }, []);

  function toggle(layout) {
    localStorage.setItem("layout", layout);
    setLayout(layout);
  }
  const dragOver = (event) => {
    event.preventDefault();
  };

  const dragDrop = (event) => {
    const target = event.currentTarget.dataset;
    deleteProjectHandler(projectIdForTrash);
  };

  const regex = {
    nameRegex: /^([a-zA-Z]+( [a-zA-Z]+)|[a-zA-Z]){2,50}$/,
    description: /^.{4,}$/
  };

  return (
    <div className="mainContainerBody">
      <WorkSpaceTitle title="Workspace Name" />
      <div className="top-panel-row">
        <span
          className="default-btn image-btn"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add new project
        </span>

        <div className="layout-toggle">
          <span
            className={`icon trash-can`}
            onDragOver={dragOver}
            onDrop={dragDrop}
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
          <span
            className={`icon ${layout === "grid" ? "active" : ""}`}
            onClick={() => {
              toggle("grid");
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
                d="M0,0 L3,0 L3,3 L0,3 L0,0 Z M6,0 L9,0 L9,3 L6,3 L6,0 Z M12,0 L15,0 L15,3 L12,3 L12,0 Z M0,6 L3,6 L3,9 L0,9 L0,6 Z M6,6 L9,6 L9,9 L6,9 L6,6 Z M12,6 L15,6 L15,9 L12,9 L12,6 Z M0,12 L3,12 L3,15 L0,15 L0,12 Z M6,12 L9,12 L9,15 L6,15 L6,12 Z M12,12 L15,12 L15,15 L12,15 L12,12 Z"
                fillRule="nonzero"
              />
            </svg>
          </span>
          <span
            className={`icon ${layout === "row" ? "active" : ""}`}
            onClick={() => {
              toggle("row");
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
      <div
        className={`project-space-wrapper ${layout === "grid" ? "grid" : ""}`}
      >
        <div className="projectContainer">
          <h1>Private Projects</h1>
          <div
            className={`user-projects ${
              Object.keys(ownProjects).length > 4 ? "center" : ""
            }`}
          >
            <ProjectContainer
              projectList={ownProjects}
              deleteProjectHandler={deleteProjectHandler}
              projectId={setProjectIdForTrash}
              role="Admin"
            />
          </div>
        </div>
        <div className="projectContainer">
          <h1>Shared Projects</h1>
          <div
            className={`user-projects ${
              Object.keys(sharedProjects).length > 4 ? "center" : ""
            }`}
          >
            <ProjectContainer
              projectList={sharedProjects}
              deleteProjectHandler={deleteProjectHandler}
              role="Guest"
            />
          </div>
        </div>
      </div>

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
            <h1>Add New Project</h1>
            <form>
              <input
                type="text"
                placeholder="Project Name"
                onKeyUp={(e) => {
                  if (e.charCode !== 13) {
                    if (!regex.nameRegex.test(e.target.value.trim())) {
                      setSubmittedForm({
                        ...submittedForm,
                        error: "Enter a valid name",
                      });
                    } else {
                      setProjectForm({ ...projectForm, name: e.target.value });
                      setSubmittedForm({
                        ...submittedForm,
                        formTouched: true,
                        error: false,
                      });
                    }
                  }
                }}
              />
              <input
                  type="text"
                  placeholder="Project Description"
                  onKeyUp={(e) => {
                    if (e.charCode !== 13) {
                      if (!regex.description.test(e.target.value.trim())) {
                        setSubmittedForm({
                          ...submittedForm,
                          error: "Enter a Some Description",
                        });
                      } else {
                        setProjectForm({ ...projectForm, description: e.target.value.trim() });
                        setSubmittedForm({
                          ...submittedForm,
                          formTouched: true,
                          error: false,
                        });
                      }
                    }
                  }}
              />
              <button
                  className='transparent-btn'
                disabled={
                  !submittedForm.formTouched ||
                  !!submittedForm.error ||
                  submittedForm.submitting || !projectForm.name || !projectForm.description
                }
                onClick={addProjectHandler}
              >
                Add Project
              </button>
              {submittedForm.error && (
                <p className="error">{submittedForm.error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContainer;
