"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      setIsLoading(true);
      router.push(path);
    },
    [router],
  );

  return { isLoading, navigate };
}
