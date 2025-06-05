import useAssignmentStore from "@/store/useAssignmentStore";
import useManagerStore from "@/store/useManagerStore";

const useGetCapacity = () => {
  const engineers = useManagerStore((state) => state.engineers);
  const assignments = useAssignmentStore((state) => state.assignments);

  function getEngineer(engineerId: string) {
    return engineers.find((e) => e._id === engineerId);
  }

  function getActiveAssignments(engineerId: string) {
    return assignments.filter(
      (a) => a.engineerId._id === engineerId 
    );
  }

  function getAvailableCapacity(engineerId: string) {
    const engineer = getEngineer(engineerId);
    if (!engineer) return 0;
    const activeAssignments = getActiveAssignments(engineerId);
    const totalAllocated = activeAssignments.reduce(
      (sum, a) => sum + a.allocationPercentage,
      0
    );
    return engineer.maxCapacity - totalAllocated;
  }

  const engineersWithCapacity = engineers.map((engineer) => {
    const remaining = getAvailableCapacity(engineer._id);
    const allocated = engineer.maxCapacity - remaining;
    const allocatedPercentage = ((allocated / engineer.maxCapacity) * 100).toFixed(0);

    return {
      ...engineer,
      availableCapacity: `${allocatedPercentage}% allocated`,
    };
  });

  return engineersWithCapacity;
};

export default useGetCapacity;
