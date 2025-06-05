import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuthStore } from "@/store/useAuthStore";
import useProjectStore from "@/store/useProjectStore";
import { projectSchema, type ProjectFormData } from "@/lib/validators";
import type { Project } from "@/types/projects";

type Props = {
  project?: Project;
  setDialogOpen: (open: boolean) => void;
};

export default function ProjectForm({ project, setDialogOpen }: Props) {
  const { user } = useAuthStore((state) => state);
  const createProject = useProjectStore((state) => state.createProject);
  const updateProject = useProjectStore((state) => state.updateProject);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      status: "active",
      startDate: "",
      endDate: "",
      requiredSkills: "",
      teamSize: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        ...project,
        requiredSkills: Array.isArray(project.requiredSkills)
          ? project.requiredSkills.join(", ")
          : project.requiredSkills,
        managerId:
          typeof project.managerId === "object"
            ? project.managerId._id // <-- extract ID here
            : project.managerId,
      });
    }
  }, [project, reset]);

  const onSubmit = (data: ProjectFormData) => {
    const formattedData = {
      ...data,
      requiredSkills: data.requiredSkills.split(",").map((s) => s.trim()),
      managerId: user?._id,
    };

    if (project?._id) {
      updateProject(project._id, formattedData);
    } else {
      createProject(formattedData);
    }
    setDialogOpen(false);
  };

  return (
    <Card className="w-full mx-auto mt-6 shadow-xl">
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <Label>Project Name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Status</Label>
            <Select
              onValueChange={(val) =>
                setValue("status", val as "active" | "completed" | "planning")
              }
              defaultValue={project?.status ?? "active"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div>
            <Label>Start Date</Label>
            <Input type="date" {...register("startDate")} />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <Label>End Date</Label>
            <Input type="date" {...register("endDate")} />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label>Required Skills (comma separated)</Label>
            <Input
              placeholder="Node.js, NLP, MongoDB"
              {...register("requiredSkills")}
            />
            {errors.requiredSkills && (
              <p className="text-red-500 text-sm">
                {errors.requiredSkills.message}
              </p>
            )}
          </div>

          <div>
            <Label>Team Size</Label>
            <Input
              type="number"
              {...register("teamSize", { valueAsNumber: true })}
            />
            {errors.teamSize && (
              <p className="text-red-500 text-sm">{errors.teamSize.message}</p>
            )}
          </div>

          <div>
            <Label>Manager</Label>
            <Input value={user?.name} readOnly disabled className="bg-muted" />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full mt-2">
              {project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
