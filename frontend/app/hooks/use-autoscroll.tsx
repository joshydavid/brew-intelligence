import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(dependencies: any[] = []) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ref;
}
