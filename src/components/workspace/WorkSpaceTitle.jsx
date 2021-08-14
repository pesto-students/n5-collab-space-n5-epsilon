import React from "react";

const WorkSpaceTitle = ({title}) => {
  return (
    <section className='common-header'>
      <h1>{title}</h1>
        <div className='user-profile'>
          <span className='icon'><span>Himanshu</span></span>
        </div>
    </section>
  );
};

export default WorkSpaceTitle;
