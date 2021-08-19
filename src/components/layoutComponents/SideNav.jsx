import React from "react";
import NavButton from "./NavButton";
import { useRouter } from "next/router";
import Link from "next/link";

const SideNav = ({ navButtons }) => {
  const router = useRouter();
  return (
    <div className='sideLayoutPanel'>
        <img src='/logo.png' alt='logo'/>
        <div className='side-wrapper'>
        <ul className='sideNavStaticList'>
        {navButtons.map((button, index) => {
          return (
            <li key={index}>
              <NavButton
                path={button.path}
                icon={button.icon}
                label={button.label}
                router={router}
              />
            </li>
          );
        })}
      </ul>

            <Link href={'/auth'}>
            <a className='LogButton'><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4l5 4v-3z" fill="#6d6d73"/><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" fill="#6d6d73"/></svg>
            Log Out
            </a>
        </Link>
        </div>

    </div>
  );
};

export default SideNav;
