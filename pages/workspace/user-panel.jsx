import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { wrapper } from "../../src/redux/store";
import { getWorkspaceProject } from "../../src/redux/actions/workSpaceActions";
import { useSelector, useDispatch } from "react-redux";
import WorkSpaceTitle from "../../src/components/workspace/WorkSpaceTitle";
import AuthAPI from "../../src/client_apis/authApis";
import {verify} from "jsonwebtoken";


const UserPanel = (props) => {
  const regex = {
    emailRegex:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    nameRegex: /^([a-zA-Z]+( [a-zA-Z]+)|[a-zA-Z]){2,50}$/,
  };
  const [submittedForm, setSubmittedForm] = useState({
    formTouched: false,
    error: false,
    submitting: false,
  });
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    projectId: ""
  });
  const [showForm, setShowForm] = useState(false);
  const projects = useSelector((state) => state.WorkSpaceReducer.projects);
  const dispatch = useDispatch();
  const[usersList, setUsersList] = useState({});
  const[projectList, setProjectList] = useState({});
  const[availableProjectList, setAvailableProjectList] = useState([]);
  const Auth = new AuthAPI();

  useEffect(() => {
    const userData ={}
    const availableProjects =[]

    projects.map((item)=>{
      if(item.role === 'Admin'){
        availableProjects.push(item);
      }
    })

    console.log('===avaialble===', availableProjects);
    setAvailableProjectList(availableProjects)
    Auth.getAddedUsers({
      userId: '6111674d267948b6906ee442'
    })
        .then(({ data }) => {
          console.log('===test===', data);

          data.forEach((project)=>{
            project.users.forEach((user)=>{
              if(!userData[user._id]){
                userData[user._id] = {
                  [project._id] : {
                    projectName: project._id
                  },
                  name: user.name,
                  email: user.email
                }
              } else{
                if(!userData[user._id][project._id]) {
                  userData[user._id][project._id] = {
                    projectName: project._id
                  }
                }
              }


            })
          });
          setUsersList(userData);
          // Object.keys(userData).map((user)=> {
          //   console.log('===check===', user)
          // })

          console.log('===check===', userData)
        })
        .catch((error) => {
        });
  }, []);



  function invite() {
    setSubmittedForm({
      submitting: true,
    });
    Auth.getAddedUsers({
      // userId: JSON.parse(localStorage.getItem('user')).id,
      userId: '611b305bb5aba21c6a3bb31f'
    })
      .then(({ data: response }) => {
        setSubmittedForm({
          error: false,
          submitting: false,
        });
      })
      .catch((error) => {
        setSubmittedForm({
          ...submittedForm,
          error: error.response.data,
          submitting: false,
        });
      });
  }

  return (
      <div className="mainContainerBody">
        <WorkSpaceTitle/>
        <section className="user-panel">
      <div className="user-list">
        <div className="description">
          <h4>Description</h4>
          <p>
            People in your Projects that collaborate with each other. Those who
            don’t have access to any of your project within your workspace will
            not appear here.
          </p>
        </div>
        <h4>Members</h4>
        <div className="list available-users">
          <div
            className="user invite"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <span className="icon">
              <img
                src="https://api.iconify.design/fluent/add-circle-32-regular.svg?color=%235c75ac"
                alt="image"
              />
            </span>
            Invite User
          </div>
          {
            Object.keys(usersList).map((user)=>{
              return  <div key={user} className="user" onClick={()=>{
                setProjectList(usersList[user])
              }}>
                <span className="icon">
              <span>{usersList[user].name}</span>
            </span>
                <div className="name">{usersList[user].name}</div>
                <div className="email">{usersList[user].email}</div>
              </div>
            })
          }
        </div>
      </div>
      <div className="project-list-space">
        <h4>Projects</h4>
        {Object.keys(projectList).length ? <div className="project-list">
          <div className="project">
            <img
                src="https://api.iconify.design/bi/plus-lg.svg?color=%235c75ac"
                alt="image"
            />
            Nwe Project
          </div>
          {Object.keys(projectList).map((userKey)=>{
            return userKey !=='email'&& userKey !== 'name' ? <div key={userKey} className="project">
              <img
                  src="https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white"
                  alt="image"
              />
                  {projectList[userKey].projectName}
            </div>: null
          })}
        </div> : <div className='empty-box'>
          <h1>You have not started sharing projects with others.
          <span>Please Invite Other Users And Start Collaborating</span></h1>
          <img src='/empty.gif' alt='empty'/>
        </div>}
      </div>

      {showForm && (
        <div className="modal-form">
          <div className="content-wrapper">
            <img
              className="cross"
              onClick={() => {
                setShowForm(false);
              }}
              src="https://api.iconify.design/maki/cross.svg?color=black"
              alt="cross"
            />
            <h1>Send Invite</h1>
            <form>
              <input
                type="text"
                placeholder="User Name"
                onKeyUp={(e) => {
                  if (e.charCode !== 13) {
                    if (!regex.nameRegex.test(e.target.value)) {
                      setSubmittedForm({
                        ...submittedForm,
                        error: "Enter a valid name",
                      });
                    } else {
                      setInviteForm({ ...inviteForm, name: e.target.value });
                      setSubmittedForm({
                        ...submittedForm,
                        formTouched: true,
                        error: false,
                      });
                    }
                  }
                }}
              />
              <input
                type="email"
                placeholder="User Email"
                onKeyUp={(e) => {
                  if (e.charCode !== 13) {
                    if (!regex.emailRegex.test(e.target.value.toLowerCase())) {
                      setSubmittedForm({
                        ...submittedForm,
                        error: "Enter a valid email address",
                      });
                    } else {
                      setInviteForm({ ...inviteForm, email: e.target.value });
                      setSubmittedForm({
                        ...submittedForm,
                        formTouched: true,
                        error: false,
                      });
                    }
                  }
                }}
              />
              <select
                  onChange={(e) =>  setInviteForm({ ...inviteForm, projectId: e.target.value })}
              >
                <option value='any'>Any</option>
                {availableProjectList.length && availableProjectList.map((project) => {
                  return <option key={project.projectId} value={project.projectId}>{project.projectName}</option>
                })
                }
              </select>
              <button
                disabled={
                  !submittedForm.formTouched ||
                  !!submittedForm.error ||
                  submittedForm.submitting ||
                  !inviteForm.name || !inviteForm.email || !inviteForm.projectId
                }
                onClick={invite}
              >
                Invite
              </button>
              {submittedForm.error && (
                <p className="error">{submittedForm.error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
      </div>
  );
};

export default UserPanel;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, params }) => {
          console.log("this came here");
          if (!req.cookies.token)
            return {
              redirect: {
                destination: "/",
                permanent: true,
              },
            };
          const validToken = await verify(
              req.cookies.token,
              process.env.REACT_APP_SECRET_TOKEN
          );
          if (validToken) {
            await store.dispatch(getWorkspaceProject(req));
            return { props: { token: req.cookies.token } };
          } else {
            return {
              redirect: {
                destination: "/",
                permanent: false,
              },
            };
          }
        }
);