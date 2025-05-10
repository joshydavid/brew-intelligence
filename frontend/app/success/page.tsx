"use client";
import ParentWrapper from "@/bi/ParentWrapper";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthSuccess() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <ParentWrapper>
      <Loader />
    </ParentWrapper>
  );
}
