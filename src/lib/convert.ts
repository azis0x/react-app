import type { ComponentType } from "react";
import type { LoaderFunction, ActionFunction, RouteObject } from "react-router";

export interface RouteModule {
  default?: ComponentType<any>;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: ComponentType<any>;
  shouldRevalidate?: RouteObject["shouldRevalidate"];
}

export function convert(m: RouteModule) {
  const { default: Component, loader, action, ...rest } = m;

  return {
    ...rest,
    Component,
    loader: loader,
    action: action,
  };
}
