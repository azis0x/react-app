import { use } from "react";

export type AboutProfileData = {
  name: string;
  age: number;
  job: string;
};

function CardWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export function AboutProfileSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section
      role="status"
      aria-label="Loading profiles"
      className="max-w-6xl mx-auto w-full px-4 py-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, k) => (
          <CardWrapper key={k}>
            <article className="w-full px-4 py-4 border rounded-xl bg-slate-800 border-slate-700 animate-pulse">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-700" />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="h-4 rounded bg-slate-700 w-3/4 sm:w-1/2" />
                  <div className="h-3 rounded bg-slate-700 w-1/3" />
                  <div className="h-4 rounded bg-slate-700 w-5/6 sm:w-2/3" />
                </div>
              </div>
            </article>
          </CardWrapper>
        ))}
      </div>
    </section>
  );
}

export function AboutProfile({ data }: { data: Promise<AboutProfileData[]> }) {
  const profile = use(data);

  return (
    <section className="max-w-6xl mx-auto w-full px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profile.map((p) => (
          <CardWrapper key={p.name}>
            <article
              className="w-full px-4 py-4 border rounded-xl bg-slate-800 border-slate-700 shadow-sm hover:border-slate-500 transition-colors"
              aria-label={`Profile ${p.name}`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-900">
                    {p.name[0].toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-100">
                    {p.name}
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    {p.age} years old
                  </p>

                  <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-700 text-sm text-slate-200">
                    Work as {p.job}
                  </div>
                </div>
              </div>
            </article>
          </CardWrapper>
        ))}
      </div>
    </section>
  );
}
