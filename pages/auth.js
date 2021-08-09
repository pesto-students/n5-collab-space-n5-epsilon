import React, { useState } from 'react';
import SignInForm from "../src/components/Auth-Components/signIn-form";
import SignUpForm from "../src/components/Auth-Components/signUp-form";
import ForgotPasswordForm from "../src/components/Auth-Components/forgotPassword-form";
import {getLayout as getEmptyLayout} from "../src/components/layouts/EmptyLayout";
import cookie from "js-cookie"


export default function Authentication() {

    const regex = {
        emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
        nameRegex: /^([a-zA-Z]+( [a-zA-Z]+)|[a-zA-Z]){2,50}$/,
    }
    const [authState, setAuthState] = useState('SignUp');
    const [stateChanging, setStateChanging] = useState(false);
    const [formSubmit, setFormSubmit] = useState({
        formTouched: false,
        error: true,
        submitting : false
    });

    function changeForm(formName) {
        setStateChanging(true);
        setTimeout(() => {
            setAuthState(formName);
            setStateChanging(false);
            setFormSubmit({
                formTouched: false,
                error: false,
                submitting : false
            })
        }, 1000);
    }
    cookie.remove('token');

    return (
        <section className={`container ${stateChanging ? 'stop' : 'active'}`}>
            <div className="top"><span className='feature-image'/><span className='feature-image'/></div>
            <div className="bottom"><span className='feature-image'/><span className='feature-image'/></div>
                <div className="center">
                    {authState === 'SignIn' && (
                        <SignInForm
                            changeForm={changeForm}
                            formStatus={formSubmit}
                            setFormStatus={setFormSubmit}
                            regex={regex}
                        /> 
                    )}
                    {authState === 'SignUp' && (
                        <SignUpForm
                            changeForm={changeForm}
                            formStatus={formSubmit}
                            setFormStatus={setFormSubmit}
                            regex={regex}
                        />
                    )}
                    {authState === 'Forgot' && (
                       <ForgotPasswordForm
                           changeForm={changeForm}
                           formStatus={formSubmit}
                           setFormStatus={setFormSubmit}
                           regex={regex}
                       />
                    )}
                </div>
        </section>
    );
}

Authentication.getLayout = getEmptyLayout
