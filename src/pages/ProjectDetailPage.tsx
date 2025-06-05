import { useParams } from "react-router-dom"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useProjectStore from "@/store/useProjectStore";
import ProjectForm from "@/components/Project/ProjectForm";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectDetailPage = () => {
  const { projectId } = useParams(); // get paramId from URL

  const [dialogOpen, setDialogOpen] = useState(false);
  const projects = useProjectStore((state) => state.projects);
console.log("ProjectDetailPage projects:", projects);
  const project = projects?.find((p) => p._id === projectId);
const handleCreateClick = () => {
    setDialogOpen(true);
}
  if (!project) {
    return <p className="text-center mt-10 text-xl text-red-500">Project not found.</p>;
  }


  const {
    name,
    description,
    startDate,
    endDate,
    requiredSkills,
    teamSize,
    status,
    managerId,
  
  } = project;

  return (
    <Card className="w-11/12 max-w-3xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">{name}</h2>

        <p className="text-gray-700">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">Start Date:</span> {new Date(startDate).toLocaleDateString()}</p>
            <p><span className="font-semibold">End Date:</span> {new Date(endDate).toLocaleDateString()}</p>
          </div>

          <div>
            <p><span className="font-semibold">Team Size:</span> {teamSize}</p>
            <p><span className="font-semibold">Status:</span> <Badge>{status}</Badge></p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Required Skills:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold">Manager:</p>
          <p>{managerId?.name} ({managerId?.email})</p>
        </div>
 <Button onClick={handleCreateClick}>
          <Plus className="w-4 h-4 mr-2" /> Update Project
        </Button>
<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
             
            </DialogTitle>
          </DialogHeader>
        <ProjectForm project={project} />
        </DialogContent>
      </Dialog>

        {/* <div className="text-sm text-gray-500">
          <p>Created: {new Date(createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(updatedAt).toLocaleString()}</p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ProjectDetailPage;
