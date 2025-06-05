import EngineerCard from "@/components/Engineer/EngineerCard";
import Header from "@/components/Header";
import Sidebarr from "@/components/Sidebar/Sidebarr";
import useAssignmentStore from "@/store/useAssignmentStore";

import useManagerStore from "@/store/useManagerStore";
import useProjectStore from "@/store/useProjectStore";

import { useEngineersWithCapacity } from "@/utils/useEngineersWithCapacity";

import { useEffect } from "react";

const ManagerDashboard = () => {
  const fetchEngineers = useManagerStore((state) => state.fetchEngineers);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const fetchAssignments = useAssignmentStore(
    (state) => state.fetchAssignments
  );
  const engineers = useManagerStore((state) => state.engineers);
  const assignments = useAssignmentStore((state) => state.assignments);
  console.log(assignments, "Assignments in ManagerDashboard");
  useEffect(() => {
    fetchEngineers();
    fetchProjects();
    fetchAssignments();
  }, [fetchEngineers, fetchProjects, fetchAssignments]);

  const engineersWithCapacity = useEngineersWithCapacity(
    engineers,
    assignments
  );
  console.log("Engineers with capacity:", engineersWithCapacity);
  return (
    <>
      <div className="relative w-full min-h-screen">
        <Header content="Manager Dashboard" />
        <Sidebarr />

        <div className=" pl-64 relative w-full pt-20">
          {engineersWithCapacity.length > 0 && (
            <div className="grid grid-cols-1  md:grid-cols-2  gap-6 p-6">
              {engineersWithCapacity.map((engineer) => (
                <EngineerCard key={engineer._id} engineer={engineer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
