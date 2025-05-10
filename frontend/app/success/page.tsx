"use client";

import { getRequest } from "@/api/getRequest";
import ParentWrapper from "@/bi/ParentWrapper";
import Loader from "@/components/ui/loader";
import { API_ROUTES } from "@/lib/constants/api-routes";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthSuccess() {
  const router = useRouter();
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER],
    queryFn: () => getRequest(API_ROUTES.GET_USER),
  });

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <ParentWrapper>
      <Loader />
    </ParentWrapper>
  );
}
