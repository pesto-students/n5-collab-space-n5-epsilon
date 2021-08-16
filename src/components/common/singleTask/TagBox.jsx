import React from "react";
import styles from "../../../../styles/singleTask.module.scss";

export default function TagBox({
  tagsCollection,
  addTagsHandler,
  deleteTagsHandler,
  tagInput,
}) {
  return (
    <div className="tag-box">
      <h1>Tags</h1>
      <div className="tags-form">
        {tagInput}
        <button onClick={addTagsHandler}>Add Tag</button>
      </div>
      <div className={styles.existing_tags}>
        {tagsCollection.map((tag) => {
          return (
            <div className={styles.tags}>
              <p onClick={() => deleteTagsHandler(tag)}>{tag}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
