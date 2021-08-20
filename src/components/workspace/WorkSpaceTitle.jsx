import React, {useEffect, useState} from "react";

const WorkSpaceTitle = ({title, description, isProject}) => {
  const[username, setUsername] = useState('');
  useEffect(()=>{
    setUsername(JSON.parse(localStorage.getItem('user')).name);
  })
  return (
    <section className='common-header'>
      <h1>{title}</h1>
      {description && <span>description</span>}
        <div className='user-profile'>
          <span className='icon'><span>{username}</span></span>
        </div>
    </section>
  );
};

export default WorkSpaceTitle;
