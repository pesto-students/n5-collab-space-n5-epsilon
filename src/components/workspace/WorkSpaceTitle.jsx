import React from "react";

const WorkSpaceTitle = ({title, description, isProject}) => {
  return (
    <section className='common-header'>
      <h1>{title}</h1>
      {description && <span>description</span>}
        <div className='user-profile'>
          <span className='icon'><span>Himanshu</span></span>
        </div>
    </section>
  );
};

export default WorkSpaceTitle;
