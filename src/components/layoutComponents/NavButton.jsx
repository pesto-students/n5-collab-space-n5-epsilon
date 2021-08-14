import Link from "next/link";
import { withRouter } from "next/router";
import Styles from "../../../styles/siteLayout.module.scss";

const NavButton = ({ path, icon, label, router }) => (
  <Link href={path}>
    <div
      className={`${Styles.NavButton} ${router.pathname === path ? "active" : ""}`}
    >
        {icon}
        <span className={Styles.NavButton.label}>{label}</span>
    </div>
  </Link>
);

export default withRouter(NavButton);
