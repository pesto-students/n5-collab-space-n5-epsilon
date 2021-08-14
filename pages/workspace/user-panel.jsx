import {useEffect, useState} from "react";
import cookie from "js-cookie";
import {wrapper} from "../../src/redux/store";
import {getWorkspaceProject} from "../../src/redux/actions/workSpaceActions";
import { useSelector, useDispatch } from "react-redux";

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, params }) => {
          if (!req.cookies.token) {
            return {
              redirect: {
                destination: "/",
                permanent: true,
              },
            };
          }

          await store.dispatch(getWorkspaceProject(req));
          return { props: { token: req.cookies.token } };
        }
);

const UserPanel = (props) => {

  const regex = {
    emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    nameRegex: /^([a-zA-Z]+( [a-zA-Z]+)|[a-zA-Z]){2,50}$/,
  }
  const [stateChanging, setStateChanging] = useState(false);
  const [submittedForm, setSubmittedForm] = useState({
    formTouched: false,
    error: false,
    submitting : false
  });
  const [inviteForm, setInviteForm]= useState({
    name: '',
    email: '',
  })
  const [showForm, setShowForm]= useState(false);
  const projects = useSelector((state) => state.WorkSpaceReducer.projects);
  console.log("this is project", projects);
  const dispatch = useDispatch();

  function invite() {
    props.setFormStatus({
      submitting: true,
    });
    Auth.emailSignUp(formData)
        .then(({data: response}) => {
          props.setFormStatus({
            error: false,
            submitting: false,
          });
          cookie.set('token', response['auth-token']);
          router.push('/workspace');
        })
        .catch(error => {
          props.setFormStatus({
            ...props.formStatus,
            error: error.response.data,
            submitting : false
          })
        });
  }

  return <section className='user-panel'>
    <div className='user-list'>
      <div className='description'>
        <h4>Description</h4>
        <p>
          People in your Projects that collaborate with each other. Those who don’t have access to any of your project within your workspace will not appear here.
        </p>
      </div>
      <h4>Members</h4>
      <div className='list available-users'>
        <div className='user invite' onClick={()=>{
          setShowForm(true);
        }}>
            <span className='icon'>
              <img src='https://api.iconify.design/fluent/add-circle-32-regular.svg?color=%235c75ac' alt='image'/></span>
          Invite User
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
        <div className='user'>
          <span className='icon'><span>Himanshu</span></span>
          <div className='name'>abc</div>
          <div className='email'>abc@g.com</div>
        </div>
      </div>
    </div>
    <div className='project-list-space'>
      <h4>Projects</h4>
      <div className='project-list'>
      <div className='project'>
        <img src='https://api.iconify.design/bi/plus-lg.svg?color=%235c75ac' alt='image' />
        Nwe Project
      </div>
        <div className='project'>
          <img src='https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white' alt='image' />
          Nwe Project
        </div>
        <div className='project'>
          <img src='https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white' alt='image' />
          Nwe Project
        </div>
        <div className='project'>
          <img src='https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white' alt='image' />
          Nwe Project
        </div>
        <div className='project'>
          <img src='https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white' alt='image' />
          Nwe Project
        </div>
        <div className='project'>
          <img src='https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white' alt='image' />
          Nwe Project
        </div>
        <div className='project'>
          <img src='https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white' alt='image' />
          Nwe Project
        </div>
      </div>
    </div>

    {showForm && (<div className='invite-form'>
      <div className='content-wrapper'>
        <img className='cross' onClick={()=>{setShowForm(false) }} src='https://api.iconify.design/maki/cross.svg?color=black' alt='cross'/>
        <h1>Send Invite</h1>
        <form>
          <input type="text" placeholder="User Name"
                 onKeyUp={e => {
                   if (e.charCode !== 13) {
                     if(!regex.nameRegex.test(e.target.value)){
                       setSubmittedForm({ ...submittedForm, error: 'Enter a valid name'})
                     } else{
                       setInviteForm({ ...inviteForm, name: e.target.value });
                       setSubmittedForm({...submittedForm, formTouched: true, error: false });
                     }
                   }
                 }}/>
          <input type="email" placeholder="User Email"
                 onKeyUp={e => {
                   if (e.charCode !== 13) {
                     if(!regex.emailRegex.test(e.target.value.toLowerCase())){
                       setSubmittedForm({ ...submittedForm, error: 'Enter a valid email address'})
                     } else{
                       setInviteForm({ ...inviteForm, email: e.target.value });
                       setSubmittedForm({...submittedForm, formTouched: true, error: false });
                     }
                   }
                 }}/>
          <button disabled={!submittedForm.formTouched || !!submittedForm.error || submittedForm.submitting} onClick={invite}>Invite</button>
          {submittedForm.error && (<p className='error'>{submittedForm.error}</p>)}
        </form>
      </div>
    </div>)}
  </section>;
};

export default UserPanel;
