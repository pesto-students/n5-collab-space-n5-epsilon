import { useState, useEffect } from "react";
import { taskURL } from "../../../client_apis/workSpaceApi";
import useInput from "../../../hooks/useInput";
import produce from "immer";
import styles from "../../../../styles/singleTask.module.scss";
import React from "react";
import CommentBox from "./CommentBox";
import TagBox from "./TagBox";
import TaskHeader from "./TaskHeader";
import SingleTaskLoader from "../contentLoader/SingleTaskLoader";
import {
  addTags,
  deleteTags,
  updateTaskName,
} from "../../../redux/actions/taskActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignSelect from "./AssignSelect";

function SingleTask({ taskId, taskListId }) {
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userRole = projectInfo.roleInfo.name;
  const userPermission = projectInfo.roleInfo;
  const taskInfoDetails = { taskId, taskListId };
  const [loading, setLoading] = useState(true);
  const [allCollaborators, setAllCollaborators] = useState(
    projectInfo.contributions
  );
  const [assignedTo, setAssignedTo] = useState("initialState");
  const [taskInfo, setTaskInfo] = useState();

  const [commentBox, setCommentBox] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      const taskInfo = taskURL.get(`/${taskId}`).then((response) => {
        setTaskInfo(response.data[0]);
        setLoading(false);
      });
    }
  }, [taskId]);
  console.log("taskInfo", taskInfo);
  const addCommentHandler = (commenterInfo) => {
    const date = new Date();
    const currentTime = date.toISOString();

    const newComment = {
      taskId: taskId,
      commentInfo: {
        commentText: commentBox,
        by: projectInfo.userId,
        createdAt: currentTime,
      },
    };

    setCommentBox("");
    setTaskInfo(
      produce((draft) => {
        draft.comments.push(newComment.commentInfo);
        const index = draft.userLookup.indexOf(
          (user) => user._id === commenterInfo._id
        );

        if (index == -1) {
          draft.userLookup.push(commenterInfo);
        }
      })
    );

    taskURL.post(`/${taskId}/comments`, newComment).then((response) => {});
  };
  const updateTaskDescription = (updateTaskDescriptionText) => {
    setTaskInfo(
      produce((draft) => {
        draft.description = updateTaskDescriptionText;
      })
    );
    taskURL
      .put(`/${taskId}`, {
        data: { description: updateTaskDescriptionText },
      })
      .then((response) => {});
  };

  const updateTaskNameHandler = (updateTaskNameText) => {
    setTaskInfo(
      produce((draft) => {
        draft.taskName = updateTaskNameText;
      })
    );
    const updateTaskNameInfo = {
      ...taskInfoDetails,
      updateTaskName: updateTaskNameText,
    };
    dispatch(updateTaskName(updateTaskNameInfo));
  };
  const addTagsHandler = (tagInputValue) => {
    const newTagInfo = {
      ...taskInfoDetails,
      tag: tagInputValue,
    };

    setTaskInfo(
      produce((draft) => {
        draft.tags.push(tagInputValue);
      })
    );
    dispatch(addTags(newTagInfo));
  };
  const deleteCommentHandler = (commentID) => {
    const data = {
      taskId: taskId,
      commentId: commentID,
    };
    taskURL
      .delete(`/${taskId}/comments`, { data: data })
      .then((response) => {
        setTaskInfo(
          produce((draft) => {
            const index = draft.comments.findIndex(
              (comment) => comment._id === commentID
            );
            draft.comments.splice(index, 1);
          })
        );
      })
      .catch((error) => {});
  };
  const deleteTagsHandler = (tag) => {
    const tagToBeDeletedInfo = {
      ...taskInfoDetails,
      tag: tag,
    };
    dispatch(deleteTags(tagToBeDeletedInfo));
    setTaskInfo(
      produce((draft) => {
        const index = draft.tags.indexOf(tag);
        draft.tags.splice(index, 1);
      })
    );
  };
  return (
    <>
      {!loading ? (
        <div className={styles.singleTask}>
          {taskInfo && (
            <>
              <div className={styles.first_panel}>
                <TaskHeader
                  taskInfo={taskInfo}
                  updateTaskDescription={updateTaskDescription}
                  updateTaskName={updateTaskNameHandler}
                />
                <CommentBox
                  comments={taskInfo.comments}
                  deleteCommentHandler={deleteCommentHandler}
                  addCommentHandler={addCommentHandler}
                  setCommentBox={setCommentBox}
                  value={commentBox}
                  taskInfo={taskInfo}
                />
              </div>
              <div className={styles.second_panel}>
                <TagBox
                  tagsCollection={taskInfo.tags}
                  addTagsHandler={addTagsHandler}
                  deleteTagsHandler={deleteTagsHandler}
                />
                <AssignSelect
                  taskId={taskId}
                  taskListId={taskListId}
                  assignedTo={taskInfo.assignedTo}
                  allCollaborators={allCollaborators}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <SingleTaskLoader />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default SingleTask;
