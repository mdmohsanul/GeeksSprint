export type Project = {
  _id?: string;
  name?: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: "planning" | "active" | "completed";
  managerId?: {
    _id?: string;
    name?: string;
    email?: string;
  };
};

 
export type ProjectCreatePayload = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  teamSize: number;
  status: "active" | "completed" | "planning";
  managerId: string | undefined;
};

    