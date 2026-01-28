import type * as express from "express";
import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routes } from "./app/routes";

export async function render(
  request: express.Request,
  response: express.Response,
) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let remixRequest = createFetchRequest(request, response);
  let context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);

  let didError = false;
  let statusCode: number;

  const { pipe, abort } = renderToPipeableStream(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <div id="root">
          <React.StrictMode>
            <StaticRouterProvider
              router={router}
              context={context}
              nonce="the-nonce"
            />
          </React.StrictMode>
        </div>
      </body>
    </html>,
    {
      bootstrapModules: ["/static/index.js"],
      onShellError(error) {
        response.status(statusCode);
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.send("<h1>Something went wrong</h1>");
        console.error(error);
      },
      onShellReady() {
        statusCode = context.statusCode
          ? context.statusCode
          : didError
            ? 500
            : 200;
        response.status(statusCode);
        response.setHeader("Content-Type", "text/html; charset=utf-8");

        pipe(response);
      },
      onError(error, errorInfo) {
        didError = true;
        console.error(`${error}: ${errorInfo}`);
      },
    },
  );

  return { abort };
}

export function createFetchRequest(
  req: express.Request,
  res: express.Response,
): Request {
  let origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  res.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
