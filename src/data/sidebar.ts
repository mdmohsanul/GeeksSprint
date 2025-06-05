import { RxDashboard } from "react-icons/rx";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";


type SidebarItem = {
  id: number;
  name: string;
  linkIcon: React.ElementType;
  linkTo: string;
};

export const sidebarList: SidebarItem[] = [
  {
    id: 1,
    name: "Team",
    linkIcon: RxDashboard,
    linkTo: "/dashboard/manager",
  },
  {
    id: 2,
    name: "Projects",
    linkIcon: GoProjectSymlink,
    linkTo: "/dashboard/manager/projects",
  },
  {
    id: 3,
    name: "Assignments",
    linkIcon: HiOutlineUserGroup,
    linkTo: "/dashboard/manager/assignments",
  },
  
];
