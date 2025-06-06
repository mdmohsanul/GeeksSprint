export type User = {
  _id?: string;
  email: string;
  name: string;
  role: "engineer" | "manager";
  skills?: string[]; // Only for engineers
  seniority?: "junior" | "mid" | "senior"; // Only for engineers
  maxCapacity?: number; // Only for engineers, 100 for full-time, 50 for part-time
  department?: string; // Only for engineers
};

export type EngineerData = {
  _id: string;
  name: string;
  skills: string[];
  department: string;
  maxCapacity: number;
  currentLoad: number;
  utilization: string; // Percentage as a string
  email: string;
  status: "Overloaded" | "Underutilized" | "Optimal";
};

export type Engineer = {
  _id: string;
  name: string;
  email: string;
  role: string;
  seniority: string;
  department: string;
  skills: string[];
  maxCapacity: number;
  availableCapacity: number;
  createdAt: string;
  updatedAt: string;
};