import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "../ui/button";
import type { Assignment } from "@/types/assignment";

interface AssignmentCardProps {
  assignment: Assignment;
    setDialogOpen: (open: boolean) => void;
    setEditAssignment: (assignment: Assignment | null) => void;
}
export default function AssignmentCard({ assignment, setDialogOpen, setEditAssignment }: AssignmentCardProps) {
  const {
    engineerId: engineer,
    projectId: project,
    role,
    allocationPercentage,
    startDate,
    endDate,
  } = assignment;
 const handleEdit = (assignment:Assignment) => {
    setEditAssignment(assignment);
    setDialogOpen(true);
  };
  return (
    <Card className="w-full max-w-md shadow-md border border-muted">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{project?.name || "Unnamed Project"}</span>
          <Badge variant="outline" className="text-sm capitalize">{project?.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <div>
          <strong>Engineer:</strong> {engineer?.name} ({engineer?.email})
        </div>
        <div>
          <strong>Role:</strong> {role}
        </div>
        <div>
          <strong>Allocation:</strong> {allocationPercentage}%
        </div>
        <div className="flex gap-4">
          <div>
            <strong>Start:</strong>{" "}
            {startDate ? format(new Date(startDate), "MMM dd, yyyy") : "-"}
          </div>
          <div>
            <strong>End:</strong>{" "}
            {endDate ? format(new Date(endDate), "MMM dd, yyyy") : "-"}
          </div>
        </div>
         <Button
                variant="secondary"
                className="mt-2"
                onClick={() => handleEdit(assignment)}
              >
                Update
              </Button>
      </CardContent>
    </Card>
  );
}
