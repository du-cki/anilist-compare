"use server";

import AniListClient from "@/libs/anilist";
import type { ListStatus, Media, MediaType } from "@/libs/anilist/types";

export default async function fetchComparedMedia(
  users: string[],
  listStatus: ListStatus,
  mediaType: MediaType
): Promise<Media[]> {
  const client = new AniListClient();

  return client.compareUserMediaLists({ users, listStatus, mediaType });
}
