import { getLayout as getEmptyLayout } from "../src/components/layouts/EmptyLayout";
import styles from "../styles/Home.module.scss";
import React, { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import AuthAPI from "../src/client_apis/authApis";
import Link from "next/link";

export default function ResetPassword() {
  const router = useRouter();
  const token = cookie.get("token");

  if (token) {
    router.push("/workspace");
  }

  const [submittedForm, setSubmittedForm] = useState({
    formTouched: false,
    error: false,
    submitting: false,
  });
  const [newPassword, setNewPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState({
    input1: false,
    input2: false,
  });
  const [resetComplete, setResetComplete] = useState(true);

  const regex = {
    passwordRegex:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ !"#\$%&'\(\)*+,-./:;<=>?@\[\\\]^_`{|}~]).{8,}$/,
  };
  const Auth = new AuthAPI();

  function submit() {
    const url = new URL(window.location);
    const key = url.searchParams.get("token");

    setSubmittedForm({
      submitting: true,
    });
    Auth.resetPassword({
      token: key,
      password: newPassword,
    })
      .then(() => {
        setSubmittedForm({
          error: false,
          submitting: false,
        });
        setResetComplete(true);
      })
      .catch((error) => {
        setSubmittedForm({
          ...submittedForm,
          error: error.response.data,
          submitting: false,
        });
      });
  }

  return (
    <section className="auth-container active">
      <div className="top">
        <span className="feature-image" />
        <span className="feature-image" />
      </div>
      <div className="bottom">
        <span className="feature-image" />
        <span className="feature-image" />
      </div>
      <div className="center">
        <div className={styles.container}>
          <div className="content-wrapper">
            <h1>Reset Password</h1>
            <p>New Password</p>
            <div className="input-wrapper">
              <input
                type={passwordShow.input1 ? "text" : "password"}
                onKeyUp={(e) => {
                  if (
                    !regex.passwordRegex.test(e.target.value) &&
                    e.target.value.length
                  ) {
                    setSubmittedForm({
                      ...submittedForm,
                      error: "Enter a valid name",
                    });
                  } else {
                    setSubmittedForm({
                      ...submittedForm,
                      error: false,
                      formTouched: true,
                    });
                  }
                  setNewPassword(e.target.value);
                }}
              />
              <div
                className={`eye ${passwordShow.input1 ? "show" : ""}`}
                onClick={() => {
                  setPasswordShow({
                    ...passwordShow,
                    input1: !passwordShow.input1,
                  });
                }}
              />
            </div>
            <p>Retype New Password</p>
            <div className="input-wrapper">
              <input
                type={passwordShow.input2 ? "text" : "password"}
                onKeyUp={(e) => {
                  setCopyPassword(e.target.value);
                }}
              />
              <div
                className={`eye ${passwordShow.input2 ? "show" : ""}`}
                onClick={() => {
                  setPasswordShow({
                    ...passwordShow,
                    input2: !passwordShow.input2,
                  });
                }}
              />
            </div>
            <p
              className={`error-space ${
                submittedForm.error || copyPassword !== newPassword
                  ? "error"
                  : ""
              }`}
            >
              {submittedForm.error
                ? submittedForm.error
                : copyPassword === newPassword
                ? "Atleast 8 characters, one lower case character, one upper case character, one number and one special character."
                : "Both password does not match"}
            </p>
            <span
              onClick={submit}
              className={`btn ${
                !submittedForm.formTouched ||
                submittedForm.error ||
                copyPassword !== newPassword ||
                submittedForm.submitting ||
                !newPassword.length
                  ? "disable"
                  : ""
              }`}
            >
              Update Password
            </span>

            {resetComplete && (
              <div className="final-message">
                You password has been reset.
                <br />
                Please SignIn with your new password.
                <Link href="/auth">
                  <a className="btn"> SignIn </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

ResetPassword.getLayout = getEmptyLayout;
