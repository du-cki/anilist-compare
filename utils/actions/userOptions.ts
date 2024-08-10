"use server";

import AniListClient from "@/libs/anilist";
import type { User } from "@/libs/anilist/types";

export default async function userOptions(search: string): Promise<User[]> {
  const client = new AniListClient();
  return client.searchUsers({ search });
}
