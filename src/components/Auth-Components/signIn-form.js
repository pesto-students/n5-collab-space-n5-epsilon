import React, { useState, useEffect } from "react";
import AuthAPI from "../../client_apis/authApis";
import { useRouter } from "next/router";
import cookie from "js-cookie";

export default function SignInForm(props) {
  const Auth = new AuthAPI();
  const [formData, setFormData] = useState({
    email: "demo@collabspace.com",
    password: "demouser123",
  });
  const router = useRouter();
  const { redirect } = router.query;
  const [passwordShow, setPasswordShow] = useState(false);
  const checkSignIn = () => {
    let isFormFilled = !!formData.password || !!formData.email;
    let checkOtherParameter =
      !props.formStatus.formTouched ||
      !!props.formStatus.error ||
      props.formStatus.submitting ||
      !!props.formStatus.emailError ||
      !!props.formStatus.passwordError;
    if (isFormFilled) {
      return false;
    } else if (checkOtherParameter) {
      return true;
    }
  };
  function submit() {
    props.setFormStatus({
      submitting: true,
      loading: true,
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
        localStorage.setItem("user", JSON.stringify(response));
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
          loading: false,
        });
      });
  }

  return (
    <form>
      <input
        type="email"
        placeholder="email"
        value={formData.email}
        onKeyUp={(e) => {
          if (!props.regex.emailRegex.test(e.target.value.toLowerCase())) {
            props.setFormStatus({
              ...props.formStatus,
              error: false,
              emailError: "Enter a valid email address",
              formTouched: true,
            });
          } else {
            props.setFormStatus({
              ...props.formStatus,
              formTouched: true,
              emailError: false,
              error: false,
            });
          }
          setFormData({ ...formData, email: e.target.value.toLowerCase() });
        }}
      />
      <div className="input-wrapper">
        <input
          type={passwordShow ? "text" : "password"}
          placeholder="password"
          value={formData.password}
          onKeyUp={(e) => {
            if (e.target.value.length < 6) {
              props.setFormStatus({
                ...props.formStatus,
                error: false,
                formTouched: true,
                passwordError: "Password should be 6 character long",
              });
            } else {
              props.setFormStatus({
                ...props.formStatus,
                formTouched: true,
                passwordError: false,
                error: false,
              });
            }
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <div
          className={`eye ${passwordShow ? "show" : ""}`}
          onClick={() => {
            setPasswordShow(!passwordShow);
          }}
        />
      </div>
      <div className="bottom-row signIn-form">
        <span
          className={`btn ${checkSignIn() ? "disable" : ""}`}
          onClick={submit}
        >
          SignIn
        </span>
        <span
          className="forgot-text"
          onClick={() => {
            props.changeForm("Forgot");
          }}
        >
          Forgot Password ?
        </span>
      </div>
      <p className="error">
        {props.formStatus.emailError
          ? props.formStatus.emailError
          : props.formStatus.passwordError
          ? props.formStatus.passwordError
          : props.formStatus.error
          ? props.formStatus.error
          : ""}
      </p>
    </form>
  );
}
