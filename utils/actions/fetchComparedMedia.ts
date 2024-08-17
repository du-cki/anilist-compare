"use server";

import AniListClient from "@/libs/anilist";
import type {
  ComparedListResponse,
  ListStatus,
  MediaType,
} from "@/libs/anilist/types";

export default async function fetchComparedMedia(
  users: string[],
  listStatus: ListStatus,
  mediaType: MediaType
): Promise<ComparedListResponse> {
  const client = new AniListClient();

  return client.compareUserMediaLists({ users, listStatus, mediaType });
}
