import React from "react";
import ContentLoader, { BulletList } from "react-content-loader";
import styles from "../../../../styles/singleTask.module.scss";
import ResizableTextArea from "../../textArea/ResizeableTextArea";
function SingleTaskLoader() {
  return (
    <div className={styles.singleTask}>
      <div className={styles.first_panel}>
        <div className={styles.task_header}>
          <div className="task_information">
            {/* <h1>{taskInfo.taskName}</h1> */}
            <div className="task_name_heading">
              <h1> Task Name</h1>
              <ContentLoader viewBox="0 0 380 30">
                <rect x="10" y="10" rx="4" ry="4" width="300" height="13" />
              </ContentLoader>
            </div>
          </div>
          <div className={styles.task_description}>
            <div className="task_description_heading">
              <h1> Description</h1>
            </div>
            <ContentLoader viewBox="0 0 380 70">
              <rect x="10" y="10" rx="4" ry="4" width="300" height="10" />
              <rect x="10" y="25" rx="4" ry="4" width="300" height="10" />
              <rect x="10" y="40" rx="4" ry="4" width="300" height="10" />
            </ContentLoader>
          </div>
        </div>
        <div className={styles.comment_box}>
          <div className={styles.box_header}>
            <h1>Discussion</h1>
          </div>
          <div className={styles.existing_comments}>
            <ContentLoader viewBox="0 0 380 70">
              <rect x="0" y="0" rx="10" ry="10" width="20" height="20" />
              <rect x="30" y="0" rx="4" ry="4" width="300" height="13" />
              <rect x="30" y="15" rx="3" ry="3" width="250" height="10" />

              <rect x="0" y="40" rx="10" ry="10" width="20" height="20" />
              <rect x="30" y="40" rx="4" ry="4" width="300" height="13" />
              <rect x="30" y="55" rx="3" ry="3" width="250" height="10" />
            </ContentLoader>
          </div>
          <div className={styles.comment_form}>
            <div className={styles.comment_form_fields}>
              <ResizableTextArea
                className={styles.comment_text_area}
                placeholder="Comment ... "
              />
            </div>
            <div className={styles.comment_form_actions}>
              <button>Post Comment</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.second_panel}>
        <div className={styles.tag_box}>
          <h1>Tags</h1>

          <div className={styles.tags_form}>
            <input
              type="text"
              className={styles.tag_input_box}
              placeholder="Add a tag"
            />
          </div>
        </div>

        <ContentLoader viewBox="0 0 245 225">
          <rect x="5" y="15" rx="5" ry="5" width="40" height="20" />
          <rect x="65" y="15" rx="5" ry="5" width="40" height="20" />
          <rect x="5" y="55" rx="5" ry="5" width="40" height="20" />
        </ContentLoader>
      </div>
    </div>
  );
}

export default SingleTaskLoader;
