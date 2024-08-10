import { type ListStatus } from "@/libs/anilist/types";

export const LIST_OPTIONS = [
  { label: "Planning", value: "PLANNING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Current", value: "CURRENT" },
  { label: "Dropped", value: "DROPPED" },
  { label: "Repeating", value: "REPEATING" },
  { label: "Paused", value: "PAUSED" },
] as const;

export const DEFAULT_LIST_STATUS: ListStatus = "PLANNING";
