import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";



const Dashboard = () => {
  const navigate =useNavigate()
    const user = useAuthStore(state => state.user);
    console.log("Dashboard user:", user)
    useEffect(() => {
      if (user?.role === 'manager') {
        console.log("render")
        navigate('/dashboard/manager');
      } else if (user?.role === 'engineer') {
        navigate('/dashboard/engineer');
      } else {
        // Optional fallback
        alert('Unknown role');
      }
    },[user,navigate])
    return <>
    <Outlet/>
    </>
  // return (
  //  <>
  //   {user?.role === 'manager' && <ManagerDashboard />}
  //     {user?.role === 'engineer' && <EngineerDashboard />}
  //  </>
  // )
}

export default Dashboard