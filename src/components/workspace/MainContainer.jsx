import Link from "next/link";
import WorkSpaceTitle from "./WorkSpaceTitle";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import {
  addNewProject,
  deleteProject,
} from "../../redux/actions/workSpaceActions";
import Styles from "../../../styles/mainContainer.module.scss";
const MainContainer = (props) => {
  const projects = useSelector((state) => state.WorkSpaceReducer.projects);
  console.log("this is project", projects);
  const dispatch = useDispatch();
  const [username, userInput] = useInput({ type: "text" });
  const addProjectHandler = () => {
    dispatch(
      addNewProject({
        projectName: username,
        description: "this is description ",
        projectOwner: "61061e33bcc1803cf59e24c9",
      })
    );
  };
  const deleteProjectHandler = (projectId) => {
    dispatch(deleteProject({ projectId: projectId }));
  };
  return (
    <div className={Styles.mainContainerBody}>
      <WorkSpaceTitle />
      <div className="add-project">
        {userInput}
        <button onClick={addProjectHandler}>name</button>
      </div>
      <div className={Styles.userProjects}>
        {projects.map((project) => {
          return (
            <div className={Styles.projectCard}>
              <div className={Styles.projectCardContainer}>
                <div className={Styles.projectHeading}>
                  <h1 key={project._id}>
                    <Link href={`workspace/project/${project._id}`}>
                      <a>{`${project.projectName}`}</a>
                    </Link>
                  </h1>
                  <div className={Styles.deleteProject}>
                    <button
                      onClick={() => {
                        deleteProjectHandler(project._id);
                      }}
                    >
                      X
                    </button>
                  </div>
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
      </div>
    </div>
  );
};

export default MainContainer;
