import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { getProject, projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.shortTitle} — M. Diviya` : "Project not found — M. Diviya" },
      { name: "description", content: loaderData?.summary ?? "Explore an AI and data science project by M. Diviya." },
      { property: "og:title", content: loaderData ? `${loaderData.shortTitle} — M. Diviya` : "Project — M. Diviya" },
      { property: "og:description", content: loaderData?.summary ?? "Explore an AI and data science project by M. Diviya." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">404 / Project</p>
        <h1 className="mt-4 font-display text-5xl font-bold">That experiment isn’t here.</h1>
        <Link to="/" hash="projects" className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-primary">
          <ArrowLeft size={16} /> Back to projects
        </Link>
      </div>
    </main>
  );
}

function ProjectPage() {
  const project = Route.useLoaderData();
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
          <Link to="/" className="font-display text-lg font-extrabold">M.D<span className="text-accent">.</span></Link>
          <Link to="/" hash="projects" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft size={15} /> All projects
          </Link>
        </div>
      </header>

      <article>
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:px-10 lg:pb-24 lg:pt-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Project {project.number} / Case study</p>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[0.96] sm:text-7xl">{project.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{project.summary}</p>
            </div>
            <div className="border-l border-border pl-6 lg:justify-self-end">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Focus</p>
              <p className="mt-2 max-w-sm font-display text-xl font-bold text-accent">{project.eyebrow}</p>
            </div>
          </div>
        </section>

        <figure className="mx-auto max-w-[1500px] px-4 sm:px-8">
          <div className="image-frame overflow-hidden">
            <img src={project.image} alt={project.imageAlt} width={1200} height={900} className="aspect-[4/3] w-full object-cover sm:aspect-[16/8]" />
          </div>
        </figure>

        <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[.85fr_1.15fr] lg:py-32">
          <div>
            <p className="section-label">01 / Why it exists</p>
            <h2 className="mt-5 font-display text-4xl font-bold">From signal to useful action.</h2>
          </div>
          <p className="max-w-3xl text-xl leading-9 text-muted-foreground">{project.purpose}</p>
        </section>

        <section className="border-y border-border bg-card/35">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:py-32">
            <div>
              <p className="section-label">02 / Applications</p>
              <h2 className="mt-5 font-display text-4xl font-bold">Where it can work.</h2>
              <div className="mt-10 divide-y divide-border border-y border-border">
                {project.applications.map((application, index) => (
                  <div key={application} className="flex items-center gap-4 py-5">
                    <span className="font-mono text-xs text-primary">0{index + 1}</span>
                    <span className="font-medium">{application}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="section-label">03 / Core capabilities</p>
              <h2 className="mt-5 font-display text-4xl font-bold">What the system does.</h2>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex min-h-20 items-start gap-3 border border-border bg-background/45 p-4">
                    <Check size={17} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-sm leading-6 text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
          <p className="section-label">04 / Platforms & tools</p>
          <h2 className="mt-5 font-display text-4xl font-bold">The working stack.</h2>
          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {project.technologies.map((technology) => (
              <div key={technology.name} className="min-h-44 border-b border-r border-border p-6 transition-colors hover:bg-card">
                <p className="font-display text-lg font-bold text-primary">{technology.name}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{technology.role}</p>
              </div>
            ))}
          </div>
        </section>

        {nextProject && (
          <section className="border-t border-border bg-card/40">
            <Link to="/projects/$slug" params={{ slug: nextProject.slug }} className="group mx-auto flex max-w-7xl items-end justify-between gap-8 px-6 py-20 sm:px-10 lg:py-28">
              <div>
                <p className="section-label">Next project</p>
                <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold transition-colors group-hover:text-primary sm:text-6xl">{nextProject.shortTitle}</h2>
              </div>
              <span className="grid size-14 shrink-0 place-items-center border border-border text-primary transition-transform group-hover:translate-x-2"><ArrowRight /></span>
            </Link>
          </section>
        )}
      </article>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-8 font-mono text-xs text-muted-foreground sm:px-10">
        <span>© 2026 M. Diviya</span>
        <span className="inline-flex items-center gap-2">Learning in public <ExternalLink size={13} /></span>
      </footer>
    </main>
  );
}