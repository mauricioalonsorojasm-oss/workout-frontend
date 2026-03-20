import API_URL from "./api";
import type { Exercise } from "./workout.service";

export interface CreateExercisePayload {
name: string;
sets: number;
reps: number;
weight?: number | null;
workoutId: string;
}

export interface UpdateExercisePayload {
name?: string;
sets?: number;
reps?: number;
weight?: number | null;
workoutId?: string;
}

export const getExercises = async (): Promise<Exercise[]> => {
const response = await fetch(`${API_URL}/api/exercises`);

if (!response.ok) {
throw new Error("Failed to fetch exercises");
}

return response.json();
};

export const createExercise = async (
payload: CreateExercisePayload
): Promise<Exercise> => {
const response = await fetch(`${API_URL}/api/exercises`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});

if (!response.ok) {
throw new Error("Failed to create exercise");
}

return response.json();
};

export const updateExercise = async (
id: string,
payload: UpdateExercisePayload
): Promise<Exercise> => {
const response = await fetch(`${API_URL}/api/exercises/${id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});

if (!response.ok) {
throw new Error("Failed to update exercise");
}

return response.json();
};

export const deleteExercise = async (id: string): Promise<void> => {
const response = await fetch(`${API_URL}/api/exercises/${id}`, {
method: "DELETE",
});

if (!response.ok) {
throw new Error("Failed to delete exercise");
}
};