import { Suspense } from "react";
import { useLoaderData } from "react-router";
import data from "@/app/features/about/data.json" with { type: "json" };
import {
  AboutProfile,
  AboutProfileSkeleton,
  type AboutProfileData,
} from "../features/about/about-profile";

export async function loader() {
  let nonCriticalData = new Promise((res) => setTimeout(() => res(data), 5000));

  let criticalData = await new Promise((res) =>
    setTimeout(() => res("I am a..."), 300),
  );

  return {
    nonCriticalData: nonCriticalData as Promise<AboutProfileData[]>,
    criticalData,
  };
}

export default function About() {
  const { nonCriticalData, criticalData } = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>About me:</h2>
      <p>{criticalData}</p>
      <Suspense fallback={<AboutProfileSkeleton />}>
        <AboutProfile data={nonCriticalData} />
      </Suspense>
    </div>
  );
}
