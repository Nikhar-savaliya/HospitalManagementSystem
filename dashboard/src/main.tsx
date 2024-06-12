import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserContextProvider from "./contexts/UserContext.tsx";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/index.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <Toaster />
      <RouterProvider router={AppRouter} />
    </UserContextProvider>
  </React.StrictMode>
);
