"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const navigate = useCallback(
    (path: string) => {
      setIsLoading(true);
      setTimeout(() => {
        router.push(path);
      });
    },
    [router],
  );

  return { isLoading, navigate };
}
