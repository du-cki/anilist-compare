import AniListClient from "../libs/anilist";

import { type ListStatus } from "../libs/anilist/types";

export const anilist = new AniListClient();
export const DEFAULT_LIST_STATUS: ListStatus = "PLANNING";

export const ListOptions = [
  { label: "Planning", value: "PLANNING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Current", value: "CURRENT" },
  { label: "Dropped", value: "DROPPED" },
  { label: "Repeating", value: "REPEATING" },
  { label: "Paused", value: "PAUSED" },
] as const;

export const MediaType = [
  { label: "Anime", value: "ANIME" },
  { label: "Manga", value: "MANGA" },
] as const;

export const tag = (text: string, tags: Record<string, any>): string => {
  return text.replace(
    /\{(?<tag>\w+)\}/gm,
    (_match: string, tag: string) => tags[tag] || "N/A",
  );
};

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number,
) {
  let timer: number;

  return (...args: Parameters<F>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const toTenPointDecimal = (percentage: number): string => {
  const stars = +(percentage / 10).toFixed(1);

  return stars % 1 === 0 ? stars.toFixed(0) : stars.toFixed(1);
};
