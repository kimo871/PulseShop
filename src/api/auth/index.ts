import { MmkvStorage } from "../../core/storage";
import ApiConfig from "../config";

// api/auth/index.ts

export const authApi = {
  getCurrentUser: async () => {
    try {
      const token = MmkvStorage.getItem("USER_TOKEN");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`${ApiConfig.BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        if (response.status === 401) {
          MmkvStorage.clearItems(["USER_TOKEN"]);
        }
        throw new Error(data.message || "Failed to fetch user profile");
      }
      return data;
    } catch (err) {
      console.log(err)
      throw new Error(
        err instanceof Error
          ? err.message
          : "Network error fetching user profile"
      );
    }
  },
  login: async (credentials: any): Promise<any> => {
    try {
      console.log(ApiConfig.BASE_URL)
      const response = await fetch(`${ApiConfig.BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed", {
          cause: response?.status,
        });
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  },
};
