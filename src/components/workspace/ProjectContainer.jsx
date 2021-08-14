import React from "react";
import Link from "next/link";
function ProjectContainer({ projectList, deleteProjectHandler, role }) {
  return (
    <>
      {projectList.map((project) => {
        return (
          <div className='projectCard'>
            <div className='projectCardContainer'>
              <div className='projectHeading'>
                <h1 key={project._id}>
                  <Link href={`workspace/project/${project.projectId}`}>
                    <a>{`${project.projectName}`}</a>
                  </Link>
                </h1>
                {role == "Admin" && (
                  <div className='deleteProject'>
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
