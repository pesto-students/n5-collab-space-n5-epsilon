import { useState, useEffect } from "react";
import { taskURL } from "../../../client_apis/workSpaceApi";
import useInput from "../../../hooks/useInput";
import produce from "immer";
import { EditorState } from "draft-js";
import styles from "../../../../styles/singleTask.module.scss";
import React from "react";
import CommentBox from "./CommentBox";
import TagBox from "./TagBox";
import TaskHeader from "./TaskHeader";

function SingleTask({ taskId }) {
  const [commentInputValue, commentInput, setComment] = useInput({
    type: "text",
  });
  const [tagInputValue, tagInput, setTagInputValue] = useInput({
    type: "text",
  });
  const [taskInfo, setTaskInfo] = useState();
  const [toggle, setToggle] = useState(true);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log("taskId", taskId);
    if (taskId) {
      const taskInfo = taskURL.get(`/${taskId}`).then((response) => {
        console.log(response.data);
        setTaskInfo(response.data[0]);
      });
    }
  }, [taskId]);
  const addCommentHandler = () => {
    const date = new Date();
    const currentTime = date.toISOString();
    const newComment = {
      taskId: taskId,
      commentInfo: {
        commentText: commentInputValue,
        by: "6111674d267948b6906ee442",
        createdAt: currentTime,
      },
    };
    console.log(newComment);
    setTaskInfo(
      produce((draft) => {
        draft.comments.push(newComment.commentInfo);
      })
    );

    taskURL.post(`/${taskId}/comments`, newComment).then((response) => {
      console.log(response.data);
    });
  };
  const addTagsHandler = () => {
    const newTag = {
      taskId: taskId,
      tag: tagInputValue,
    };
    taskURL.post(`/${taskId}/tags`, newTag).then((response) => {
      console.log(response.data);
    });
    setTaskInfo(
      produce((draft) => {
        draft.tags.push(tagInputValue);
      })
    );
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
          (comment) => comment.id === commentID
        );
        draft.comments.splice(index, 1);
      })
    );
  };
  const deleteTagsHandler = (tag) => {
    const tagToBeDeleted = {
      taskId: taskId,
      tag: tag,
    };
    console.log(tagToBeDeleted);
    taskURL
      .delete(`/${taskId}/tags`, { data: tagToBeDeleted })
      .then((response) => {
        console.log(response.data);
      });
    setTaskInfo(
      produce((draft) => {
        const index = draft.tags.indexOf(tag);
        draft.tags.splice(index, 1);
      })
    );
  };
  return (
    <div className={styles.singleTask}>
      {taskInfo && (
        <>
          <div className={styles.first_panel}>
            <TaskHeader
              taskInfo={taskInfo}
              toggle={toggle}
              setToggle={setToggle}
              editorState={editorState}
            />
            <CommentBox
              comments={taskInfo.comments}
              deleteCommentHandler={deleteCommentHandler}
              addCommentHandler={addCommentHandler}
              commentInput={commentInput}
            />
          </div>
          <div className={styles.second_panel}>
            <TagBox
              tagsCollection={taskInfo.tags}
              addTagsHandler={addTagsHandler}
              deleteTagsHandler={deleteTagsHandler}
              tagInput={tagInput}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default SingleTask;
