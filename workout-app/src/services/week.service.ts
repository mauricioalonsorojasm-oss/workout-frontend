import API_URL from "./api";
import type { Workout } from "./workout.service";

export interface Week {
  id: string;
  title: string;
  startDate: string;
  notes?: string | null;
  isCompleted: boolean;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  workouts?: Workout[];
  _count?: {
    workouts: number;
  };
}

export interface CreateWeekPayload {
  title: string;
  startDate: string;
  notes?: string | null;
}

export interface UpdateWeekPayload {
  title?: string;
  startDate?: string | null;
  notes?: string | null;
}

export const getWeeks = async (options?: { full?: boolean }): Promise<Week[]> => {
  const query = options?.full ? "?full=true" : "";
  const response = await fetch(`${API_URL}/api/weeks${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weeks");
  }

  return response.json();
};

export const getWeekById = async (id: string): Promise<Week> => {
  const response = await fetch(`${API_URL}/api/weeks/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch week");
  }

  return response.json();
};

export const createWeek = async (payload: CreateWeekPayload): Promise<Week> => {
  const response = await fetch(`${API_URL}/api/weeks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create week");
  }

  return response.json();
};

export const updateWeek = async (id: string, payload: UpdateWeekPayload): Promise<Week> => {
  const response = await fetch(`${API_URL}/api/weeks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to update week");
  }

  return response.json();
};

export const toggleWeekCompletion = async (id: string, isCompleted: boolean): Promise<Week> => {
  const response = await fetch(`${API_URL}/api/weeks/${id}/complete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ isCompleted })
  });

  if (!response.ok) {
    throw new Error("Failed to toggle week" );
  }

  return response.json();
};

export const deleteWeek = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/weeks/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete week");
  }
};
