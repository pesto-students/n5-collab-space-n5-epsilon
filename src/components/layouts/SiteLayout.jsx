import React from "react";
import SideNav from "../layoutComponents/SideNav";
import Style from "../../../styles/siteLayout.module.scss";
import navButtons from "./config/NavButtonConfig";

const SiteLayout = ({ children }) => {
  return (
    <div className={Style.siteLayout}>
      <SideNav navButtons={navButtons} />
      {children}
    </div>
  );
};

export const getLayout = (page) => <SiteLayout isSideNavBar>{page}</SiteLayout>;

export default SiteLayout;
