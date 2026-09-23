import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
}
