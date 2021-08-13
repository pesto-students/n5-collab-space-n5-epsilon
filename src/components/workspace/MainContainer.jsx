import WorkSpaceTitle from "./WorkSpaceTitle";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import Cookies from "js-cookie";
import {
  addNewProject,
  deleteProject,
} from "../../redux/actions/workSpaceActions";
import Styles from "../../../styles/mainContainer.module.scss";
import ProjectContainer from "./ProjectContainer";
const MainContainer = (props) => {
  const projects = useSelector((state) => state.WorkSpaceReducer.projects);
  console.log("this is project", projects);
  const ownProjects = projects.filter((project) => project.role == "Admin");
  const sharedProjects = projects.filter((project) => project.role == "Guest");
  const dispatch = useDispatch();
  const [username, userInput] = useInput({ type: "text" });
  const addProjectHandler = () => {
    dispatch(
      addNewProject({
        projectName: username,
        description: "this is description ",
        role: "Admin",
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
      <div className="projectContainer">
        <h1>Your Projects</h1>
        <div className={Styles.userProjects}>
          <ProjectContainer
            projectList={ownProjects}
            deleteProjectHandler={deleteProjectHandler}
            role="Admin"
          />
        </div>
      </div>
      <div className="projectContainer">
        <h1>Shared Projects</h1>
        <div className={Styles.userProjects}>
          <ProjectContainer
            projectList={sharedProjects}
            deleteProjectHandler={deleteProjectHandler}
            role="Guest"
          />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
