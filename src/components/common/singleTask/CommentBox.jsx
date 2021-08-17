import React, { useState, useRef } from "react";
import { useEffect } from "react";
import styles from "../../../../styles/singleTask.module.scss";
import ResizableTextArea from "../../textArea/ResizeableTextArea";
import Container from "../contextMenu/ContextMenuContainer";

export default function CommentBox({
  comments,
  deleteCommentHandler,
  addCommentHandler,
  setCommentBox,
  value,
}) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [comments]);
  return (
    <div className={styles.comment_box}>
      <div className={styles.box_header}>
        <h1>Discussion</h1>
      </div>
      <div className={styles.existing_comments}>
        {comments.map((commentInfo) => {
          return (
            <>
              <div className={styles.comment_card}>
                <div className="containers">
                  <div className="containers__item"></div>
                </div>
                <div className={styles.commenter}>
                  <div className={styles.profileImage}>
                    <p>u</p>
                  </div>
                </div>
                <div className={styles.comment}>
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

                  <div className={styles.comment_area}>
                    <p>{commentInfo.commentText}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        <div ref={messagesEndRef} />
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
          <button onClick={addCommentHandler}>Post Comment</button>
        </div>
        {/* {commentInput}
        <button onClick={addCommentHandler}>Comment</button> */}
      </div>
    </div>
  );
}
