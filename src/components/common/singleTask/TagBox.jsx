import React, { useState } from "react";
import styles from "../../../../styles/singleTask.module.scss";
import useInput from "../../../hooks/useInput";
export default function TagBox({
  tagsCollection,
  addTagsHandler,
  deleteTagsHandler,
}) {
  const [value, setValue] = useState("");
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(value);
      setValue("");
      addTagsHandler(value);
    }
  };
  return (
    <div className={styles.tag_box}>
      <h1>Tags</h1>
      <div className={styles.tags_form}>
        <input
          value={value}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          className={styles.tag_input_box}
          onKeyDown={handleTagInputKeyDown}
          placeholder="Add a tag"
        />
      </div>
      <div className={styles.existing_tags}>
        {tagsCollection.map((tag) => {
          return (
            <div className={styles.tags} onClick={() => deleteTagsHandler(tag)}>
              <span>{tag}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
