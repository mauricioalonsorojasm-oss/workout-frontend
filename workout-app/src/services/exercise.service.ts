import API_URL from "./api";
import type { Exercise } from "./workout.service";

export interface CreateExercisePayload {
  workoutId: string;
  name: string;
  scheme: string;
  weight?: number | null;
  unit?: string | null;
  comment?: string | null;
  position?: number | null;
}

export interface UpdateExercisePayload {
  workoutId?: string;
  name?: string;
  scheme?: string;
  weight?: number | null;
  unit?: string | null;
  comment?: string | null;
  position?: number | null;
  completed?: boolean;
}

export const getExercises = async (params?: { workoutId?: string }): Promise<Exercise[]> => {
  const query = params?.workoutId ? `?workoutId=${params.workoutId}` : "";
  const response = await fetch(`${API_URL}/api/exercises${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch exercises");
  }

  return response.json();
};

export const createExercise = async (payload: CreateExercisePayload): Promise<Exercise> => {
  const response = await fetch(`${API_URL}/api/exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create exercise");
  }

  return response.json();
};

export const updateExercise = async (id: string, payload: UpdateExercisePayload): Promise<Exercise> => {
  const response = await fetch(`${API_URL}/api/exercises/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to update exercise");
  }

  return response.json();
};

export const toggleExerciseCompletion = async (id: string): Promise<Exercise> => {
  const response = await fetch(`${API_URL}/api/exercises/${id}/toggle`, {
    method: "PATCH"
  });

  if (!response.ok) {
    throw new Error("Failed to toggle exercise");
  }

  return response.json();
};

export const deleteExercise = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/exercises/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete exercise");
  }
};
