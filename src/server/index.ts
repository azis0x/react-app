import { render } from "@/entry.server";
import express from "express";
import path from "node:path";

const workspace = process.cwd();

function resolve(p: string) {
  return path.resolve(workspace, p);
}

const app = express();
app.use("/static", express.static(resolve("dist/client")));
app.use(express.static(resolve("public")));

app.all("*all", async (request, response) => {
  const { abort } = await render(request, response);

  setTimeout(() => {
    abort();
  }, 10_000);
});

app.listen(3000, () => console.log("[app]: running on port 3000"));
