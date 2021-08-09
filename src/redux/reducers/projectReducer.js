import {
  DELETE_PROJECT,
  ERROR_PROJECT,
  GET_PROJECT_INFO,
  GET_ALL_TASKS,
  LOADING,
  UPDATE_PROJECT,
  CREATE_TASK,
  CHANGE_TASK_ORDER,
  MOVE_TASK,
  DELETE_TASK,
  CREATE_TASK_LIST,
  DELETE_TASK_LIST,
} from "../constants/projectActionConstants";
import produce, { original } from "immer";

export const initialState = {
  projectInfo: {},
  loading: true,
};

function move(input, from, to) {
  let numberOfDeletedElm = 1;
  const elm = input.splice(from, numberOfDeletedElm)[0];
  numberOfDeletedElm = 0;
  input.splice(to, numberOfDeletedElm, elm);
  return input
}


const ProjectReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case LOADING: {
        draft.loading = !draft.loading;
        break;
        
      }
      
      case UPDATE_PROJECT: {
        const index = draft.findIndex((project) => project._id === payload._id);
        return (draft[index] = payload);
      }
      case GET_ALL_TASKS: {
        draft.projectInfo.taskLists = payload
        break;
      }
      case CREATE_TASK:{
        const index = draft.projectInfo.taskLists.findIndex((tasklist)=>{return tasklist._id === payload.taskListId})
        console.log("this is index",index ,original(draft).projectInfo.taskLists[index].hasOwnProperty('task') )
        if (index != -1 ) draft.projectInfo.taskLists[index].task.push(payload)
        break;
      }
      case CREATE_TASK_LIST:{
        payload.task =[]
        draft.projectInfo.taskLists.push(payload)
        break;
      }

      case DELETE_PROJECT: {
        const newDraft = original(draft);
        delete newDraft[1];
        return newDraft;
      }
      case DELETE_TASK: {
        const taskListindex = draft.projectInfo.taskLists.findIndex((tasklist)=>{return tasklist._id === payload.taskListId})
        const taskIndex = draft.projectInfo.taskLists[taskListindex].task.findIndex((task) => {return task._id === payload.taskId})
        draft.projectInfo.taskLists[taskListindex].task.splice(taskIndex,1)
        break;
      }
      
      case DELETE_TASK_LIST:{
        const taskListindex = draft.projectInfo.taskLists.findIndex((tasklist)=>{return tasklist._id === payload.taskListId})
        draft.projectInfo.taskLists.splice(taskListindex,1)
        break;
      }
      case GET_PROJECT_INFO: {
        draft.projectInfo = payload;
        break;
      }
      case CHANGE_TASK_ORDER :{
        const {initialIndex,finalIndex,taskListId} = payload
        const index = draft.projectInfo.taskLists.findIndex((tasklist)=>{return tasklist._id === taskListId})
        const new_draft  = draft.projectInfo.taskLists[index].task.splice(initialIndex,1)[0]
        draft.projectInfo.taskLists[index].task.splice(finalIndex, 0, new_draft);
        break;
      }
      case MOVE_TASK:{
        const {initialIndex,finalIndex,sourceTaskListId,destinationTaskListId} = payload
        const sourceIndex = draft.projectInfo.taskLists.findIndex((tasklist)=>{return tasklist._id === sourceTaskListId})
        const destinationIndex = draft.projectInfo.taskLists.findIndex((tasklist)=>{return tasklist._id === destinationTaskListId})
        const item = draft.projectInfo.taskLists[sourceIndex].task[initialIndex]
        draft.projectInfo.taskLists[sourceIndex].task.splice(initialIndex,1)
        draft.projectInfo.taskLists[destinationIndex].task.splice(finalIndex, 0, item);
        break;
      }
      case ERROR_PROJECT: {
        return draft;
      }
      default: {
        return draft  
      }
    }
  });
};

export default ProjectReducer;
