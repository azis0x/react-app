import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./style.css";
import { createBrowserRouter, RouterProvider, matchRoutes } from "react-router";
import { routes } from "./app/routes";

hydrate();

async function hydrate() {
  // Determine if any of the initial routes are lazy
  let lazyMatches = matchRoutes(routes, window.location)?.filter(
    // @ts-ignore
    (m) => m.route.lazy,
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        // @ts-ignore
        let routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      }),
    );
  }

  let rootEl = document.getElementById("root") as HTMLDivElement;
  let router = createBrowserRouter(routes);

  hydrateRoot(
    rootEl,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
