import { sidebarList } from "../../data/sidebar";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Sidebarr = () => {
  return (
    <>
      <div className="fixed top-16 left-0 w-64 h-screen bg-gray-800 text-white p-4 z-40">
        <ul className="text-lg text-gray-800">
          {sidebarList.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-3 cursor-pointer"
            >
              <Link
                to={item.linkTo}
                className="flex w-full items-center justify-between px-4 text-white"
              >
                <p>{item.name}</p>
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebarr;
