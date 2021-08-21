import React, { useEffect, useState } from "react";
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
    nameError: false,
    emailError: false,
    submitting: false,
    apiError: false,
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

    // console.log('===avaialble===', availableProjects);
    setAvailableProjectList(availableProjects)
    Auth.getAddedUsers({
      userId: JSON.parse(localStorage.getItem('user')).id
    })
        .then(({ data }) => {
          // console.log('===test===', data);

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

          // console.log('===check===', userData)
        })
        .catch((error) => {
        });
  }, []);



  function invite() {
    setSubmittedForm({
      submitting: true,
    });
    Auth.sendInviteToUsers({
      userEmail: inviteForm.email,
      projectId: inviteForm.projectId,
      userName: JSON.parse(localStorage.getItem('user')).name
    })
      .then(({ data: response }) => {
        setSubmittedForm({
          error: false,
          submitting: false,
        });
        setInviteForm({
          name: "",
          email: "",
          projectId: ""
        });
        setSubmittedForm({
          formTouched: false,
          nameError: false,
          emailError: false,
          submitting: false,
          apiError: false,
        });

        setShowForm(false);
      })
      .catch((error) => {
        setSubmittedForm({
          ...submittedForm,
          apiError: error.response.data,
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
                    if (!regex.nameRegex.test(e.target.value)) {
                      setSubmittedForm({
                        ...submittedForm,
                        nameError: "Enter a valid name",
                        apiError: false,
                      });
                    } else {
                      setSubmittedForm({
                        ...submittedForm,
                        formTouched: true,
                        nameError: false,
                        apiError: false,
                      });
                    }
                  setInviteForm({ ...inviteForm, name: e.target.value });
                }}
              />
              <input
                type="email"
                placeholder="User Email"
                onKeyUp={(e) => {
                    if (!regex.emailRegex.test(e.target.value.toLowerCase())) {
                      setSubmittedForm({
                        ...submittedForm,
                        emailError: "Enter a valid email address",
                        apiError: false,
                      });
                    } else {
                      setSubmittedForm({
                        ...submittedForm,
                        formTouched: true,
                        emailError: false,
                        apiError: false,
                      });
                    }
                  setInviteForm({ ...inviteForm, email: e.target.value.toLowerCase() });
                }}
              />
              <select
                  className={`${ inviteForm.projectId? 'selected':''}`}
                  onChange={(e) =>  setInviteForm({ ...inviteForm, projectId: e.target.value })}
              >
                <option value='any'>Any</option>
                {availableProjectList.length && availableProjectList.map((project) => {
                  return <option key={project.projectId} value={project.projectId}>{project.projectName}</option>
                })
                }
              </select>
              <button
                  className='transparent-btn'
                disabled={
                  !submittedForm.formTouched ||
                  submittedForm.submitting ||
                  submittedForm.emailError || submittedForm.nameError ||  submittedForm.apiError
                }
                onClick={invite}
              >
                Invite
              </button>
              <p className="error">{ submittedForm.emailError? submittedForm.emailError: submittedForm.nameError? submittedForm.nameError: submittedForm.apiError ? submittedForm.apiError : ''}</p>
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