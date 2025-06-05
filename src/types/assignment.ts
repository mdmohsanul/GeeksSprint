 

export interface Assignment {
  _id?: string;
  engineerId: {
    _id: string;
    name: string;
    email?: string;
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
  createdAt?: string;
}

export interface AssignmentFormData {
  engineerId: string;
  projectId: string;
  role: string;
  allocationPercentage: number;
  startDate: string;
  endDate: string;
}