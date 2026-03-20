import API_URL from "./api";

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

export const getWorkouts = async (): Promise<Workout[]> => {
const response = await fetch(`${API_URL}/api/workouts`);

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

export const createWorkout = async (
payload: CreateWorkoutPayload
): Promise<Workout> => {
const response = await fetch(`${API_URL}/api/workouts`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});

if (!response.ok) {
throw new Error("Failed to create workout");
}

return response.json();
};

export const updateWorkout = async (
id: string,
payload: UpdateWorkoutPayload
): Promise<Workout> => {
const response = await fetch(`${API_URL}/api/workouts/${id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});

if (!response.ok) {
throw new Error("Failed to update workout");
}

return response.json();
};

export const deleteWorkout = async (id: string): Promise<void> => {
const response = await fetch(`${API_URL}/api/workouts/${id}`, {
method: "DELETE",
});

if (!response.ok) {
throw new Error("Failed to delete workout");
}
};