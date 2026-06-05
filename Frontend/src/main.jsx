import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { queryClient } from "./services/queryClient";
import { useThemeStore } from "./store/theme.store";

// Apply persisted theme before first paint.
useThemeStore.getState().init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--elevated)",
            color: "var(--foreground)",
            border: "1px solid var(--border-strong)",
            borderRadius: "12px",
            fontSize: "13px",
            boxShadow: "var(--shadow-pop)",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
