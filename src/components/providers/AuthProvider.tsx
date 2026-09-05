"use client";

import { useAppDispatch } from "@/store/hooks";
import { checkAuth } from "@/store/slices/authSlice";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
}
