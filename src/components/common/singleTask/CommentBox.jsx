import React from "react";
import styles from "../../../../styles/singleTask.module.scss";
export default function CommentBox({
  comments,
  deleteCommentHandler,
  addCommentHandler,
  commentInput,
}) {
  return (
    <div className={styles.comment_box}>
      <div className="box_header">
        <h1>Discussion</h1>
      </div>
      <div className={styles.existing_comments}>
        {comments.map((commentInfo) => {
          return (
            <div key={commentInfo._id} className={styles.comment}>
              <div className="commenter">
                <p>user</p>
              </div>
              <div className={styles.comment_area}>
                <p>{commentInfo.commentText}</p>
              </div>
              <p onClick={() => deleteCommentHandler(commentInfo._id)}>
                Delete
              </p>
            </div>
          );
        })}
      </div>
      <div className="comment-form">
        {commentInput}
        <button onClick={addCommentHandler}>Comment</button>
      </div>
    </div>
  );
}
