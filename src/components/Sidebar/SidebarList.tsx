
import { sidebarList } from "../../data/sidebar";
import { Link } from "react-router";
import { IoIosArrowForward } from "react-icons/io";

type SidebarListProps = {
  activeStatus: string; // The currently active sidebar item
  setActiveStatus: (status: string) => void; // Function to set the active status
  setNav: (nav: boolean) => void; // Function to set the navigation state
};

const Sidebar_List = ({ activeStatus, setActiveStatus, setNav }: SidebarListProps) => {
  return (
    <>
      <ul className=" pt-14 text-lg text-gray-800 ">
        {sidebarList.map((item) => (
          <Link to={`/${item.linkTo}`} key={item.id}>
            {" "}
            <li
              onClick={() => {
                setActiveStatus(item.name);
                setNav(false);
              }}
              className={`flex items-center justify-between py-3  cursor-pointer 
                ${
                  activeStatus === item.name
                    ? "bg-white text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-400"
                }
                `}
            >
              <p className="pl-10">{item.name}</p>{" "}
              <span className="mr-6">
                <IoIosArrowForward />
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Sidebar_List;
