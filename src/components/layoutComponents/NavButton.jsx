import Link from "next/link";
import { withRouter } from "next/router";
import Styles from "../../../styles/siteLayout.module.scss";

const NavButton = ({ path, icon, label, router }) => (
  <Link href={path}>
    <div
      className={`NavButton ${router.pathname === path ? "active" : ""}`}
    >
        {icon}
        <span className='label'>{label}</span>
    </div>
  </Link>
);

export default withRouter(NavButton);
