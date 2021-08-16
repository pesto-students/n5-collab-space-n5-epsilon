import React from "react";
import styles from "../../../../styles/singleTask.module.scss";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function TaskHeader({
  taskInfo,
  toggle,
  setToggle,
  editorState,
}) {
  return (
    <>
      <div className={styles.task_header}>
        <div className="task_information">
          <h1>{taskInfo.taskName}</h1>
          <h1>{taskInfo.status}</h1>
        </div>
        <div className={styles.task_option}>
          <button>edit</button>
          <button>...</button>
        </div>
      </div>
      <div className={styles.task_description}></div>
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
    </>
  );
}
