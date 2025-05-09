"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface TanStackProviderProps {
  children: ReactNode;
}

export const TanStackProvider = ({
  children,
  ...props
}: Readonly<TanStackProviderProps>) => {
  return (
    <QueryClientProvider client={queryClient} {...props}>
      {children}
    </QueryClientProvider>
  );
};
