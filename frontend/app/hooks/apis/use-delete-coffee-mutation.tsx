import { API_ROUTES } from "@/lib/constants/api-routes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCoffeeListingMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_ROUTES.COFFEE_LISTINGS}/${id}`, {
        withCredentials: true,
      });
    },
  });
};
