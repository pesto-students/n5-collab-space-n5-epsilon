import { useRouter } from "next/router";
import {
  createNewTaskList,
  getProjectInfo,
  moveTaskAction,
} from "../../../src/redux/actions/projectPageActions";
import { wrapper } from "../../../src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import TaskList from "../../../src/components/projectPage/TaskList";
import InfoBanner from "../../../src/components/projectPage/infoBanner";
import styles from "../../../styles/projectPage.module.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";
import { CHANGE_TASK_ORDER } from "../../../src/redux/constants/projectActionConstants";
import NoSSR from "react-no-ssr";
import useInput from "../../../src/hooks/useInput";
import { Types } from "mongoose";

const ProjectPage = () => {
  resetServerContext();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const [username, userInput] = useInput({ type: "text" });
  const { projectid } = router.query;
  const { taskLists, loading } = projectInfo;
  const addTaskListHandler = () => {
    dispatch(
      createNewTaskList({
        taskListName: username,
        projectId: projectid,
      })
    );
  };
  const onDragEnd = (result) => {
    console.log("drag result", result);
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === result.source.droppableId) {
      if (result.destination.index === result.source.index) {
        return;
      }
      dispatch({
        type: CHANGE_TASK_ORDER,
        payload: {
          initialIndex: result.source.index,
          finalIndex: result.destination.index,
          taskListId: result.destination.droppableId,
        },
      });
    }
    if (result.destination.droppableId !== result.source.droppableId) {
      dispatch(
        moveTaskAction({
          taskId: result.draggableId,
          sourceTaskListId: result.source.droppableId,
          destinationTaskListId: result.destination.droppableId,
          initialIndex: result.source.index,
          finalIndex: result.destination.index,
        })
      );
    }
  };
  return (
    <div className={styles.project_page}>
      <InfoBanner />
      <div className={styles.add_tasklist}>
        Task List{userInput}
        <button onClick={addTaskListHandler}>Add</button>
      </div>
      <div className={styles.taskListContainer}>
        <NoSSR>
          <DragDropContext onDragEnd={onDragEnd}>
            {}
            {taskLists &&
              taskLists.map((tasklist) => {
                return <TaskList key={tasklist._id} tasklist={tasklist} />;
              })}
          </DragDropContext>
        </NoSSR>
      </div>
    </div>
  );
};

export default ProjectPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getProjectInfo(params.projectid));
    }
);
