import React, { useState, useEffect } from "react";
import AuthAPI from "../../client_apis/authApis";
import { useRouter } from "next/router";
import cookie from "js-cookie";

export default function SignInForm(props) {
  const Auth = new AuthAPI();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { redirect } = router.query;
  const [passwordShow, setPasswordShow] = useState(false);
  function submit() {
    props.setFormStatus({
      submitting: true,
      // loading:true,
    });
    Auth.emailLogin(formData)
      .then(({ data: response }) => {
        props.setFormStatus({
          error: false,
          submitting: false,

        });
        cookie.set("token", response["auth-token"]);
        cookie.set("userId", response["id"]);
        cookie.set("userName", response["name"]);
        localStorage.setItem('user', JSON.stringify(response));
        if (redirect) {
          router.push({
            pathname: router.query.url,
            query: router.query,
          });
        } else {
          router.push("/workspace");
        }
      })
      .catch((error) => {
        props.setFormStatus({
          ...props.formStatus,
          error: error.response.data,
          submitting: false,
        });
      });
  }

  return (
    <form>
      <h2>Sign In</h2>
            <input
        type="email"
        placeholder="email"
        onKeyUp={(e) => {
            if (!props.regex.emailRegex.test(e.target.value.toLowerCase())) {
              props.setFormStatus({...props.formStatus, error: false, emailError: "Enter a valid email address", formTouched: true
              });
            } else {
              props.setFormStatus({
                ...props.formStatus,
                formTouched: true,
                emailError: false,
                  error: false
              });
          }
            setFormData({ ...formData, email: e.target.value.toLowerCase() });
        }} />
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
                <span
                    className={`btn`}
                    onClick={() => {props.changeForm("SignUp")}}>
                    SignUp</span>
                <span
                    className={`btn ${
            !props.formStatus.formTouched ||
            !!props.formStatus.error ||
            props.formStatus.submitting || !!props.formStatus.emailError || !!props.formStatus.passwordError
              ? "disable"
              : ""
          }`}
                    onClick={submit} >
                    SignIn
                </span>
                <span
                    className={`btn`}
                    onClick={() => {
            props.changeForm("Forgot");
          }}
                >
          Forgot Password
        </span>
            </div>
        <p className="error">{ props.formStatus.emailError? props.formStatus.emailError: props.formStatus.passwordError? props.formStatus.passwordError: props.formStatus.error ? props.formStatus.error : ''}</p>
    </form>
  );
}
