import { api } from "@/lib/axios";
import type { Project, ProjectCreatePayload } from "@/types/projects";

import { create } from "zustand";

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error?: null | undefined | string;
  fetchProjects: () => Promise<void>;
  createProject: (data: ProjectCreatePayload) => Promise<void>;
updateProject: (id: string, updatedData: ProjectCreatePayload) => Promise<void>;
}

const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/projects");
      console.log("Projects fetched:", response.data);
      set({ projects: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch projects",
        loading: false,
      });
    }
  },
   createProject: async (data) => {
  set({ loading: true, error: null });
  try {
    const response = await api.post("/projects", data);

    // Add new project directly if returned from API
    if (response?.data?.data) {
      set((state) => ({
        projects: [...state.projects, response.data.data],
        loading: false,
      }));
    } else {
      // fallback: refetch all
      const allResponse = await api.get("/projects");
      set({ projects: allResponse.data.data, loading: false });
    }
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : "Failed to create project",
      loading: false,
    });
  }
},
updateProject: async (id, updatedData) => {
  set({ loading: true, error: null });
  try {
    // Send update request to backend
    const response = await api.put(`/projects/${id}`, updatedData);

    if (response?.data?.data) {
      // Update local state with updated project
      set((state) => ({
        projects: state.projects.map((project) =>
          project._id === id ? response.data.data : project
        ),
        loading: false,
      }));
    } else {
      set({
        error: "Failed to get updated project from server",
        loading: false,
      });
    }
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : "Failed to update project",
      loading: false,
    });
  }
},
}));

export default useProjectStore;
