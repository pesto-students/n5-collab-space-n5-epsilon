import React from "react";
import ProjectIcon from "../iconComponents/ProjectIcon";
import SettingIcon from "../iconComponents/SettingIcon";
import UserIcon from "../iconComponents/UserIcon";
const navButtons = [
  {
    label: "Projects",
    path: "/workspace",
    icon: <ProjectIcon height="50pt" width="50pt" />,
    child: {},
  },
  {
    label: "User Panel",
    path: "/workspace/user-panel",
    icon: <UserIcon />,
  },
  {
    label: "Settings",
    path: "/workspace/setting",
    icon: <SettingIcon />,
  },
];

export default navButtons;
