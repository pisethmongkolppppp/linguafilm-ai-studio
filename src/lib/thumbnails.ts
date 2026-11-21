import neonRain from "@/assets/thumbs/neon-rain.jpg";
import mountainDawn from "@/assets/thumbs/mountain-dawn.jpg";
import kitchenDumplings from "@/assets/thumbs/kitchen-dumplings.jpg";
import paperForest from "@/assets/thumbs/paper-forest.jpg";
import studioProduct from "@/assets/thumbs/studio-product.jpg";

import type { ThumbnailKey } from "./types";

const THUMBNAILS: Record<ThumbnailKey, string> = {
  "neon-rain": neonRain,
  "mountain-dawn": mountainDawn,
  "kitchen-dumplings": kitchenDumplings,
  "paper-forest": paperForest,
  "studio-product": studioProduct,
};

export function thumbnailSrc(key: ThumbnailKey): string {
  return THUMBNAILS[key];
}
