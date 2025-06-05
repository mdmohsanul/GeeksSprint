import AssignmentCard from "@/components/Assignment/AssignmentCard";
import AssignmentForm from "@/components/Assignment/AssignmentForm";
import useAssignmentStore from "@/store/useAssignmentStore";
import useManagerStore from "@/store/useManagerStore";
import useProjectStore from "@/store/useProjectStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { Assignment } from "@/types/assignment";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

const AssignmentPage = () => {
  const fetchEngineers = useManagerStore((state) => state.fetchEngineers);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  const fetchAssignments = useAssignmentStore(
    (state) => state.fetchAssignments
  );
  const assignments = useAssignmentStore((state) => state.assignments);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editAssignment, setEditAssignment] = useState<Assignment | null>(null);

  console.log("Assignments:", assignments);
  useEffect(() => {
    fetchEngineers();
    fetchProjects();
    fetchAssignments();
  }, [fetchEngineers, fetchProjects, fetchAssignments]);

  const handleCreateClick = () => {
    setEditAssignment(null);
    setDialogOpen(true);
  };
  return (
    <>
      <Header content="Assignments" />

      <section className="max-w-5xl mx-auto pt-16">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Assignments</h1>
            <Button onClick={handleCreateClick}>
              <Plus className="w-4 h-4 mr-2" /> Create Assignment
            </Button>
          </div>
          <BackButton />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                setDialogOpen={setDialogOpen}
                setEditAssignment={setEditAssignment}
              />
            ))}
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editAssignment ? "Update Assignment" : "Create Assignment"}
                </DialogTitle>
              </DialogHeader>
              <AssignmentForm />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default AssignmentPage;
