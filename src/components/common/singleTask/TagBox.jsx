import React, { useState } from "react";
import { toast } from "react-toastify";
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
      const formattedValue = value
        .replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
        .trim();
      if (tagsCollection.includes(formattedValue)) {
        toast.warn("already exists");
      } else {
        addTagsHandler(formattedValue);
        setValue("");
      }
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
            <div
              key={tag}
              className={styles.tags}
              onClick={() => deleteTagsHandler(tag)}
            >
              <span>{tag}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
