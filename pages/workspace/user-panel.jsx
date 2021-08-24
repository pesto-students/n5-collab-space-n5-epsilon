import React, { useEffect, useState } from "react";
import { wrapper } from "../../src/redux/store";
import {
  addUser,
  getWorkspaceProject,
} from "../../src/redux/actions/workSpaceActions";
import { useSelector, useDispatch } from "react-redux";
import WorkSpaceTitle from "../../src/components/workspace/WorkSpaceTitle";
import AuthAPI from "../../src/client_apis/authApis";
import { verify } from "jsonwebtoken";
import Image from "next/image";

const UserPanel = () => {
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
    projectId: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showAddToProjectList, setShowAddToProjectList] = useState(false);
  const projects = useSelector((state) => state.WorkSpaceReducer.projects);
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState({});
  const [projectList, setProjectList] = useState({});
  const [availableProjectList, setAvailableProjectList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [completeCheckShow, setCompleteCheckShow] = useState(false);
  const Auth = new AuthAPI();

  useEffect( () => {
    const availableProjects = [];

    projects.map((item) => {
      if (item.role === "Admin") {
        availableProjects.push(item);
      }
    });
    setAvailableProjectList(availableProjects);

    mapUserToProjectList();

    document.addEventListener("click", outsideClickListen);

    return () => {
      document.removeEventListener("click", outsideClickListen);
    };
  }, [projects]);

  async function addExistingUser(userInfo, selectedProject) {
    await dispatch(addUser(userInfo));

    const newProjectList = projectList;
    newProjectList[selectedProject.projectId] = {
      projectName: selectedProject.projectName,
      projectId: selectedProject.projectId,
    }
    setProjectList( newProjectList);
    setShowAddToProjectList(false);
  }

  function mapUserToProjectList() {
    const userData = {};
    Auth.getAddedUsers({
      userId: JSON.parse(localStorage.getItem("user")).id,
    })
      .then(({ data }) => {
        // console.log('===test===', data);

        data.forEach((project) => {
          project.users.forEach((user) => {
            if (!userData[user._id]) {
              userData[user._id] = {
                [project._id]: {
                  projectName: project.projectInfo.projectName,
                  projectId: project._id,
                },
                name: user.name,
                email: user.email,
              };
            } else {
              if (!userData[user._id][project._id]) {
                userData[user._id][project._id] = {
                  projectName: project.projectInfo.projectName,
                  projectId: project._id,
                };
              }
            }
          });
        });
        setUsersList(userData);
        // Object.keys(userData).map((user)=> {
        //   console.log('===check===', user)
        // })

        // console.log('===check===', userData)
      })
      .catch((error) => {});
  }

  function invite() {
    setSubmittedForm({
      submitting: true,
    });
    Auth.sendInviteToUsers({
      userEmail: inviteForm.email,
      projectId: inviteForm.projectId,
      userName: JSON.parse(localStorage.getItem("user")).name,
    })
      .then(({ data: response }) => {
        setSubmittedForm({
          error: false,
          submitting: false,
        });
        setInviteForm({
          name: "",
          email: "",
          projectId: "",
        });
        setSubmittedForm({
          formTouched: false,
          nameError: false,
          emailError: false,
          submitting: false,
          apiError: false,
        });

        setCompleteCheckShow(true);
        setTimeout(()=>{
          setCompleteCheckShow(false);
          setShowForm(false);
        }, 2000);
      })
      .catch((error) => {
        setSubmittedForm({
          ...submittedForm,
          apiError: error.response.data,
          submitting: false,
        });
      });
  }

  function outsideClickListen(e) {
    if (
      !e.target.closest(".add-project") &&
      !e.target.classList.contains("add-project")
    ) {
      setShowAddToProjectList(false);
    }
  }

  return (
    <div className="mainContainerBody">
      <WorkSpaceTitle />
      <section className="user-panel">
        <div className="user-list">
          <div className="description">
            <h4>Description</h4>
            <p>
              People in your Projects that collaborate with each other. Those
              who don’t have access to any of your project within your workspace
              will not appear here.
            </p>
          </div>
          <h4>Members List</h4>
          <div className="list available-users">
            <div
              className="user invite"
              onClick={() => {
                setShowForm(true);
              }}
            >
              <span className="icon">
                <Image
                  src="https://api.iconify.design/fluent/add-circle-32-regular.svg?color=%235c75ac"
                  alt="image"
                  layout="fill"
                />
              </span>
              Invite User
            </div>
            {Object.keys(usersList).map((user) => {
              return (
                <div
                  key={user}
                  className={`user ${selectedUser === user? 'active':''}`}
                  onClick={() => {
                    setSelectedUser(user);
                    setProjectList(usersList[user]);
                  }}
                >
                  <span
                    className="icon"
                    style={{
                      background:
                        "#" + Math.floor(Math.random() * 16777215).toString(16),
                    }}
                  >
                    <span>{usersList[user].name}</span>
                  </span>
                  <div className="name">{usersList[user].name}</div>
                  <div className="email">{usersList[user].email}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="project-list-space">
          <h4>Projects</h4>
          {Object.keys(projectList).length ? (
            <div className="project-list">
              <div
                className="project add-project"
                onClick={() => {
                  setShowAddToProjectList(true);
                }}
              >
                <div className="first-image">
                  <Image
                    src="https://api.iconify.design/bi/plus-lg.svg?color=%235c75ac"
                    alt="image"
                    height="32"
                    width="162"
                  />
                </div>
                Add User to a Project
                {showAddToProjectList && (
                  <div className="projects-to-add">
                    {availableProjectList.map((project) => {
                      return !projectList[project.projectId] ? (
                        <span
                          data-id={project.projectId}
                          data-email={projectList.email}
                          key={project.projectId}
                          onClick={async () => {
                            await addExistingUser({
                              userEmail: projectList.email,
                              projectId: project.projectId,
                            },project);
                          }}
                        >
                          {project.projectName}
                        </span>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                )}
              </div>
              {Object.keys(projectList).map((userKey) => {
                return userKey !== "email" && userKey !== "name" ? (
                  <div key={userKey} className="project">
                    <div className="image">
                      <Image
                        style={{
                          background:
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                        }}
                        src="https://api.iconify.design/clarity/bubble-chart-solid-badged.svg?color=white"
                        alt="image"
                        height="32"
                        width="162"
                      />
                    </div>
                    <span>{projectList[userKey].projectName}</span>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
              Object.keys(usersList).length ? <div className="select-user-box">
                    <h1>
                      Please select a user from members list to view projects you have shared to them
                    </h1>
                    <Image src="/choose.jpeg" alt="empty" layout="fill" />

                  </div> :
            <div className="empty-box">
              <h1>
                You have not started sharing projects with others.
                <span>Please Invite Other Users And Start Collaborating</span>
              </h1>
              <Image src="/empty.gif" alt="empty" layout="fill" />
            </div>
          )}
        </div>

        {showForm && (
          <div className="modal-form">
            <div className="content-wrapper">
              <div className="cross">
                <Image
                  onClick={() => {
                    setShowForm(false);
                  }}
                  src="https://api.iconify.design/maki/cross.svg?color=black"
                  alt="cross"
                  height="15"
                  width="15"
                />
              </div>
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
                    setInviteForm({
                      ...inviteForm,
                      email: e.target.value.toLowerCase(),
                    });
                  }}
                />
                <select
                  className={`${inviteForm.projectId ? "selected" : ""}`}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, projectId: e.target.value })
                  }
                >
                  <option value="any">Any</option>
                  {availableProjectList.length &&
                    availableProjectList.map((project) => {
                      return (
                        <option
                          key={project.projectId}
                          value={project.projectId}
                        >
                          {project.projectName}
                        </option>
                      );
                    })}
                </select>
                <button
                  className="transparent-btn"
                  disabled={
                    !submittedForm.formTouched ||
                    submittedForm.submitting ||
                    submittedForm.emailError ||
                    submittedForm.nameError ||
                    submittedForm.apiError
                  }
                  onClick={invite}
                >
                  Invite
                </button>
                <p className="error">
                  {submittedForm.emailError
                    ? submittedForm.emailError
                    : submittedForm.nameError
                    ? submittedForm.nameError
                    : submittedForm.apiError
                    ? submittedForm.apiError
                    : ""}
                </p>
              </form>
              {completeCheckShow &&  <div className='complete-check'/>}
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
