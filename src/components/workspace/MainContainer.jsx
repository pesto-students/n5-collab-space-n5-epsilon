import WorkSpaceTitle from "./WorkSpaceTitle";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import Cookies from "js-cookie";
import {
  addNewProject,
  deleteProject,
} from "../../redux/actions/workSpaceActions";
import ProjectContainer from "./ProjectContainer";
import {useEffect, useState} from "react";
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
  const[layout, setLayout] = useState('');
  const[projectIdForTrash, setProjectIdForTrash] = useState('');

    useEffect(()=>{
        setLayout(localStorage.getItem('layout')||'grid');
    },[]);

  function toggle(layout){
      localStorage.setItem('layout', layout);
      setLayout(layout);
    }
    const dragOver = event => {
        event.preventDefault();
        console.log('===test===', projectIdForTrash);
  };

    const dragDrop = event => {
        const target = event.currentTarget.dataset;
        // console.log('test', target);
        deleteProjectHandler(projectIdForTrash);
        console.log('===test===', projectIdForTrash);

    };

  return (
    <div className='mainContainerBody'>
      <WorkSpaceTitle title='Workspace Name'/>
        <div className="top-panel-row">
            <div>
                {userInput}
                <span className='default-btn image-btn' onClick={addProjectHandler}>Add new project</span>
            </div>
            <div className='layout-toggle'>
                <span className={`icon trash-can`} onDragOver={dragOver} onDrop={dragDrop} data-position="delete">
                    <svg className='empty' xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <path d="M20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37l3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2m2 0h8v-6.8L10.46 9H8v10z" fill="#6d6d73"/>
                    </svg>
                </span>
                <span className={`icon ${layout==='grid'?'active':''}`} onClick={()=>{toggle('grid')}}>
                        <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0,0 L3,0 L3,3 L0,3 L0,0 Z M6,0 L9,0 L9,3 L6,3 L6,0 Z M12,0 L15,0 L15,3 L12,3 L12,0 Z M0,6 L3,6 L3,9 L0,9 L0,6 Z M6,6 L9,6 L9,9 L6,9 L6,6 Z M12,6 L15,6 L15,9 L12,9 L12,6 Z M0,12 L3,12 L3,15 L0,15 L0,12 Z M6,12 L9,12 L9,15 L6,15 L6,12 Z M12,12 L15,12 L15,15 L12,15 L12,12 Z" fill-rule="nonzero"/>
                        </svg>
                    </span>
                <span className={`icon ${layout==='row'?'active':''}`} onClick={()=>{toggle('row')}}>
                        <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,0 L15,0 L15,3 L0,3 L0,0 Z M0,6 L15,6 L15,9 L0,9 L0,6 Z M0,12 L15,12 L15,15 L0,15 L0,12 Z" fill-rule="nonzero"/>
                        </svg>
                    </span>
            </div>
        </div>
        <div className={`project-space-wrapper ${layout==='grid'? 'grid':''}`}>
            <div className="projectContainer">
                <h1>Private Projects</h1>
                <div className={`user-projects ${ Object.keys(ownProjects).length > 4? 'center':''}`}>
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
                <div className={`user-projects ${ Object.keys(sharedProjects).length > 4? 'center':''}`}>
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
