import React, { useRef } from "react";
import ContextMenu from "./ContextMenu";
import styles from "../../../../styles/contextMenu.module.scss";
const Container = ({ children, menuItems }) => {
  const containerRef = useRef(null);

  return (
    <div className={styles.container} ref={containerRef}>
      {children}

      <ContextMenu parentRef={containerRef} items={menuItems} />
    </div>
  );
};

export default Container;
