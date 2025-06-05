import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useAssignmentStore from "@/store/useAssignmentStore";
import { Button } from "@/components/ui/button";
import { FaArrowCircleLeft } from "react-icons/fa";


function EngineerAssignmentPage() {
  const { assignmentId } = useParams();
  const assignments = useAssignmentStore((state) => state.assignments);
  const currentAssignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );

  if (!currentAssignment) {
    return <div className="p-6 text-red-500">Assignment not found.</div>;
  }
  console.log("EngineerAssignmentPage currentAssignment:", currentAssignment);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => window.history.back()}
      >
        <FaArrowCircleLeft className="mr-2" /> Back
      </Button>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Assignment Details</h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Engineer</h4>
            <p>{currentAssignment.engineerId.name}</p>
            <p className="text-sm text-muted-foreground">
              {currentAssignment.engineerId.email}
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Project</h4>
            <p>{currentAssignment.projectId.name}</p>
            <Badge variant="outline">
              {currentAssignment.projectId.status}
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold">Role in Project</h4>
            <p>{currentAssignment.role}</p>
          </div>

          <div>
            <h4 className="font-semibold">Allocation %</h4>
            <p>{currentAssignment.allocationPercentage}%</p>
          </div>

          <div>
            <h4 className="font-semibold">Start Date</h4>
            <p>{new Date(currentAssignment.startDate).toLocaleDateString()}</p>
          </div>

          {/* <div>
            <h4 className="font-semibold">End Date</h4>
            <p>{new Date(currentAssignment.endDate).toLocaleDateString()}</p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default EngineerAssignmentPage;
