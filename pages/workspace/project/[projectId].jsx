import { useRouter } from "next/router";
import { getProjectInfo } from "../../../src/redux/actions/projectPageActions";
import {deleteTask, moveTaskAction, reorderTask} from "../../../src/redux/actions/taskActions";
import { wrapper } from "../../../src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "../../../src/components/projectPage/TaskList";
import {  DragDropContext, Droppable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { CHANGE_TASK_ORDER } from "../../../src/redux/constants/taskActionConstants";
import NoSSR from "react-no-ssr";
import useInput from "../../../src/hooks/useInput";
import { verify } from "jsonwebtoken";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {createNewTaskList, deleteTaskList} from "../../../src/redux/actions/taskListActions";
import WorkSpaceTitle from "../../../src/components/workspace/WorkSpaceTitle";
import {useEffect, useState} from "react";

const ProjectPage = () => {
  resetServerContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userRole = projectInfo.roleInfo.name;
  const userPermission = projectInfo.roleInfo;
  const { projectId } = router.query;
  const { taskLists, taskListsOrder, loading } = projectInfo;
  const [tab, setTab] = useState('TaskList');
  const[layout, setLayout] = useState('');
  const[taskTypeFilter, setTaskTypeFilter] = useState('');
  const[taskTagFilter, setTaskTagFilter] = useState('');
  const[taskAssignedFilter, setTaskAssignedFilter] = useState('');
  const [submittedForm, setSubmittedForm] = useState({
        formTouched: false,
        error: false,
        submitting : false
    });
  const [taskListName, setTaskListName]= useState('');
  const [showForm, setShowForm]= useState(false);
  const regex = {
        nameRegex: /^([a-zA-Z]+( [a-zA-Z]+)|[a-zA-Z]){2,50}$/,
  }
  const addTaskListHandler = () => {
      setTaskListName('');
      setSubmittedForm({
          formTouched: false,
          error: false,
          submitting : false
      });
      setShowForm(true);
    };

  const onDragEnd = (result) => {
      console.log('===check===', result);

        if (!result.destination) {
            return;
        }

      if (result.destination.droppableId === 'delete'){
          console.log('===cccc==');
          // dispatch(deleteTask({
          //     taskId: taskId,
          //     taskListId: taskListId,
          // }));
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


  useEffect(()=>{
        setLayout(localStorage.getItem('task-layout')||'vertical');
    },[]);

    return (
    <>
      {userRole && (
        <div className='mainContainerBody'>
            <NoSSR>
            <WorkSpaceTitle title={projectInfo.projectName} description={projectInfo.description} isProject={true} />
            <div className='project-data'>
            <div className='tab-list'>
                <span className={`${tab === 'TaskList' && 'active'}`} onClick={()=>{setTab('TaskList')}}>
                    Tasks
                </span>
                <span className={`${tab === 'Notes' && 'active'}`} onClick={()=>{setTab('Notes')}}>
                    Notes
                </span>
            </div>
                {tab === 'TaskList' &&
                <div className={`task-list-box ${layout==='horizontal'? 'rowLayout':''}`}>
                    <DragDropContext onDragEnd={onDragEnd}>
                    <div className="top-panel-row">
                        <div>
                            <div className='filter-wrapper'>
                                <p>Task Type</p>
                                <select onChange={e => setTaskTypeFilter(e.target.value)}>
                                    <option value="any">Any</option>
                                    <option value="test list">Test List</option>
                                    <option value="blank">Blank</option>
                                </select>
                            </div>
                        </div>
                        <div className='layout-toggle'>
                            <Droppable droppableId='delete'>
                                {(provided, snapshot) => (
                                    <span  ref={provided.innerRef} className={`icon trash-can`} data-position="delete">
                                <svg className='empty' xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <path d="M20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37l3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2m2 0h8v-6.8L10.46 9H8v10z" fill="#6d6d73"/>
                                </svg>
                            </span>
                                )}
                            </Droppable>
                            <span className={`icon ${layout==='vertical'?'active':''}`} onClick={()=>{toggle('vertical')}}>
                                <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g stroke="none" strokeWidth="1" fillRule="evenodd">
                                        <path d="M0,0 L15,0 L15,3 L0,3 L0,0 Z M0,6 L15,6 L15,9 L0,9 L0,6 Z M0,12 L15,12 L15,15 L0,15 L0,12 Z" id="column_ic" fillRule="nonzero" transform="translate(7.500000, 7.500000) rotate(-270.000000) translate(-7.500000, -7.500000) "/>
                                    </g>
                                </svg>
                    </span>
                            <span className={`icon ${layout==='horizontal'?'active':''}`} onClick={()=>{toggle('horizontal')}}>
                        <svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,0 L15,0 L15,3 L0,3 L0,0 Z M0,6 L15,6 L15,9 L0,9 L0,6 Z M0,12 L15,12 L15,15 L0,15 L0,12 Z" fillRule="nonzero"/>
                        </svg>
                    </span>
                        </div>
                    </div>
                    <div className='taskListContainer'>
                        {taskListsOrder &&
                        taskListsOrder.map((taskListId) => {
                            return (
                                <TaskList
                                    key={taskListId}
                                    taskList={taskLists[taskListId]}
                                    layout={layout||'Vertical'}
                                    taskTypeFilter={taskTypeFilter}
                                    taskTagFilter={taskTagFilter}
                                    taskAssignedFilter={taskAssignedFilter}
                                />
                            );
                        })}


                        {userPermission.hasOwnProperty("taskList") &&
                        userPermission.taskList.includes("Create") &&
                            <button className='add-task-list' onClick={addTaskListHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <g fill="none" stroke="#6d6d73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 8v8"/>
                                        <path d="M8 12h8"/>
                                    </g>
                                </svg>
                                <span>Add New Task List</span>
                            </button>}
                    </div>
                    </DragDropContext>
                </div>
                }
                {tab === 'TaskList' && <div className='notes'/>}
            </div>
                <ToastContainer autoClose={2000} />
                {showForm && (<div className='modal-form'>
                    <div className='content-wrapper'>
                        <img className='cross' onClick={()=>{setShowForm(false) }} src='https://api.iconify.design/maki/cross.svg?color=black' alt='cross'/>
                        <h1>Add New Task List</h1>
                        <form>
                            <input type="text" placeholder="Task List Name"
                                   onKeyUp={e => {
                                           if(!regex.nameRegex.test(e.target.value)){
                                               setSubmittedForm({ ...submittedForm, error: 'Enter a valid name'})
                                           } else{
                                               setTaskListName( e.target.value );
                                               setSubmittedForm({...submittedForm, formTouched: true, error: false });
                                           }
                                   }}/>
                            <button disabled={!submittedForm.formTouched || !!submittedForm.error || submittedForm.submitting} onClick={async (e)=>{
                                e.preventDefault();
                                await dispatch(createNewTaskList({
                                        taskListName: taskListName,
                                        projectId: projectId,
                                    }));
                                setShowForm(false);
                            }}>Add Project</button>
                            {submittedForm.error && (<p className='error'>{submittedForm.error}</p>)}
                        </form>
                    </div>
                </div>)}
            </NoSSR>
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
