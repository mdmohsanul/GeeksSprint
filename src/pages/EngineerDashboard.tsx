import Header from "@/components/Header";
import { useAuthStore } from "@/store/useAuthStore";


const EngineerDashboard = () => {
      const user = useAuthStore(state => state.user);
      console.log("EngineerDashboard user:", user)
  return (
    <>
    <Header content="Engineer Dashboard"/>
    </>
  
  )
}

export default EngineerDashboard