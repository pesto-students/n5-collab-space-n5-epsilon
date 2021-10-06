import React from "react";
import { useSelector } from "react-redux";
function InfoBanner() {
  const information = useSelector((state) => state.ProjectReducer.projectInfo);
  const { projectName, description } = information;
  return (
    <div className='infoBanner'>
      <h1>{projectName}</h1>
      <p>
        <strong>Description</strong> {description}
      </p>
    </div>
  );
}

export default InfoBanner;
