/**
 * Centralized API configuration
 * Use this to get the API URL consistently across the app
 */
export const getApiUrl = (): string => {
  return process.env.EXPO_PUBLIC_API_URL || "http://192.168.68.110:3000";
};

