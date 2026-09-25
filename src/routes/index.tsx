import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, BookOpen, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import portrait from "@/assets/diviya.png";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Diviya — Building Thoughtful Intelligence" },
      { name: "description", content: "Portfolio of M. Diviya, an AI and Data Science student building thoughtful intelligent systems through computer vision, IoT and NLP." },
      { property: "og:title", content: "M. Diviya — Building Thoughtful Intelligence" },
      { property: "og:description", content: "A steady climb from Kerala to intelligent systems: AI projects, learning and work by M. Diviya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let mouseX = 0;
    let mouseY = 0;
    const points = Array.from({ length: reducedMotion ? 70 : 120 }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random() * 2 + 0.2,
    }));
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const move = (event: MouseEvent) => {
      mouseX = event.clientX / width - 0.5;
      mouseY = event.clientY / height - 0.5;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    const styles = getComputedStyle(document.documentElement);
    const cyan = styles.getPropertyValue("--primary");
    const ember = styles.getPropertyValue("--accent");
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const projected = points.map((point) => {
        if (!reducedMotion) {
          point.z -= 0.002;
          if (point.z < 0.2) point.z = 2.2;
        }
        const scale = 1 / point.z;
        return {
          x: width / 2 + (point.x + mouseX * 0.2) * scale * width * 0.38,
          y: height / 2 + (point.y + mouseY * 0.2) * scale * height * 0.38,
          scale,
        };
      });
      for (let i = 0; i < projected.length; i += 1) {
        const a = projected[i];
        if (!a) continue;
        for (let j = i + 1; j < projected.length; j += 1) {
          const b = projected[j];
          if (!b) continue;
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 100) {
            context.globalAlpha = (1 - distance / 100) * 0.22;
            context.strokeStyle = cyan;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }
      projected.forEach((point, index) => {
        context.globalAlpha = Math.min(0.9, point.scale * 0.45);
        context.fillStyle = index % 10 ? cyan : ember;
        context.beginPath();
        context.arc(point.x, point.y, Math.max(1, point.scale * 1.2), 0, Math.PI * 2);
        context.fill();
      });
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-55" />;
}

function Portrait() {
  const wrapper = useRef<HTMLDivElement>(null);
  const face = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    const move = (event: MouseEvent) => {
      const rect = wrapper.current?.getBoundingClientRect();
      if (!rect) return;
      targetX = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2)));
      targetY = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height * 0.25)) / (window.innerHeight / 2)));
    };
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (wrapper.current) wrapper.current.style.transform = `rotateY(${currentX * 10}deg) rotateX(${-currentY * 7}deg)`;
      if (face.current) face.current.style.transform = `translate(${currentX * 7}px, ${currentY * 4}px) rotateY(${currentX * 9}deg)`;
      frame = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="portrait-float mx-auto w-full max-w-[430px] [perspective:1100px]">
      <div ref={wrapper} className="relative transition-transform [transform-style:preserve-3d]">
        <div className="absolute -inset-5 border border-primary/25 [transform:translateZ(-60px)]" />
        <div className="relative overflow-hidden border border-border bg-card [transform:translateZ(0)]">
          <img src={portrait} alt="M. Diviya" className="block aspect-[4/5] w-full object-cover object-top" />
          <div ref={face} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[42%] overflow-hidden [mask-image:radial-gradient(ellipse_38%_60%_at_50%_45%,black_60%,transparent_100%)]">
            <img src={portrait} alt="" className="block aspect-[4/5] w-full object-cover object-top" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Current state</p>
              <p className="mt-1 font-display text-lg font-bold">Learning. Testing. Iterating.</p>
            </div>
            <Sparkles className="shrink-0 text-accent" size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

const journey = [
  { value: "94%", label: "Class 10", place: "Chinmaya Vidyalaya, West Kochi" },
  { value: "96.8%", label: "Class 12 · Cutoff 193", place: "Chinmaya Vidyalaya, West Kochi" },
  { value: "8.2", label: "Current CGPA", place: "M. Kumarasamy College of Engineering" },
];

