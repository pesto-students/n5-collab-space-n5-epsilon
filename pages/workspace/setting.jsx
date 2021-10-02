import { getLayout as getSiteLayout } from "../../src/components/layouts/SiteLayout";
import WorkSpaceTitle from "../../src/components/workspace/WorkSpaceTitle";
import React, { useState } from "react";
import Image from "next/image";
import AuthAPI from "../../src/client_apis/authApis";
import Spinner from "../../src/components/common/contentLoader/spinningCircleLoader";
import ChangePasswordComponent from "../../src/components/settingComponents/ChangePasswordComponent";
import ChangeWorkSpaceNameComponent from "../../src/components/settingComponents/ChangeWorkSpaceNameComponent";

const Setting = () => {
  const [tab, setTab] = useState("password");
  const [submittedForm, setSubmittedForm] = useState({
    formTouched: false,
    error: false,
    submitting: false,
  });
  return (
    <div className="mainContainerBody">
      <WorkSpaceTitle title="Workspace Name" />
      <section className="settings-tab">
        <div className="tab-list">
          <span
            onClick={() => {
              setTab("workspace");
            }}
            className={`${tab === "workspace" ? "active" : ""}`}
          >
            <Image
              src="https://api.iconify.design/icon-park-outline/edit-name.svg"
              alt="name"
              width="15"
              height="15"
            />
            change workspace name
          </span>
          <span
            onClick={() => {
              setTab("password");
            }}
            className={`${tab === "password" ? "active" : ""}`}
          >
            <Image
              src="https://api.iconify.design/teenyicons/password-outline.svg"
              alt="lock"
              width="15"
              height="15"
            />
            change password
          </span>
        </div>
        <div className="tab-container">
          {tab === "password" && (
            <ChangePasswordComponent
              submittedForm={submittedForm}
              setSubmittedForm={setSubmittedForm}
            />
          )}
          {tab === "workspace" && <ChangeWorkSpaceNameComponent />}
        </div>
      </section>
      {submittedForm.submitting && <Spinner />}
    </div>
  );
};

Setting.getLayout = getSiteLayout;

export default Setting;
