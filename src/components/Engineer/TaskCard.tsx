import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

import { format } from "date-fns"
import type { Assignment } from "@/types/assignment"
import { Link } from "react-router-dom";

interface AssignmentCardProps {
  assignment: Assignment;
 
}

export const TaskCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const {
    _id,
    role,
    allocationPercentage,
    startDate,
    endDate,
    engineerId,
    projectId,
  } = assignment

  return (
    
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">{projectId.name}</h3>
        <p className="text-sm text-muted-foreground">Status: {projectId.status}</p>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Engineer:</span> {engineerId.name} ({engineerId.email})
        </p>
        <p>
          <span className="font-medium">Role:</span> {role}
        </p>
        <p>
          <span className="font-medium">Allocation:</span> {allocationPercentage}%
        </p>
        <p>
          <span className="font-medium">Duration:</span>{" "}
          {format(new Date(startDate), "dd MMM yyyy")} - {format(new Date(endDate), "dd MMM yyyy")}
        </p>
      </CardContent>

      <CardFooter>
        <Link to={`/dashboard/engineer/assignment/${_id}`} className="rounded-md px-3 py-2 cursor-pointer bg-gray-800 text-white">View Details</Link>
      </CardFooter>
    </Card>
  )
}
