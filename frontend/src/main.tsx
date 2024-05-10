import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import UserContextProvider from "./contexts/UserContext.tsx";
import AppRouter from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={AppRouter} />
    </UserContextProvider>
  </React.StrictMode>
);
