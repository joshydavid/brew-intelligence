import { ApiEndpoints } from "@/models/api-routes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ROUTES: ApiEndpoints = {
  COFFEE_LISTINGS: `${API_BASE_URL}/api/v1/coffee-listings`,
  RECIPES: `${API_BASE_URL}/api/v1/recipes`,
  LOGIN_WITH_X: `${API_BASE_URL}/api/v1/login`,
  AUTH_STATUS: `${API_BASE_URL}/api/v1/user/status`,
  AI_CHAT: `${API_BASE_URL}/api/v1/generate-content`,
};
