import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";

type HeaderProps = {
  content?: string;
};
const Header = ({ content }: HeaderProps) => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <>
      <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-2 md:px-8 ">
        <h1 className="text-lg md:text-2xl font-bold">{content}</h1>
        <div className=" flex items-center gap-4">
          <button
            className="bg-gray-300 text-gray-900 text-sm md:px-3 md:py-2 px-2 py-1 rounded-md font-medium cursor-pointer"
            onClick={() => logout()}
          >
            Logout
          </button>
          <Link
            to=""
            className="bg-gray-300 text-gray-900 text-sm md:px-3 md:py-2 px-2 py-1 rounded-md font-medium cursor-pointer"
            onClick={() => logout()}
          >
            Logout
          </Link>
          <img
            src="https://res.cloudinary.com/dkidipx7j/image/upload/v1747821647/istockphoto-1495088043-612x612-removebg-preview_mv3akq.webp"
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
