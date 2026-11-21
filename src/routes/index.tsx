import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clapperboard,
  FolderKanban,
  Globe2,
  Languages,
  Share2,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import heroStill from "@/assets/thumbs/neon-rain.jpg";
import { DemoNotice } from "@/components/common/DemoNotice";
import { PlatformMark } from "@/components/common/PlatformMark";
import { ProjectCard } from "@/components/common/ProjectCard";
import { StatCard } from "@/components/common/StatCard";
import { StatusPill } from "@/components/common/StatusPill";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { computeStats } from "@/lib/domain";
import { SAMPLE_ACTIVITY } from "@/lib/mock-data";
import { usePosts, useProjects, useSettings } from "@/lib/stores";
import { PLATFORMS } from "@/services/social-publishing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — LinguaFilm AI Studio" },
      {
        name: "description",
        content: "Your studio at a glance: recent video projects, translations and planned posts.",
      },
      { property: "og:title", content: "Dashboard — LinguaFilm AI Studio" },
      {
        property: "og:description",
        content: "Recent video projects, translations and planned posts in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const chartConfig = {
  originals: { label: "Original videos", color: "var(--chart-1)" },
  translations: { label: "Translations", color: "var(--chart-2)" },
} satisfies ChartConfig;

function greeting(now: Date) {
  const h = now.getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Dashboard() {
  const [projects] = useProjects();
  const [posts] = usePosts();
  const [settings] = useSettings();
  const now = new Date();
  const stats = computeStats(projects, posts, now);
  const recent = [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);
  const upcoming = posts
    .filter((p) => new Date(p.scheduledFor) > now)
    .sort((a, b) => a.scheduledFor.localeCompare(b.scheduledFor))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <section className="surface-panel relative overflow-hidden rounded-2xl">
        <img src={heroStill} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-scrim" />
        <div className="relative max-w-xl space-y-4 p-6 md:p-10">
          <p className="timecode text-electric">{greeting(now)}, {settings.displayName.split(" ")[0]}</p>
          <h1 className="text-3xl font-semibold md:text-4xl">
            Make it once. <span className="text-gradient-brand">Share it in every language.</span>
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Plan original videos, prepare translated versions with subtitles and voice-overs, and line up
            posts for your channels.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="hero" size="lg">
              <Link to="/create">
                <Clapperboard /> Create a video
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/translate">
                <Languages /> Translate a video
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoNotice>
        This is version 1. Videos aren't rendered, translated or posted yet — workflows are simulated and
        everything is saved in this browser.
      </DemoNotice>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projects" value={stats.totalProjects} hint={`${stats.drafts} drafts in progress`} icon={FolderKanban} />
        <StatCard label="Approved drafts" value={stats.approved} hint="Ready for the scheduler" icon={CheckCircle2} accent="success" />
        <StatCard label="Planned posts" value={stats.upcomingPosts} hint="Not published — plans only" icon={CalendarClock} accent="electric" />
        <StatCard label="Languages" value={stats.languages} hint={`${stats.translations} translation projects`} icon={Globe2} accent="warning" />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="surface-panel rounded-xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">Content activity</h2>
              <p className="text-xs text-muted-foreground">Projects started per week</p>
            </div>
            <StatusPill tone="demo">Sample data</StatusPill>
          </div>
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <AreaChart data={SAMPLE_ACTIVITY} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="fill-originals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-originals)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-originals)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fill-translations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-translations)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-translations)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 6" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="originals" type="monotone" stroke="var(--color-originals)" fill="url(#fill-originals)" strokeWidth={2} />
              <Area dataKey="translations" type="monotone" stroke="var(--color-translations)" fill="url(#fill-translations)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </div>

        <div className="surface-panel flex flex-col rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Coming up</h2>
            <Link to="/scheduler" className="text-xs text-electric hover:underline">
              Open scheduler
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">No planned posts yet.</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((post) => {
                const project = projects.find((p) => p.id === post.projectId);
                const d = new Date(post.scheduledFor);
                return (
                  <li key={post.id} className="flex items-center gap-3 rounded-lg border border-border bg-surface-raised/40 p-3">
                    <div className="grid w-12 shrink-0 place-items-center rounded-md bg-muted py-1 text-center">
                      <span className="timecode text-muted-foreground">{d.toLocaleDateString(undefined, { month: "short" })}</span>
                      <span className="font-display text-lg font-semibold leading-none">{d.getDate()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{project?.title ?? "Removed project"}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })} · planned
                      </p>
                    </div>
                    <div className="flex -space-x-1.5">
                      {post.platforms.map((p) => (
                        <PlatformMark key={p} platform={p} size="sm" className="ring-2 ring-card" />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-auto pt-4">
            <div className="rounded-lg border border-warning/25 bg-warning/5 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">Social accounts</p>
                <StatusPill tone="offline">0 / {PLATFORMS.length} connected</StatusPill>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {PLATFORMS.map((p) => (
                  <PlatformMark key={p.id} platform={p.id} size="sm" />
                ))}
                <Link to="/accounts" className="ml-auto inline-flex items-center gap-1 text-xs text-electric hover:underline">
                  Details <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent projects</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/library">
              View library <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recent.map((p) => (
            <ProjectCard key={p.id} project={p} compact />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { to: "/assistant" as const, title: "Ask the assistant", body: "Brainstorm ideas, scripts and captions.", icon: Share2 },
          { to: "/scheduler" as const, title: "Plan your week", body: "Put approved drafts on the calendar.", icon: CalendarClock },
          { to: "/accounts" as const, title: "Prepare your channels", body: "See what each platform will need.", icon: Globe2 },
        ].map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="surface-panel group flex items-center gap-4 rounded-xl p-4 transition hover:border-primary/40"
          >
            <span className="grid size-10 place-items-center rounded-lg bg-gradient-brand-soft text-primary">
              <card.icon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{card.title}</p>
              <p className="text-xs text-muted-foreground">{card.body}</p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        ))}
      </section>
    </div>
  );
}
