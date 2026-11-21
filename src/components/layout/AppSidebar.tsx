import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarClock,
  Clapperboard,
  LayoutDashboard,
  LibraryBig,
  MessageSquareText,
  Languages,
  Settings,
  Share2,
} from "lucide-react";

import { LogoMark, Wordmark } from "@/components/brand/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSettings } from "@/lib/stores";

const GROUPS = [
  {
    label: "Studio",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/create", label: "AI Video Creator", icon: Clapperboard },
      { to: "/translate", label: "Movie Translator", icon: Languages },
      { to: "/assistant", label: "AI Assistant", icon: MessageSquareText },
    ],
  },
  {
    label: "Publish",
    items: [
      { to: "/accounts", label: "Social Accounts", icon: Share2 },
      { to: "/scheduler", label: "Content Scheduler", icon: CalendarClock },
      { to: "/library", label: "Media Library", icon: LibraryBig },
    ],
  },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { setOpenMobile } = useSidebar();
  const [settings] = useSettings();
  const initials = settings.displayName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpenMobile(false)}>
          <LogoMark className="size-8 shrink-0" />
          <Wordmark className="group-data-[collapsible=icon]:hidden" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="timecode">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  return (
                    <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                      className="data-[active=true]:bg-gradient-brand-soft data-[active=true]:text-sidebar-accent-foreground data-[active=true]:[&_svg]:text-primary"
                    >
                      <Link to={item.to} onClick={() => setOpenMobile(false)}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/settings")}
              tooltip="Settings"
              size="lg"
            >
              <Link to="/settings" onClick={() => setOpenMobile(false)}>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-primary-foreground">
                  {initials || "LF"}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold">{settings.displayName}</span>
                  <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <Settings className="size-3" /> Settings
                  </span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
