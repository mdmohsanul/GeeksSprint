import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "../ui/button";
import type { Assignment } from "@/types/assignment";
import useAssignmentStore from "@/store/useAssignmentStore";

interface AssignmentCardProps {
  assignment: Assignment;
  setDialogOpen: (open: boolean) => void;
  setEditAssignment: (assignment: Assignment | null) => void;
}
export default function AssignmentCard({
  assignment,
  setDialogOpen,
  setEditAssignment,
}: AssignmentCardProps) {
  const {
    engineerId: engineer,
    projectId: project,
    role,
    allocationPercentage,
    startDate,
    endDate,
  } = assignment;
  const deleteAssignment = useAssignmentStore(
    (state) => state.deleteAssignment
  );
  const handleEdit = (assignment: Assignment) => {
    setEditAssignment(assignment);
    setDialogOpen(true);
  };
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      await deleteAssignment(id);
    }
  };
  return (
    <Card className="w-full max-w-md shadow-md border border-muted">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{project?.name || "Unnamed Project"}</span>
          <Badge variant="outline" className="text-sm capitalize">
            {project?.status}
          </Badge>
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
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => handleEdit(assignment)}
          >
            Update
          </Button>
          <Button
            variant="secondary"
            className="mt-2 bg-red-500 hover:bg-red-600 text-white"
            onClick={() => handleDelete(assignment._id || "")}
          >
            Delete
          </Button>{" "}
        </div>
      </CardContent>
    </Card>
  );
}
