import Header from "@/components/Header";
import Sidebarr from "@/components/Sidebar/Sidebarr";
import { useAuthStore } from "@/store/useAuthStore";
import useManagerStore from "@/store/useManagerStore";
import useProjectStore from "@/store/useProjectStore";
import useGetCapacity from "@/utils/getCapacity";

import { useEffect } from "react";

const ManagerDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const engineers = useManagerStore((state) => state.engineers);

  console.log("ManagerDashboard user:", user);
  console.log("ManagerDashboard engineers:", engineers);

  const fetchEngineers = useManagerStore((state) => state.fetchEngineers);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  useEffect(() => {
    fetchEngineers();
    fetchProjects();
  }, [fetchEngineers, fetchProjects]);

  const engineersWithCapacity = useGetCapacity;
  console.log("Engineers with capacity:", engineersWithCapacity);
  return (
    <>
      <div className="">
        <Header content="Manager Dashboard" />
        <div className="relative w-full">
          <Sidebarr />
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard