import AuthAPI from "../../client_apis/authApis";

import { useState } from "react";

export default function ForgotPasswordForm(props) {
  const Auth = new AuthAPI();
  const [formData, setFormData] = useState({
    password: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  // const [form]

  function submit() {
    props.setFormStatus({
      submitting: true,
    });
    Auth.forgotPassword(formData)
      .then(() => {
        props.setFormStatus({
          error: false,
          submitting: false,
        });
          setEmailSent(true);
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
    <form className={`${emailSent ? "sent" : ""}`}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        onKeyUp={(e) => {
            if (!props.regex.emailRegex.test(e.target.value.toLowerCase())) {
              props.setFormStatus({
                ...props.formStatus,
                error: "Enter a valid email address",
              });
            } else {
              setFormData({ ...formData, email: e.target.value });
              props.setFormStatus({
                ...props.formStatus,
                formTouched: true,
                error: false,
              });
            }
        }}
      />
      <div className="bottom-row forgot-password">
        <span
          className={`btn`}
          onClick={() => {
            props.changeForm("SignIn");
          }}
        >
          SignIn
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
          Forgot Password
        </span>
      </div>
        {emailSent && <div className="forgot-message">
        An email has been sent to your registered mail to reset the password
      </div>}
    </form>
  );
}
