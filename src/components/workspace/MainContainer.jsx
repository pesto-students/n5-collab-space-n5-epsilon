import WorkSpaceTitle from "./WorkSpaceTitle";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import Cookies from "js-cookie";
import {
  addNewProject,
  deleteProject,
} from "../../redux/actions/workSpaceActions";
import ProjectContainer from "./ProjectContainer";
const MainContainer = (props) => {
  const projects = useSelector((state) => state.WorkSpaceReducer.projects);
  const ownProjects = projects.filter((project) => project.role === "Admin");
  const sharedProjects = projects.filter((project) => project.role === "Guest");
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
    <div className='mainContainerBody'>
      <WorkSpaceTitle title='Workspace Name'/>
        <div className='project-space-wrapper'>
            <div className="top-row">
                <div>
                {userInput}
                <span className='default-btn image-btn' onClick={addProjectHandler}>Add new project</span>
                </div>
                <div className='layout-toggle'>
                    <span className='icon'>
                        <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0,0 L3,0 L3,3 L0,3 L0,0 Z M6,0 L9,0 L9,3 L6,3 L6,0 Z M12,0 L15,0 L15,3 L12,3 L12,0 Z M0,6 L3,6 L3,9 L0,9 L0,6 Z M6,6 L9,6 L9,9 L6,9 L6,6 Z M12,6 L15,6 L15,9 L12,9 L12,6 Z M0,12 L3,12 L3,15 L0,15 L0,12 Z M6,12 L9,12 L9,15 L6,15 L6,12 Z M12,12 L15,12 L15,15 L12,15 L12,12 Z" fill-rule="nonzero"/>
                        </svg>
                    </span>
                    <span className='icon active'>
                        <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,0 L15,0 L15,3 L0,3 L0,0 Z M0,6 L15,6 L15,9 L0,9 L0,6 Z M0,12 L15,12 L15,15 L0,15 L0,12 Z" fill-rule="nonzero"/>
                        </svg>
                    </span>
                </div>
            </div>
            <div className="projectContainer grid">
                <h1>Your Projects</h1>
                <div className='user-projects'>
                    <ProjectContainer
                        projectList={ownProjects}
                        deleteProjectHandler={deleteProjectHandler}
                        role="Admin"
                    />
                </div>
            </div>
            <div className="projectContainer">
                <h1>Shared Projects</h1>
                <div className='user-projects'>
                    <ProjectContainer
                        projectList={sharedProjects}
                        deleteProjectHandler={deleteProjectHandler}
                        role="Guest"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default MainContainer;
