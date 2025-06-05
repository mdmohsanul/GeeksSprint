import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { assignmentSchema, type AssignmentFormData } from "@/lib/validators";
import useManagerStore from "@/store/useManagerStore";
import useProjectStore from "@/store/useProjectStore";

type AssignmentFormProps = {
  onSubmit: (data: AssignmentFormData) => void;
  defaultValues?: Partial<AssignmentFormData>;
  mode: "create" | "update";
};

export default function AssignmentForm({
  onSubmit,
  defaultValues = {},
  mode = "create",
}: AssignmentFormProps) {
  const form = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      engineerId: "",
      projectId: "",
      role: "",
      allocationPercentage: 0,
      startDate: "",
      endDate: "",
      ...defaultValues,
    },
  });
  console.log("AssignmentForm defaultValues:", defaultValues);
  const engineers = useManagerStore((state) => state.engineers);
  const projects = useProjectStore((state) => state.projects);

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      form.reset({
        ...defaultValues,
        allocationPercentage: Number(defaultValues.allocationPercentage || 0),
      });
    }
  }, [defaultValues, form]);

  const roles = [
    "Developer",
    "Tech Lead",
    "QA",
    "Project Manager",
    "UX Designer",
    "Other",
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          onSubmit({
            ...data,
            allocationPercentage: data.allocationPercentage,
          })
        )}
        className="grid gap-4 w-full mx-auto mt-8"
      >
        <FormField
          control={form.control}
          name="engineerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engineer</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select engineer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {engineers.length > 0 &&
                    engineers.map((e) => (
                      <SelectItem key={e._id} value={e._id}>
                        {e.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.length > 0 && (
                    <>
                      {projects.map((p) => (
                        <SelectItem key={p._id} value={p._id as string}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allocationPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="50"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4">
          {mode === "update" ? "Update Assignment" : "Create Assignment"}
        </Button>
      </form>
    </Form>
  );
}
