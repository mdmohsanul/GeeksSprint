import type { EngineerWithCapacity } from "@/components/Engineer/EngineerCard";
import type { Assignment } from "@/types/assignment";
import type { EngineerData } from "@/types/user";
import { useMemo } from "react";

export const useEngineersWithCapacity = (
  engineers: EngineerData[],
  assignments: Assignment[]
): EngineerWithCapacity[] => {

  
  return useMemo(() => {
    const now = new Date();

    return engineers.map((engineer) => {
      const activeAssignments = assignments.filter(
        (assignment) =>
          assignment.engineerId._id === engineer._id &&
          new Date(assignment.startDate) <= now &&
          new Date(assignment.endDate) >= now
      );

      const currentLoad = activeAssignments.reduce(
        (sum, a) => sum + a.allocationPercentage,
        0
      );

      const availableCapacity = engineer.maxCapacity - currentLoad;

      const utilization = ((currentLoad / engineer.maxCapacity) * 100).toFixed(1) + "%";

      let status: "Optimal" | "Underutilized" | "Overloaded";
      if (currentLoad === engineer.maxCapacity) status = "Optimal";
      else if (currentLoad < engineer.maxCapacity) status = "Underutilized";
      else status = "Overloaded";

      // ✅ Spread all properties from engineer
      return {
        ...engineer,
        currentLoad,
        availableCapacity,
        utilization,
        status,
      };
    });
  }, [engineers, assignments]);
};

