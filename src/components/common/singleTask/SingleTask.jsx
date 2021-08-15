import { useState, useEffect } from "react";
import { taskURL } from "../../../client_apis/workSpaceApi";
import useInput from "../../../hooks/useInput";
import produce from "immer";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React from "react";

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
    <div className="singTask">
      {taskInfo && (
        <>
          <h1>{taskInfo.taskName}</h1>
          <h1>{taskInfo.status}</h1>
          <div className="description"></div>
          {toggle ? (
            <p
              onDoubleClick={() => {
                setToggle(false);
              }}
            >
              Description
            </p>
          ) : (
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
            />
          )}
          <div className="comment-box">
            <div className="existing-comments">
              {taskInfo.comments.map((commentInfo) => {
                return (
                  <div className="comments">
                    <p>{commentInfo.commentText}</p>
                    <button
                      onClick={() => deleteCommentHandler(commentInfo._id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="comment-form">
              {commentInput}
              <button onClick={addCommentHandler}>Comment</button>
            </div>
            <div className="tag-box">
              <h1>Tags</h1>
              <div className="tags-form">
                {tagInput}
                <button onClick={addTagsHandler}>Add Tag</button>
              </div>
              <div className="existing-tags">
                {taskInfo.tags.map((tag) => {
                  return (
                    <div className="tags">
                      <p onClick={() => deleteTagsHandler(tag)}>{tag}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleTask;
