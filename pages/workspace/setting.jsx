import { getLayout as getSiteLayout } from "../../src/components/layouts/SiteLayout";
import WorkSpaceTitle from "../../src/components/workspace/WorkSpaceTitle";
import {wrapper} from "../../src/redux/store";
import {getWorkspaceProject} from "../../src/redux/actions/workSpaceActions";
import {useState} from "react";

const Setting = () => {

    const [submittedForm, setSubmittedForm] = useState({
        formTouched: false,
        error: false,
        submitting: false,
    });
    const [newPassword, setNewPassword] = useState('');
    const [copyPassword, setCopyPassword] = useState('');


    const regex = {
        emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    }

    return  <div className='mainContainerBody'>
        <WorkSpaceTitle title='Workspace Name'/>
        <section className='settings-tab'>
            <div className='tab-list'>
                <span><img src='https://api.iconify.design/icon-park-outline/edit-name.svg' alt='name'/>change workspace name</span>
                <span><img src='https://api.iconify.design/teenyicons/password-outline.svg' alt='lock'/>change password</span>
            </div>
            <div className='tab-container'>
                <div className='tab'>
                    <h1>Change Password</h1>
                    <div className='content-wrapper'>
                        <p>New Password</p>
                        <div className='input-wrapper'>
                            <input
                                type="password"
                                onKeyUp={(e) => {
                                    if (!regex.emailRegex.test(e.target.value)) {
                                        setSubmittedForm({
                                            ...submittedForm,
                                            error: "Enter a valid name",
                                        });
                                    } else {
                                        setNewPassword(e.target.value);
                                        setSubmittedForm({
                                            ...submittedForm,
                                            error: false,
                                        });
                                    }
                                }}
                            />
                            <div className='eye'/>
                        </div>
                        <p>Retype New Password</p>
                        <div className='input-wrapper'>
                            <input
                                type="password"
                                onKeyUp={(e) => {
                                    setCopyPassword(e.target.value)
                                }}
                            />
                        </div>
                        <p className={`error-space ${submittedForm.error || copyPassword !== newPassword? 'error':''}`}>{submittedForm.error ? submittedForm.error: copyPassword === newPassword ?'Use 6 or more characters with a mix of letters, numbers & symbols':'Both password does not match'}</p>
                        <button disabled={!submittedForm.formTouched || !!submittedForm.error || copyPassword !== newPassword || submittedForm.submitting}>Save Password</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
};

Setting.getLayout = getSiteLayout;

export default Setting;

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//         async ({ req, params }) => {
//             if (!req.cookies.token)
//                 return {
//                     redirect: {
//                         destination: "/",
//                         permanent: true,
//                     },
//                 };
//             const validToken = await verify(
//                 req.cookies.token,
//                 process.env.REACT_APP_SECRET_TOKEN
//             );
//             if (validToken) {
//                 await store.dispatch(getWorkspaceProject(req));
//                 return { props: { token: req.cookies.token } };
//             } else {
//                 return {
//                     redirect: {
//                         destination: "/",
//                         permanent: false,
//                     },
//                 };
//             }
//         }
// );