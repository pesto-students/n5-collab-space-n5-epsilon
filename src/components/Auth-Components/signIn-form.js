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

  function submit() {
    props.setFormStatus({
      submitting: true,
    });
    Auth.emailLogin(formData)
      .then(({ data: response }) => {
        props.setFormStatus({
          error: false,
          submitting: false,
        });
        cookie.set("token", response["auth-token"]);
        cookie.set("userId", response["id"]);
        router.push("/workspace");
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
          if (e.charCode !== 13) {
            if (!props.regex.emailRegex.test(e.target.value)) {
              props.setFormStatus({
                ...props.formStatus,
                error: "Enter a valid email address",
              });
            } else {
              setFormData({ ...formData, email: e.target.value.toLowerCase() });
              props.setFormStatus({
                ...props.formStatus,
                formTouched: true,
                error: false,
              });
            }
          }
        }}
      />
      <input
        type="password"
        placeholder="password"
        onKeyUp={(e) => {
          if (e.charCode !== 13) {
            if (formData.email && props.regex.emailRegex.test(formData.email)) {
              props.setFormStatus({ ...props.formStatus, formTouched: true });
              setFormData({ ...formData, password: e.target.value });
            } else {
              setFormData({ ...formData, password: e.target.value });
              props.setFormStatus({
                ...props.formStatus,
                formTouched: true,
                error: false,
              });
            }
          }
        }}
      />
      <div className="bottom-row">
        <span
          className={`btn`}
          onClick={() => {
            props.changeForm("SignUp");
          }}
        >
          SignUp
        </span>
        <span
          className={`btn ${
            !props.formStatus.formTouched ||
            !!props.formStatus.error ||
            props.formStatus.submitting
              ? "disable"
              : ""
          }`}
          onClick={submit}
        >
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
      {props.formStatus.error && (
        <p className="error">{props.formStatus.error}</p>
      )}
    </form>
  );
}
