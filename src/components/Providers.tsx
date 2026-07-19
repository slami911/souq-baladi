"use client";

import { type ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--surface)",
            color: "var(--foreground)",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.05)",
          },
        }}
      />
    </ThemeProvider>
  );
}
