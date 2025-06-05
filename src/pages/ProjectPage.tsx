import ProjectCard from "@/components/Project/ProjectCard";
import ProjectForm from "@/components/Project/ProjectForm";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import useProjectStore from "@/store/useProjectStore"
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 

import BackButton from "@/components/BackButton";
import Header from "@/components/Header";

const ProjectPage = () => {
  const projects = useProjectStore((state) => state.projects);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const { user } = useAuthStore((state) => state);
  const [dialogOpen, setDialogOpen] = useState(false);

  console.log("ProjectPage user:", user);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  const handleCreateClick = () => {
    setDialogOpen(true);
  };
  return (
    <>
      <Header content="Projects" />

      <section className="max-w-5xl mx-auto ">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Projects</h1>
            <Button onClick={handleCreateClick}>
              <Plus className="w-4 h-4 mr-2" /> Create Project
            </Button>
          </div>
          <BackButton />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
              </DialogHeader>
              <ProjectForm setDialogOpen={setDialogOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default ProjectPage