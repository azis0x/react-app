import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./style.css";
import { createBrowserRouter } from "react-router";
import { routes } from "./app/routes";
import { RouterProvider } from "react-router/dom";

let rootEl = document.getElementById("root") as HTMLDivElement;
let router = createBrowserRouter(routes);

hydrateRoot(
  rootEl,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
