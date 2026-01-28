import { convert } from "@/lib/convert";
import type { RouteObject } from "react-router";

export const routes = [
  {
    path: "/",
    lazy: () => import("./root").then(convert),
    children: [
      {
        index: true,
        lazy: () => import("./routes/index").then(convert),
      },
      {
        path: "about",
        lazy: () => import("./routes/about").then(convert),
      },
      {
        path: "*",
        lazy: () => import("./routes/not-found").then(convert),
      },
    ],
  },
] satisfies RouteObject[];
