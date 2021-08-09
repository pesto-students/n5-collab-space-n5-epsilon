import React from "react";
import NavButton from "./NavButton";
import Styles from "../../../styles/siteLayout.module.scss";
import { useRouter } from 'next/router'

const SideNav = ({ navButtons }) => {
  const router = useRouter()
  return (
    <div className={Styles.sidelayoutpanel}>
      <ul className={Styles.sidenavStaticList}>
        {navButtons.map((button, index) => {
          return (
            <li key={index}>
              <NavButton
                path={button.path}
                icon={button.icon}
                label={button.label}
                router = {router}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
