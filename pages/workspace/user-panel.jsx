const UserPanel = () => {
  return <section className='user-panel'>
    <div className='user-list'>
      <div className='list pending-users'>
        <div className='user invite'>
            <span className='icon'>
              <img src='https://api.iconify.design/fluent/add-circle-32-regular.svg?color=%235c75ac' alt='image'/></span>
          Invite User
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
      </div>
      <div className='list available-users'>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'>H</span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
      </div>
    </div>
    <div className='project-list'>
      <div className='project'>
        <img src='https://api.iconify.design/bi/plus-lg.svg?color=%235c75ac' alt='image' />
        Nwe Project
      </div>
      <div className='project'>
        <img src='https://api.iconify.design/bi/plus-lg.svg?color=%235c75ac' alt='image' />
        Project Name 1
      </div>
      <div className='project'>
        <img src='https://api.iconify.design/bi/plus-lg.svg?color=%235c75ac' alt='image' />
        Project Name 2
      </div>
    </div>
  </section>;
};

export default UserPanel;
