import SignUpForm from "@/components/authentication/SignUpForm"
import SignUpSuccess from "@/components/authentication/SignUpSuccess"
import { useState } from "react";
import { Link } from "react-router-dom"

const SignUpPage = () => {
     const [showPopup, setShowPopup] = useState<boolean>(false);
  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* <img src={Fotive} alt="logo" loading="lazy" className="pt-3" /> */}
        <h1 className="text-4xl text-stone-900">GeeksSprint</h1>
        <div className="md:max-w-2/3 mx-w-md mx-auto  border border-gray-200 rounded-md p-7 shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-5">
          <h1 className="text-3xl text-gray-900 text-start pb-5 font-medium">
            Sign up
          </h1>
          <SignUpForm setShowPopup={setShowPopup} />
        </div>
        <p className="text-center">
          <span>Already Registered? </span>
          <Link
            to="/login"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Log in now
          </Link>
        </p>
      </div>
      {showPopup && <SignUpSuccess />}
    </>
  );
}

export default SignUpPage