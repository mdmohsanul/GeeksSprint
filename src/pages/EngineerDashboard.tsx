import { TaskCard } from "@/components/Engineer/TaskCard";
import Header from "@/components/Header";
import useAssignmentStore from "@/store/useAssignmentStore";
import { useAuthStore } from "@/store/useAuthStore";
import type { Assignment } from "@/types/assignment";
import { useEffect } from "react";

const EngineerDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const assignments = useAssignmentStore((state) => state.assignments);
  const fetchAssignments = useAssignmentStore(
    (state) => state.fetchAssignments
  );

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const filterUserAssignments = assignments.filter(
    (assignment) => assignment?.engineerId._id === user?._id
  );
  console.log("Engineer Dashboard user:", user);
  console.log("Assignments:", filterUserAssignments);
  return (
    <>
      <Header content="Engineer Dashboard" />
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Assigned Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterUserAssignments.length > 0 &&
            filterUserAssignments.map((assignment: Assignment) => (
              <TaskCard key={assignment._id} assignment={assignment} />
            ))}
        </div>
      </div>
    </>
  );
};

export default EngineerDashboard;
