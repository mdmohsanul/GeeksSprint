 

// export type Assignment = {
//   _id?: string; // Optional for new assignments
//   engineerId: string; // ID of the engineer
//   projectId: string; // ID of the project
//   role: string; // Role of the engineer
//   allocationPercentage: number; // Allocation percentage
//   startDate: string; // Start date
//   endDate: string; // End date
// };
export interface Assignment {
  _id?: string;
  engineerId: {
    _id: string;
    name: string;
    email: string;
  };
  projectId: {
    _id: string;
    name: string;
    status: string;
  };
  role: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
}
