import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";
import "antd/dist/reset.css";
import AuthProvider from "./context/AuthProvider.jsx";

// 👉 Add React Query:
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create client instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="font-urbanist max-w-7xl mx-auto">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  </StrictMode>
);
