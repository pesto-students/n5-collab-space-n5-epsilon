import Cookies from "js-cookie";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../../styles/singleTask.module.scss";
import ResizableTextArea from "../../textArea/ResizeableTextArea";
import Container from "../contextMenu/ContextMenuContainer";

export default function CommentBox({
  comments,
  deleteCommentHandler,
  addCommentHandler,
  setCommentBox,
  value,
  taskInfo,
}) {
  const projectInfo = useSelector((state) => state.ProjectReducer.projectInfo);
  const userId = projectInfo.userId;
  const userRole = projectInfo.roleInfo.name;
  const userPermission = projectInfo.roleInfo;
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };
  console.log("comments", comments);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);
  return (
    <div className={styles.comment_box}>
      <div className={styles.box_header}>
        <h1>Discussion</h1>
      </div>
      <div className={styles.existing_comments} ref={messagesEndRef}>
        {comments.map((commentInfo) => {
          console.log("commentInfo", commentInfo.by, taskInfo);
          const commenterInfo = taskInfo.userLookup.find((userInfo) => {
            console.log(
              "userInfo",
              userInfo._id,
              "commentInfo",
              commentInfo.by
            );
            return userInfo._id === commentInfo.by;
          });
          const reducedUserName = commenterInfo.name
            .split(" ")
            .map((word) => {
              return word[0].toUpperCase();
            })
            .join("");
          return (
            <>
              <div className={styles.comment_card}>
                <div className="containers">
                  <div className="containers__item"></div>
                </div>
                <div className={styles.commenter}>
                  <div className={styles.profileImage}>
                    <p>{reducedUserName}</p>
                  </div>
                </div>

                <div className={styles.comment}>
                  {(userRole == "Admin") |
                  ((commentInfo.by._id === userId) |
                    userPermission.hasOwnProperty("taskList") &&
                    userPermission.taskList.includes("Delete")) ? (
                    <div className={styles.comment_menu}>
                      <Container
                        menuItems={[
                          {
                            text: "Delete",
                            onClick: () => {
                              deleteCommentHandler(commentInfo._id);
                            },
                          },
                        ]}
                      >
                        ...
                      </Container>
                    </div>
                  ) : null}

                  <div className={styles.comment_area}>
                    <p>{commentInfo.commentText}</p>
                  </div>
                </div>
              </div>
              <div />
            </>
          );
        })}
      </div>
      <div className={styles.comment_form}>
        <div className={styles.comment_form_fields}>
          <ResizableTextArea
            className={styles.comment_text_area}
            setValue={setCommentBox}
            placeholder="Comment ... "
            value={value}
          />
        </div>
        <div className={styles.comment_form_actions}>
          <button
            onClick={() => {
              const by = {
                _id: userId,
                name: Cookies.get("userName"),
              };
              addCommentHandler(by);
            }}
          >
            Post Comment
          </button>
        </div>
        {/* {commentInput}
        <button onClick={addCommentHandler}>Comment</button> */}
      </div>
    </div>
  );
}
