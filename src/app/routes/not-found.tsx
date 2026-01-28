import type { LoaderFunctionArgs } from "react-router";
import { data } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
  let url = new URL(request.url);
  let path = url.pathname;

  throw data(`Path ${path} not found`, {
    status: 404,
    statusText: "Not found",
  });
}

export default function NotFound() {
  return <h2>404 Page not found</h2>;
}
