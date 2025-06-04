import { Link} from "react-router-dom";
import LoginForm from "@/components/authentication/LogInForm";

const LoginPage = () => {
  
  return (
     <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl text-stone-900">GeeksSprint</h1>
        <div className="max-w-md mx-auto  border border-gray-200 rounded-md p-7 shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-5">
          <h1 className="text-3xl text-gray-900 text-start pb-5 font-medium">
            Sign in
          </h1>
          <LoginForm />
          <div className="flex items-center gap-4 text-gray-500 text-sm py-5">
            <div className="flex-1 border-t border-gray-300" />
            <span className="uppercase">or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          
        </div>
        <p className="text-center pb-5">
          <span>New to Fotive? </span>
          <Link
            to="/signup"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
  )
}

export default LoginPage