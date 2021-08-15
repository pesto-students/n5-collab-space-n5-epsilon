import { useRouter } from "next/router";
import { getProjectInfo } from "../../../src/redux/actions/projectPageActions";
import {
  moveTaskAction,
  reorderTask,
} from "../../../src/redux/actions/taskActions";
import { wrapper } from "../../../src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "../../../src/components/projectPage/TaskList";
import styles from "../../../styles/projectPage.module.scss";
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
  return (
    <>
      {userRole && (
        <div className="mainContainerBody">
          <WorkSpaceTitle
            title={projectInfo.projectName}
            description={projectInfo.description}
            isProject={true}
          />
          {userPermission.hasOwnProperty("taskList") &&
            userPermission.taskList.includes("Create") && (
              <div className={styles.addTaskList}>
                Task List{userInput}
                <button onClick={addTaskListHandler}>Add</button>
              </div>
            )}
          <div className={styles.taskListContainer}>
            <NoSSR>
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
              </DragDropContext>
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
