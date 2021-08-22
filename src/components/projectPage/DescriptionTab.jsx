import React from "react";
import ResizableTextArea from "../textArea/ResizeableTextArea";

import styles from "../../../styles/description.module.scss";

function DescriptionTab({
  toggleDescription,
  projectInfo,
  description,
  setDescription,
  saveDescriptionHandler,
  handleDescriptionToggle,
}) {
  return (
    <>
      {toggleDescription ? (
        <div className="description" onDoubleClick={handleDescriptionToggle}>
          {projectInfo.description
            ? projectInfo.description
            : "Double click here to add a description"}
        </div>
      ) : (
        <div className={styles.edit_description}>
          <h1>{toggleDescription}</h1>
          <div className={styles.edit_textArea}>
            <ResizableTextArea
              className={styles.description_textarea}
              setValue={setDescription}
              value={description}
              maxRows={20}
              rows={20}
              placeholder="description ..."
            />
          </div>
          <div className={styles.edit_actions}>
            <button
              className={styles.edit_actions_save}
              onClick={saveDescriptionHandler}
            >
              save
            </button>
            <button onClick={handleDescriptionToggle}>cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DescriptionTab;
