import React, { useEffect, useState } from "react";
import SignInForm from "../src/components/Auth-Components/signIn-form";
import SignUpForm from "../src/components/Auth-Components/signUp-form";
import ForgotPasswordForm from "../src/components/Auth-Components/forgotPassword-form";
import { getLayout as getEmptyLayout } from "../src/components/layouts/EmptyLayout";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Spinner from "../src/components/common/contentLoader/spinningCircleLoader";

export default function Authentication() {
  const router = useRouter();
  const token = cookie.get("token");

  useEffect(() => {
    if (token) {
      router.push("/workspace");
    }
  }, [token]);

  const regex = {
    emailRegex:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    nameRegex: /^([a-zA-Z]+( [a-zA-Z]+)|[a-zA-Z]){2,50}$/,
  };
  const [authState, setAuthState] = useState("SignIn");
  const [stateChanging, setStateChanging] = useState(false);
  const [formSubmit, setFormSubmit] = useState({
    formTouched: false,
    error: true,
    submitting: false,
    emailError: false,
    passwordError: false,
    nameError: false,
    loading: false,
  });

  const formSubmitHandler = (newState) => {
    setFormSubmit((prevState) => ({ ...prevState, ...newState }));
  };
  function changeForm(formName) {
    setStateChanging(true);
    setTimeout(() => {
      setAuthState(formName);
      setStateChanging(false);
      formSubmitHandler({
        formTouched: false,
        error: false,
        submitting: false,
        emailError: false,
        passwordError: false,
        nameError: false,
      });
    }, 1000);
  }

  return (
    <section className={`auth-container ${stateChanging ? "stop" : "active"}`}>
      <div className="top">
        <span className="feature-image" />
        <span className="feature-image" />
      </div>
      <div className="bottom">
        <span className="feature-image" />
        <span className="feature-image" />
      </div>
      <div className="center">
        {authState !== "Forgot" && (
          <div className="tab-list">
            <span
              className={`btn ${authState === "SignIn" ? "active" : ""}`}
              onClick={() => {
                changeForm("SignIn");
              }}
            >
              I AM A MEMBER
            </span>
            <span
              className={`btn ${authState === "SignUp" ? "active" : ""}`}
              onClick={() => {
                changeForm("SignUp");
              }}
            >
              I AM NEW HERE
            </span>
          </div>
        )}
        {authState === "SignIn" && (
          <SignInForm
            changeForm={changeForm}
            formStatus={formSubmit}
            setFormStatus={formSubmitHandler}
            regex={regex}
          />
        )}
        {authState === "SignUp" && (
          <SignUpForm
            changeForm={changeForm}
            formStatus={formSubmit}
            setFormStatus={formSubmitHandler}
            regex={regex}
          />
        )}
        {authState === "Forgot" && (
          <ForgotPasswordForm
            changeForm={changeForm}
            formStatus={formSubmit}
            setFormStatus={formSubmitHandler}
            regex={regex}
          />
        )}
      </div>
      {formSubmit.loading ? <Spinner /> : null}
    </section>
  );
}

Authentication.getLayout = getEmptyLayout;
