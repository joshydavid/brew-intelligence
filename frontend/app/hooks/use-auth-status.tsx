"use client";

import { getRequest } from "@/api/getRequest";
import { useAuth } from "@/context/AuthContext";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { AuthDTO } from "@/models/api-dto";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAuthStatus = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const { setAuthId } = useAuth();
  const {
    data: authData,
    error: authError,
    isLoading: authLoading,
  } = useQuery<AuthDTO>({
    queryKey: [QUERY_KEYS.AUTH_STATUS],
    queryFn: () => getRequest(API_ROUTES.AUTH_STATUS),
    retry: 0,
  });

  useEffect(() => {
    if (authData) {
      setAuthId(authData.userId);
      if (onSuccess) onSuccess();
    }
  }, [authData, setAuthId, onSuccess]);

  return {
    authData,
    authError,
    authLoading,
  };
};
