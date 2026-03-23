import API_URL from "./api";

export type WorkoutStatus = "PLANNED" | "DONE" | "SKIPPED";

export interface WeekSummary {
  id: string;
  title: string;
  startDate: string;
  notes?: string | null;
  isCompleted?: boolean;
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  scheme: string;
  weight?: number | null;
  unit?: string | null;
  comment?: string | null;
  position: number;
  completed: boolean;
  completedAt?: string | null;
  createdAt?: string;
}

export interface Workout {
  id: string;
  weekId: string;
  dayOrder: number;
  dayLabel: string;
  focusTag?: string | null;
  notes?: string | null;
  date?: string | null;
  status: WorkoutStatus;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  week?: WeekSummary;
  exercises?: Exercise[];
}

export interface CreateWorkoutPayload {
  weekId: string;
  dayOrder: number;
  dayLabel: string;
  focusTag?: string | null;
  notes?: string | null;
  date?: string | null;
  status?: WorkoutStatus;
}

export interface UpdateWorkoutPayload {
  weekId?: string;
  dayOrder?: number;
  dayLabel?: string;
  focusTag?: string | null;
  notes?: string | null;
  date?: string | null;
  status?: WorkoutStatus;
}

export const getWorkouts = async (params?: { weekId?: string }): Promise<Workout[]> => {
  const query = params?.weekId ? `?weekId=${params.weekId}` : "";
  const response = await fetch(`${API_URL}/api/workouts${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
};

export const getWorkoutById = async (id: string): Promise<Workout> => {
  const response = await fetch(`${API_URL}/api/workouts/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
};

export const createWorkout = async (payload: CreateWorkoutPayload): Promise<Workout> => {
  const response = await fetch(`${API_URL}/api/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create workout");
  }

  return response.json();
};

export const updateWorkout = async (id: string, payload: UpdateWorkoutPayload): Promise<Workout> => {
  const response = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to update workout");
  }

  return response.json();
};

export const updateWorkoutStatus = async (id: string, status: WorkoutStatus): Promise<Workout> => {
  const response = await fetch(`${API_URL}/api/workouts/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  return response.json();
};

export const deleteWorkout = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/workouts/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete workout");
  }
};
