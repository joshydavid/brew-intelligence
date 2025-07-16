import { API_ROUTES } from "@/lib/constants/api-routes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLLM = () => {
  return useMutation({
    mutationFn: async (formData: any) => {
      const response = await axios.post(API_ROUTES.AI_CHAT, formData, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};
