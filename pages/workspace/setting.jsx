import { getLayout as getSiteLayout } from "../../src/components/layouts/SiteLayout";
import WorkSpaceTitle from "../../src/components/workspace/WorkSpaceTitle";
import {useState} from "react";
import AuthAPI from "../../src/client_apis/authApis";

const Setting = () => {
    const [submittedForm, setSubmittedForm] = useState({
        formTouched: false,
        error: false,
        submitting: false,
    });
    const [newPassword, setNewPassword] = useState('');
    const [copyPassword, setCopyPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState({
        input1: false,
        input2: false
    });
    const [tab, setTab] = useState('password');


    const regex = {
        passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ !"#\$%&'\(\)*+,-./:;<=>?@\[\\\]^_`{|}~]).{8,}$/,
    }

    const Auth = new AuthAPI();

    function submit() {
       setSubmittedForm({
            submitting: true,
        });
        Auth.updatePassword({
            userEmail: JSON.parse(localStorage.getItem('user')).email,
            token: JSON.parse(localStorage.getItem('user')).id,
            newPassword: newPassword
        })
            .then(() => {
                setSubmittedForm({
                    error: false,
                    submitting: false,
                });
                JSON.parse(localStorage.getItem('user')).id;
            })
            .catch(error => {
                setSubmittedForm({
                    ...submittedForm,
                    error: error.response.data,
                    submitting : false
                })
            });
    }


    return  <div className='mainContainerBody'>
        <WorkSpaceTitle title='Workspace Name'/>
        <section className='settings-tab'>
            <div className='tab-list'>
                <span onClick={()=>{
                    setTab('workspace')
                }} className={`${tab === 'workspace'? 'active':''}`}><img src='https://api.iconify.design/icon-park-outline/edit-name.svg' alt='name'/>change workspace name</span>
                <span onClick={()=>{
                    setTab('password')
                }} className={`${tab === 'password'? 'active':''}`}><img src='https://api.iconify.design/teenyicons/password-outline.svg' alt='lock'/>change password</span>
            </div>
            <div className='tab-container'>
                {tab === 'password' &&     <div className='tab'>
                    <h1>Change Password</h1>
                    <div className='content-wrapper'>
                        <p>New Password</p>
                        <div className='input-wrapper'>
                            <input
                                type={passwordShow.input1?'text':'password'}
                                onKeyUp={(e) => {
                                    if (!regex.passwordRegex.test(e.target.value) && e.target.value.length) {
                                        setSubmittedForm({
                                            ...submittedForm,
                                            error: "Enter a valid name",
                                            formTouched: true,
                                        });
                                    } else {
                                        setNewPassword(e.target.value);
                                        setSubmittedForm({
                                            ...submittedForm,
                                            formTouched: true,
                                            error: false,
                                        });
                                    }
                                }}
                            />
                            <div className={`eye ${passwordShow.input1 ? 'show':''}`} onClick={()=>{
                                setPasswordShow({...passwordShow, input1: !passwordShow.input1})
                            }}/>
                        </div>
                        <p>Retype New Password</p>
                        <div className='input-wrapper'>
                            <input
                                type={passwordShow.input2?'text':'password'}
                                onKeyUp={(e) => {
                                    setCopyPassword(e.target.value)
                                }}
                            />
                            <div className={`eye ${passwordShow.input2 ? 'show':''}`} onClick={()=>{
                                setPasswordShow({...passwordShow, input2: !passwordShow.input2})
                            }}/>
                        </div>
                        <p className={`error-space ${submittedForm.error || copyPassword !== newPassword? 'error':''}`}>{submittedForm.error ? submittedForm.error: copyPassword === newPassword ?'Atleast 8 characters, one lower case character, one upper case character, one number and one special character.':'Both password does not match'}</p>
                        <button onClick={submit} className='btn' disabled={!submittedForm.formTouched || submittedForm.error || copyPassword !== newPassword || submittedForm.submitting}>Save Password</button>
                    </div>
                </div>}
                {tab === 'workspace' &&  <div className='tab'/>}
            </div>
        </section>
    </div>
};

Setting.getLayout = getSiteLayout;

export default Setting;