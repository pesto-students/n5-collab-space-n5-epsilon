import React, { useState } from "react";

function ChangeWorkSpaceNameComponent() {
  const [workSpaceName, setWorkSpaceName] = useState("WorkSpace Name");
  const handleChange = (e) => {
    const currentWorkSpaceName = e.target.value;
    setWorkSpaceName(currentWorkSpaceName);
  };
  return (
    <div className="tab">
      <h1>Update WorkSpace Name</h1>
      <div className="content-wrapper">
        <p>Change WorkSpace Name</p>
        <div className="input-wrapper">
          <input type={"text"} value={workSpaceName} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default ChangeWorkSpaceNameComponent;