function Index() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-x-hidden text-foreground">
      <NeuralField />
      <nav className="fixed inset-x-0 top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-10">
          <a href="#top" aria-label="Back to top" className="font-display text-lg font-extrabold">M.D<span className="text-accent">.</span></a>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:gap-7 sm:text-xs">
            <a href="#journey" className="transition-colors hover:text-primary">Journey</a>
            <a href="#projects" className="transition-colors hover:text-primary">Work</a>
            <a href="#learning" className="hidden transition-colors hover:text-primary sm:block">Learning</a>
          </div>
        </div>
      </nav>

      <section id="top" className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-6 pb-20 pt-28 sm:px-10 lg:grid-cols-[1.15fr_.85fr] lg:pt-24">
        <div className="reveal">
          <p className="section-label">AI & Data Science · Kerala, India</p>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-extrabold leading-[0.94] sm:text-7xl lg:text-[5.5rem]">
            Hi, I’m M. Diviya — building <span className="text-primary">thoughtful intelligence.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            A third-year B.Tech student exploring how computer vision, connected systems and language intelligence can solve practical problems.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href="#projects" className="inline-flex items-center gap-3 bg-primary px-6 py-3.5 font-mono text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1">
              Explore my work <ArrowDown size={16} />
            </a>
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground"><MapPin size={15} className="text-accent" /> West Kochi → Karur</span>
          </div>
        </div>
        <Portrait />
      </section>

      <section id="journey" className="border-y border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
          <div className="reveal grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <p className="section-label">01 / The journey</p>
              <h2 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-6xl">A steady climb, from Kerala to intelligent systems.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground lg:justify-self-end">Strong foundations at Chinmaya Vidyalaya led to a focused path in Artificial Intelligence and Data Science—one project, one question and one iteration at a time.</p>
          </div>
          <div className="mt-16 grid border-l border-t border-border md:grid-cols-3">
            {journey.map((item, index) => (
              <div key={item.label} className="reveal min-h-64 border-b border-r border-border p-7 sm:p-9">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <p className="mt-10 font-display text-5xl font-extrabold text-accent">{item.value}</p>
                <p className="mt-4 font-display text-lg font-bold">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
        <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="section-label">02 / Selected work</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold sm:text-6xl">Ideas, made testable.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">Three explorations across environmental safety, responsible monitoring and career intelligence.</p>
        </div>
        <div className="mt-16 space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <article key={project.slug} className="reveal grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
              <Link to="/projects/$slug" params={{ slug: project.slug }} className={`project-visual group block overflow-hidden ${index % 2 ? "lg:order-2" : ""}`}>
                <img src={project.image} alt={project.imageAlt} loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                <span className="absolute right-5 top-5 grid size-11 place-items-center bg-background/85 text-primary backdrop-blur-md transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={20} /></span>
              </Link>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Project {project.number}</p>
                <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">{project.shortTitle}</h3>
                <p className="mt-5 leading-7 text-muted-foreground">{project.summary}</p>
                <p className="mt-5 font-mono text-xs text-accent">{project.eyebrow}</p>
                <Link to="/projects/$slug" params={{ slug: project.slug }} className="mt-8 inline-flex items-center gap-3 border-b border-primary pb-2 font-mono text-sm font-bold text-primary transition-colors hover:text-accent">
                  Open case study <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="learning" className="border-y border-border bg-card/35">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:py-32">
          <div className="reveal">
            <p className="section-label">03 / Continuous learning</p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-6xl">Learning in public. Building with intent.</h2>
            <p className="mt-7 max-w-lg leading-7 text-muted-foreground">My coursework expands the systems thinking behind my projects—from connected devices to scalable computing.</p>
          </div>
          <div className="reveal self-end divide-y divide-border border-y border-border">
            {["Cloud Computing", "Introduction to Internet of Things"].map((course, index) => (
              <div key={course} className="group flex items-center gap-5 py-7">
                <span className="grid size-12 shrink-0 place-items-center border border-border text-primary transition-colors group-hover:border-primary"><BookOpen size={20} /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">NPTEL learning · 0{index + 1}</p>
                  <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{course}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
        <div className="reveal grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div>
            <p className="section-label">04 / Toolkit</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold sm:text-6xl">Curious by nature. Technical by practice.</h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {["Python", "Java", "C", "SQL", "Computer Vision", "NLP", "IoT", "Data Science"].map((skill) => (
              <span key={skill} className="border border-border bg-card/55 px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-28 text-center sm:px-10 lg:py-36">
        <p className="section-label">Open to internships & collaboration</p>
        <h2 className="mx-auto mt-6 max-w-5xl font-display text-5xl font-extrabold leading-tight sm:text-7xl">Still learning. Already building.</h2>
        <p className="mx-auto mt-7 max-w-xl leading-7 text-muted-foreground">I’m interested in thoughtful teams, useful problems and opportunities to turn growing skills into real outcomes.</p>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-8 font-mono text-xs text-muted-foreground sm:px-10">
        <span>© 2026 M. Diviya</span>
        <span>Artificial Intelligence & Data Science</span>
      </footer>
    </main>
  );
}
