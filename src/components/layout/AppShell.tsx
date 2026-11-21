import { ClientOnly, Link } from "@tanstack/react-router";
import { HardDrive, Plus } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { StatusPill } from "../common/StatusPill";
import { AppSidebar } from "./AppSidebar";

function PageFallback() {
  return (
    <div className="space-y-6" aria-busy="true">
      <Skeleton className="h-10 w-64 bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl bg-muted" />
        ))}
      </div>
      <Skeleton className="h-72 rounded-xl bg-muted" />
    </div>
  );
}

/**
 * App frame: sidebar + top bar. Page bodies render on the client only because v1 data
 * lives in browser storage; swap for loaders once a database is connected.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ClientOnly fallback={<div className="hidden w-64 shrink-0 md:block" />}>
        <AppSidebar />
      </ClientOnly>
      <SidebarInset className="relative min-w-0 overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-primary/15 blur-3xl animate-float-glow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 size-[420px] rounded-full bg-electric/10 blur-3xl animate-float-glow [animation-delay:-4s]"
        />
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/75 px-4 backdrop-blur-xl md:px-6">
          <SidebarTrigger className="-ml-1" />
          <StatusPill tone="demo">Demo workspace</StatusPill>
          <span className="hidden items-center gap-1.5 text-xs text-muted-foreground lg:flex">
            <HardDrive className="size-3.5" /> Your work is saved in this browser only
          </span>
          <div className="ml-auto">
            <Button asChild variant="hero" size="sm">
              <Link to="/create">
                <Plus /> New video
              </Link>
            </Button>
          </div>
        </header>
        <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8 md:py-8">
          <ClientOnly fallback={<PageFallback />}>{children}</ClientOnly>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
