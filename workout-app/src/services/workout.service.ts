import API_URL from "./api";

// TYPES
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number | null;
  workoutId: string;
}

export interface Workout {
  id: string;
  name: string;
  duration: number;
  calories?: number | null;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  exercises?: Exercise[];
}

export interface CreateWorkoutPayload {
  name: string;
  duration: number;
  calories?: number | null;
  date: string;
}

export interface UpdateWorkoutPayload {
  name?: string;
  duration?: number;
  calories?: number | null;
  date?: string;
}

// 🔐 HELPER TOKEN
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// GET ALL
export const getWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch(`${API_URL}/api/workouts`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
};

// GET ONE
export const getWorkoutById = async (id: string): Promise<Workout> => {
  const response = await fetch(`${API_URL}/api/workouts/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
};

// CREATE
export const createWorkout = async (
  payload: CreateWorkoutPayload
): Promise<Workout> => {
  const response = await fetch(`${API_URL}/api/workouts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      weekId: "temp-week",
      dayOrder: 1,
      dayLabel: payload.name,
      focusTag: null,
      notes: null,
      date: payload.date,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create workout");
  }

  return response.json();
};

// UPDATE
export const updateWorkout = async (
  id: string,
  payload: UpdateWorkoutPayload
): Promise<Workout> => {
  const response = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update workout");
  }

  return response.json();
};

// DELETE
export const deleteWorkout = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete workout");
  }
};