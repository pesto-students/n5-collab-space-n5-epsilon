import React from "react";
import Link from "next/link";
import Modal from "../common/modal/Modal";
import ConformationPopUp from "../common/customPopUp/ConformationPopUp";
import { useState } from "react";
import modalStyles from "../../../styles/conformationModal.module.scss";
import sal from "sal.js";
function ProjectContainer({
  projectList,
  deleteProjectHandler,
  role,
  projectId,
  toggleLoading,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("initialState");
  const toggleModal = (projectId) => {
    console.log("setDeleteProjectId", projectId);
    setDeleteProjectId(projectId);
    let showDeleteModals = !showDeleteModal;
    setShowDeleteModal(showDeleteModals);
  };
  const triggerDeleteHandler = () => {
    console.log("deleteProjectId", deleteProjectId);
    deleteProjectHandler(deleteProjectId);
  };

  sal();
  return (
    <>
      {projectList.map((project) => {
        return (
          <React.Fragment key={project._id}>
            <Link href={`workspace/project/${project.projectId}`}>
              <a
                draggable="true"
                onDragStart={() => {
                  projectId(project.projectId);
                }}
                data-sal="fade"
                data-sal-duration="700"
                className={`projectCard ${role !== "Admin" && "shared"}`}
                key={project._id}
                data-id={project.projectId}
              >
                <h2
                  onClick={(e) => {
                    toggleLoading(true);
                  }}
                >
                  {project.projectName}
                </h2>
                <h5>{project.description}</h5>
                {role === "Admin" ? (
                  <button
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleModal(project.projectId);
                      //deleteProjectHandler(project.projectId);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FF8A65"
                        d="M24 21.3L12.7 10L26 1.7L38.3 10z"
                      />
                      <path
                        fill="#FFAB91"
                        d="M24 21.3L12.7 10L17 4.7L38.3 10z"
                      />
                      <path
                        fill="#B39DDB"
                        d="M30.6 44H17.4c-2 0-3.7-1.4-4-3.4L9 11h30l-4.5 29.6c-.3 2-2 3.4-3.9 3.4z"
                      />
                      <path
                        fill="#7E57C2"
                        d="M38 13H10c-1.1 0-2-.9-2-2s.9-2 2-2h28c1.1 0 2 .9 2 2s-.9 2-2 2z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="leave"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleModal(project.projectId);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                    >
                      <g fill="#6d6d73">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46l5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984v.77zM7 14.28l-4-1.34V3.72l4 1.34v9.22zm6.52-5.8H8.55v-1h4.93l-1.6-1.6l.71-.7l2.47 2.46v.71l-2.49 2.48l-.7-.7l1.65-1.65z"
                        />
                      </g>
                    </svg>
                  </button>
                )}
                {showDeleteModal ? (
                  <Modal showModal={showDeleteModal} styles={modalStyles}>
                    <ConformationPopUp
                      title={
                        role === "Admin"
                          ? "Delete Project ?"
                          : "Leave Project ?"
                      }
                      onAcceptHandler={(e) => {
                        e.preventDefault();
                        triggerDeleteHandler();
                        toggleModal("");
                      }}
                      onCancelHandler={(e) => {
                        e.preventDefault();
                        toggleModal("");
                      }}
                    />
                  </Modal>
                ) : null}
              </a>
            </Link>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default ProjectContainer;
