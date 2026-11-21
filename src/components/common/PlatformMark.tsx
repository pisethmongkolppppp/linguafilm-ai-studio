import { Facebook, Instagram, Music2, Youtube } from "lucide-react";

import type { PlatformId } from "@/lib/types";
import { cn } from "@/lib/utils";

const MAP = {
  facebook: { Icon: Facebook, cls: "bg-platform-facebook/15 text-platform-facebook ring-platform-facebook/30" },
  tiktok: { Icon: Music2, cls: "bg-platform-tiktok/15 text-platform-tiktok ring-platform-tiktok/30" },
  instagram: { Icon: Instagram, cls: "bg-platform-instagram/15 text-platform-instagram ring-platform-instagram/30" },
  youtube: { Icon: Youtube, cls: "bg-platform-youtube/15 text-platform-youtube ring-platform-youtube/30" },
} satisfies Record<PlatformId, unknown>;

export function PlatformMark({
  platform,
  size = "md",
  className,
}: {
  platform: PlatformId;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { Icon, cls } = MAP[platform];
  const sizeCls = { sm: "size-6 rounded-md [&_svg]:size-3.5", md: "size-9 rounded-lg [&_svg]:size-4", lg: "size-12 rounded-xl [&_svg]:size-6" }[size];
  return (
    <span className={cn("grid shrink-0 place-items-center ring-1 ring-inset", cls, sizeCls, className)}>
      <Icon />
    </span>
  );
}
