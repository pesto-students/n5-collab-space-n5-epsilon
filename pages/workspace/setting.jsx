import { getLayout as getSiteLayout } from "../../src/components/layouts/SiteLayout";
import WorkSpaceTitle from "../../src/components/workspace/WorkSpaceTitle";
import {useState} from "react";

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


    const regex = {
        passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ !"#\$%&'\(\)*+,-./:;<=>?@\[\\\]^_`{|}~]).{8,}$/,
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
                                type={passwordShow.input1?'text':'password'}
                                onKeyUp={(e) => {
                                    if (!regex.passwordRegex.test(e.target.value) && e.target.value.length) {
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
                        <button disabled={!submittedForm.formTouched || !!submittedForm.error || copyPassword !== newPassword || submittedForm.submitting}>Save Password</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
};

Setting.getLayout = getSiteLayout;

export default Setting;