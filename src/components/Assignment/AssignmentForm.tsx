// AssignmentForm.tsx
import useAssignmentStore from "@/store/useAssignmentStore";
import useManagerStore from "@/store/useManagerStore";
import useProjectStore from "@/store/useProjectStore";

import { useForm } from "react-hook-form";

const roles = [
  "Developer",
  "Tech Lead",
  "QA",
  "Project Manager",
  "UX Designer",
  "Other",
];

type AssignmentFormData = {
  engineerId: string;
  projectId: string;
  role: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
};

export const AssignmentForm = () => {
  const engineers = useManagerStore((state) => state.engineers);
  const projects = useProjectStore((state) => state.projects);
  const createAssignment = useAssignmentStore(
    (state) => state.createAssignment
  );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AssignmentFormData>();

  const onSubmit = (data: AssignmentFormData) => {
    console.log("Assignment Data:", data);
    createAssignment({
      ...data,
      allocationPercentage: parseInt(data.allocationPercentage.toString()),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto p-4 bg-white  rounded space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Engineer Select */}
        <div>
          <label className="block mb-1 font-medium">Engineer</label>
          <select
            {...register("engineerId", { required: "Engineer is required" })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Engineer</option>
            {engineers.map((eng) => (
              <option key={eng._id} value={eng._id}>
                {eng.name}
              </option>
            ))}
          </select>
          {errors.engineerId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.engineerId.message}
            </p>
          )}
        </div>

        {/* Project Select */}
        <div>
          <label className="block mb-1 font-medium">Project</label>
          <select
            {...register("projectId", { required: "Project is required" })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Project</option>
            {projects.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.name}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.projectId.message}
            </p>
          )}
        </div>

        {/* Role Select */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
        {/* Allocation Percentage */}
        <div>
          <label className="block mb-1 font-medium">Allocation (%)</label>
          <input
            type="number"
            {...register("allocationPercentage", {
              required: "Allocation percentage is required",
              min: { value: 1, message: "Minimum is 1%" },
              max: { value: 100, message: "Maximum is 100%" },
            })}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 50"
          />
          {errors.allocationPercentage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.allocationPercentage.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            {...register("startDate", {
              required: "Start date is required",
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            {...register("endDate", {
              required: "End date is required",
              validate: (value) => {
                const startDate = getValues("startDate");
                return (
                  !startDate ||
                  value >= startDate ||
                  "End date must be after start date"
                );
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AssignmentForm;
