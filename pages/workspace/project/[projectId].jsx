import { useRouter } from "next/router";
import { getProjectInfo } from "../../../src/redux/actions/projectPageActions";
import {moveTaskAction, reorderTask} from "../../../src/redux/actions/taskActions";
import { wrapper } from "../../../src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "../../../src/components/projectPage/TaskList";
import { DragDropContext } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { CHANGE_TASK_ORDER } from "../../../src/redux/constants/taskActionConstants";
import NoSSR from "react-no-ssr";
import useInput from "../../../src/hooks/useInput";
import { verify } from "jsonwebtoken";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createNewTaskList } from "../../../src/redux/actions/taskListActions";
import WorkSpaceTitle from "../../../src/components/workspace/WorkSpaceTitle";
import {useEffect, useState} from "react";

const ProjectPage = () => {
  resetServerContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userRole = projectInfo.roleInfo.name;
  const userPermission = projectInfo.roleInfo;
  const [username, userInput] = useInput({ type: "text" });
  const { projectId } = router.query;
  const { taskLists, taskListsOrder, loading } = projectInfo;
  const [tab, setTab] = useState('TaskList');
  const[layout, setLayout] = useState('');

  const addTaskListHandler = () => {
        dispatch(
            createNewTaskList({
                taskListName: username,
                projectId: projectId,
            })
        );
    };
  const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.droppableId === result.source.droppableId) {
            if (result.destination.index === result.source.index) {
                return;
            }
            dispatch(
                reorderTask({
                    taskId: result.draggableId,
                    initialIndex: result.source.index,
                    finalIndex: result.destination.index,
                    taskListId: result.destination.droppableId,
                    tasksOrder: [
                        ...projectInfo.taskLists[result.destination.droppableId].tasksOrder,
                    ],
                })
            );
        }
        if (result.destination.droppableId !== result.source.droppableId) {
            dispatch(
                moveTaskAction({
                    taskId: result.draggableId,
                    sourceTaskListId: result.source.droppableId,
                    destinationTaskListId: result.destination.droppableId,
                    initialIndex: result.source.index,
                    finalIndex: result.destination.index,
                    sourceTaskOrder: [
                        ...projectInfo.taskLists[result.source.droppableId].tasksOrder,
                    ],
                    destinationTaskOrder: [
                        ...projectInfo.taskLists[result.destination.droppableId].tasksOrder,
                    ],
                })
            );
        }
    };

  const toggle = (layout) =>{
        localStorage.setItem('task-layout', layout);
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


  useEffect(()=>{
        setLayout(localStorage.getItem('task-layout')||'grid');
    },[]);

    return (
    <>
      {userRole && (
        <div className='mainContainerBody'>
            <WorkSpaceTitle title={projectInfo.projectName} description={projectInfo.description} isProject={true} />
            {userPermission.hasOwnProperty("taskList") &&
            userPermission.taskList.includes("Create")
              // && <div className='addTaskList'>
              //   Task List{userInput}
              //   <button onClick={addTaskListHandler}>Add</button>
              // </div>
            }
            <div className='project-data'>
            <div className='tab-list'>
                <span className={`${tab === 'TaskList' && 'active'}`} onClick={()=>{setTab('TaskList')}}>
                    Tasks
                </span>
                <span className={`${tab === 'Notes' && 'active'}`} onClick={()=>{setTab('Notes')}}>
                    Notes
                </span>
            </div>
            <NoSSR>
                {tab === 'TaskList' &&
                <div className='task-list-box'>
                    <div className="top-panel-row">
                        <>
                            <div className='filter-wrapper'/>
                        </>

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
                    <div className='taskListContainer'>
                        <DragDropContext onDragEnd={onDragEnd}>
                        {taskListsOrder &&
                        taskListsOrder.map((taskListId) => {
                            return (
                                <TaskList
                                    key={taskListId}
                                    taskList={taskLists[taskListId]}
                                />
                            );
                        })}
                            <button className='add-task-list' onClick={addTaskListHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <g fill="none" stroke="#6d6d73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 8v8"/>
                                        <path d="M8 12h8"/>
                                    </g>
                                </svg>
                                <span>Add New Task List</span>
                            </button>
                    </DragDropContext>
                    </div>
                </div>
                }
                {tab === 'TaskList' && <div className='notes'/>}
            </NoSSR>
            </div>
          <ToastContainer autoClose={2000} />
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
