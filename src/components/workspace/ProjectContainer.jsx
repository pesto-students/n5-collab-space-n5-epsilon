import React from "react";
import styles from "../../../styles/mainContainer.module.scss";
import Link from "next/link";
function ProjectContainer({ projectList, deleteProjectHandler, role }) {
  return (
    <>
      {projectList.map((project) => {
        return (
          <div key={project._id} className={styles.projectCard}>
            <div className={styles.projectCardContainer}>
              <div className={styles.projectHeading}>
                <h1>
                  <Link href={`/workspace/project/${project.projectId}`}>
                    <a>{`${project.projectName}`}</a>
                  </Link>
                </h1>
                {role == "Admin" && (
                  <div className={styles.deleteProject}>
                    <button
                      onClick={() => {
                        deleteProjectHandler(project.projectId);
                      }}
                    >
                      X
                    </button>
                  </div>
                )}
              </div>

              <div className="project-description">
                <p>
                  {project.description.length > 10
                    ? project.description.slice(0, 20) + "..."
                    : project.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProjectContainer;