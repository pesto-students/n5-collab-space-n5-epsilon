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

function SingleTask({ taskId, taskListId }) {
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userRole = projectInfo.roleInfo.name;
  const userPermission = projectInfo.roleInfo;
  const taskInfoDetails = { taskId, taskListId };
  const [loading, setLoading] = useState(true);

  const [taskInfo, setTaskInfo] = useState();

  const [commentBox, setCommentBox] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("taskId", taskId);
    if (taskId) {
      const taskInfo = taskURL.get(`/${taskId}`).then((response) => {
        console.log(response.data);
        setTaskInfo(response.data[0]);
        setLoading(false);
      });
    }
  }, [taskId]);
  const addCommentHandler = (commenterInfo) => {
    const date = new Date();
    const currentTime = date.toISOString();
    console.log("projectInfo.userId", projectInfo.userId);
    const newComment = {
      taskId: taskId,
      commentInfo: {
        commentText: commentBox,
        by: projectInfo.userId,
        createdAt: currentTime,
      },
    };
    console.log("newComment", newComment);
    setCommentBox("");
    setTaskInfo(
      produce((draft) => {
        draft.comments.push(newComment.commentInfo);
        const index = draft.userLookup.indexOf(
          (user) => user._id === commenterInfo._id
        );
        console.log("Here is the index of the comment", index);
        if (index == -1) {
          draft.userLookup.push(commenterInfo);
        }
      })
    );

    taskURL.post(`/${taskId}/comments`, newComment).then((response) => {
      console.log(response.data);
    });
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
      .then((response) => {
        console.log(response.data);
      });
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
    // taskURL.post(`/${taskId}/tags`, newTag).then((response) => {
    //   console.log(response.data);
    // });

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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log(taskInfo);
    setTaskInfo(
      produce((draft) => {
        const index = draft.comments.findIndex(
          (comment) => comment._id === commentID
        );
        draft.comments.splice(index, 1);
      })
    );
  };
  const deleteTagsHandler = (tag) => {
    const tagToBeDeletedInfo = {
      ...taskInfoDetails,
      tag: tag,
    };
    // taskURL
    //   .delete(`/${taskId}/tags`, { data: tagToBeDeleted })
    //   .then((response) => {
    //     console.log(response.data);
    //   });
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
