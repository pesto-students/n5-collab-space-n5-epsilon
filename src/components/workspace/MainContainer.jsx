import WorkSpaceTitle from "./WorkSpaceTitle";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  addNewProject,
  deleteProject,
  leaveProject,
} from "../../redux/actions/workSpaceActions";
import ProjectContainer from "./ProjectContainer";
import { useEffect, useState } from "react";
import Image from "next/image";
import TrashCanIcon from "../iconComponents/TrashCanIcon";
import HorizontalAlignIcon from "../iconComponents/HorizontalAlignIcon";
import GridLayoutIcon from "../iconComponents/GridLayoutIcon";
const MainContainer = ({ toggleLoading }) => {
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
    toast.success(`Project ${projectForm.name} Added Successfully `);
  };
  const deleteProjectHandler = (projectId) => {
    // debugger
    const curr_project = projects.find(
      (project) => project.projectId == projectId
    );

    if (curr_project.role === "Admin") {
      dispatch(deleteProject({ projectId: projectId }));
      toggleLoading(false);
    } else {
      dispatch(
        leaveProject({
          projectId: projectId,
          userId,
          userToBeRemovedId: userId,
        })
      );
    }

    toast.success("Project Deleted Successfully ");
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
    description: /^.{4,}$/,
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
            <GridLayoutIcon />
          </span>
          <span
            className={`icon ${layout === "row" ? "active" : ""}`}
            onClick={() => {
              toggle("row");
            }}
          >
            <HorizontalAlignIcon />
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
              toggleLoading={toggleLoading}
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
              toggleLoading={toggleLoading}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-form">
          <div className="content-wrapper">
            <div className="cross">
              <Image
                onClick={() => {
                  setShowForm(false);
                }}
                src="https://api.iconify.design/maki/cross.svg?color=black"
                alt="cross"
                height="15"
                width="15"
              />
            </div>
            <h1>Add New Project</h1>
            <form>
              <input
                type="text"
                placeholder="Project Name"
                onKeyUp={(e) => {
                  if (!regex.nameRegex.test(e.target.value.trim())) {
                    setSubmittedForm({
                      ...submittedForm,
                      error: "Enter a valid name",
                    });
                  } else {
                    setSubmittedForm({
                      ...submittedForm,
                      formTouched: true,
                      error: false,
                    });
                  }
                  setProjectForm({
                    ...projectForm,
                    name: e.target.value.trim(),
                  });
                }}
              />
              <input
                type="text"
                placeholder="Project Description"
                onKeyUp={(e) => {
                  if (!regex.description.test(e.target.value.trim())) {
                    setSubmittedForm({
                      ...submittedForm,
                      error: "Enter a Some Description",
                    });
                  } else {
                    setSubmittedForm({
                      ...submittedForm,
                      formTouched: true,
                      error: false,
                    });
                  }
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value.trim(),
                  });
                }}
              />
              <button
                className="transparent-btn"
                disabled={
                  !submittedForm.formTouched ||
                  !!submittedForm.error ||
                  submittedForm.submitting ||
                  !projectForm.name ||
                  !projectForm.description
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
