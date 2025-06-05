import { sidebarList } from "../../data/sidebar";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Sidebarr = () => {
  return (
    <>
      <div className="w-64 h-screen bg-gray-800 text-white p-4">
        <ul className="  text-lg text-gray-800 ">
          {sidebarList.map((item) => (
            <Link to={item.linkTo} key={item.id}>
              {" "}
              <li
                className={`flex items-center justify-between py-3  cursor-pointer `}
              >
                <p className="pl-10 text-white">{item.name}</p>{" "}
                <span className="mr-6">
                  <IoIosArrowForward />
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebarr;
