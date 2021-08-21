import React, { useState } from 'react';
import AuthAPI from "../../client_apis/authApis";
import {useRouter} from "next/router";
import cookie from "js-cookie"

export default function SignUpForm(props) {

    const Auth = new AuthAPI();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const router = useRouter();
    const [passwordShow, setPasswordShow] = useState(false);


    function submit() {
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
                cookie.set("userId", response["id"]);
                cookie.set("userName", response["name"]);
                localStorage.setItem('user', JSON.stringify(response));
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

    return (
        <form>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Your name"
                   onKeyUp={e => {
                           if(!props.regex.nameRegex.test(e.target.value.trim().toLowerCase())){
                               props.setFormStatus({ ...props.formStatus, nameError: 'Enter a valid name',  error: false})
                           } else{
                               props.setFormStatus({...props.formStatus, formTouched: true, nameError: false,  error: false });
                           }
                       setFormData({ ...formData, name: e.target.value.trim().toLowerCase() });
                   }}/>
            <input type="email" placeholder="Email"
                   onKeyUp={e => {
                           if(!props.regex.emailRegex.test(e.target.value.toLowerCase())){
                               props.setFormStatus({ ...props.formStatus, emailError: 'Enter a valid email address', error: false})
                           } else{
                               props.setFormStatus({...props.formStatus, formTouched: true, error: false, emailError: false });
                           }
                       setFormData({ ...formData, email: e.target.value.toLowerCase() });
                   }}/>
            <div className='input-wrapper'>
                <input
                    type={passwordShow?'text':'password'}
                    placeholder="password"
                    onKeyUp={(e) => {
                        if (e.target.value.length < 6) {
                            props.setFormStatus({
                                ...props.formStatus,
                                error: false,
                                formTouched: true,
                                passwordError: "Password should be 6 character long"
                            });
                        } else {
                            props.setFormStatus({
                                ...props.formStatus,
                                formTouched: true,
                                passwordError: false,
                                error: false
                            });
                        }
                        setFormData({ ...formData, password: e.target.value });
                    }}
                />
                <div className={`eye ${passwordShow ? 'show':''}`} onClick={()=>{setPasswordShow(!passwordShow)}}/>
            </div>
            <div className="bottom-row">
                <span            className={`btn ${
                    !props.formStatus.formTouched ||
                    !!props.formStatus.error ||
                    props.formStatus.submitting || !!props.formStatus.emailError || !!props.formStatus.passwordError || props.formStatus.nameError
                        ? "disable"
                        : ""
                }`} onClick={submit}>SignUp</span>

                <span className='btn'
                    onClick={() => {
                        props.changeForm('SignIn');
                    }}
                > SignIn
                </span>
            </div>
            
            <p className='error'>{ props.formStatus.nameError? props.formStatus.nameError: props.formStatus.emailError? props.formStatus.emailError: props.formStatus.passwordError? props.formStatus.passwordError: props.formStatus.error ? props.formStatus.error : ''}</p>

        </form>
    )
}