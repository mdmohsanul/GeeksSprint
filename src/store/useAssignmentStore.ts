import { api } from "@/lib/axios";
import type { Assignment } from "@/types/assignment";


import { create } from "zustand";

interface AssignmentState {
  assignments: Assignment[];
  loading: boolean;
  error?: null | undefined | string;
  fetchAssignments: () => Promise<void>;
  createAssignment: (data: Omit<Assignment, "_id">) => Promise<void>;
updateAssignment: (id: string, updatedData: Omit<Assignment, "_id">) => Promise<void>;
deleteAssignment: (id: string) => Promise<void>;
}

const useAssignmentStore = create<AssignmentState>((set) => ({
  assignments: [],
  loading: false,
  error: null,

  fetchAssignments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/assignments");
      console.log("Assignments fetched:", response.data);
      set({ assignments: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch assignments",
        loading: false,
      });
    }
  },
  createAssignment: async (data) => {
  set({ loading: true, error: null });
  try {
    const response = await api.post("/assignments", data);

    // Add new assignment directly if returned from API
    if (response?.data?.data) {
      set((state) => ({
        assignments: [...state.assignments, response.data.data],
        loading: false,
      }));
    } else {
      // fallback: refetch all
      const allResponse = await api.get("/assignments");
      set({ assignments: allResponse.data.data, loading: false });
    }
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : "Failed to create assignment",
      loading: false,
    });
  }
},
updateAssignment: async (id, updatedData) => {
  set({ loading: true, error: null });
  try {
    // Send update request to backend
    const response = await api.put(`/assignments/${id}`, updatedData);

    if (response?.data?.data) {
      // Update local state with updated assignment
      set((state) => ({
        assignments: state.assignments.map((assignment) =>
          assignment._id === id ? response.data.data : assignment
        ),
        loading: false,
      }));
    } else {
      set({
        error: "Failed to get updated assignment from server",
        loading: false,
      });
    }
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : "Failed to update assignment",
      loading: false,
    });
  }
},
deleteAssignment: async (id) => {
  set({ loading: true, error: null });
  try {
    await api.delete(`/assignments/${id}`);

    // Remove assignment from local state after success
    set((state) => ({
      assignments: state.assignments.filter((assignment) => assignment._id !== id),
      loading: false,
    }));
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : "Failed to delete assignment",
      loading: false,
    });
  }
},


}));

export default useAssignmentStore;
