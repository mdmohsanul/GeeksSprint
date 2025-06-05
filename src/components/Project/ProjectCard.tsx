import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, User } from "lucide-react";
import { Link } from "react-router-dom"; //
import { format } from "date-fns";
import type { Project } from "@/types/projects";

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    console.log("ProjectCard project:", project);
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{project.name}</h2>
          <Badge variant="outline" className="capitalize">
            {project.status}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.requiredSkills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-sm gap-3 text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {format(new Date(project.startDate), "MMM d, yyyy")}
            {" - "}
            {format(new Date(project.endDate), "MMM d, yyyy")}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {project.teamSize}
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {project?.managerId?.name}
          </div>
        </div>

        <Link to={`/dashboard/manager/projects/${project._id}`}>
          <Button className="w-full mt-3">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
