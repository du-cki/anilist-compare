import React from "react";

import AniListClient from "@/libs/anilist";
import HomePage from "@/components/home/HomePage";

import type { Media as MediaT, User as UserT } from "@/libs/anilist/types";

type Props = {
  params: { slug?: string[] };
};

export default async function page({ params: { slug } }: Props) {
  const client = new AniListClient();

  let users = [] as UserT[];
  try {
    if (slug) {
      users = await client.fetchUserProfiles({
        users: slug,
      });
    }
  } catch {
    users = [];
  }

  let media = [] as MediaT[];
  if (slug && slug.length > 1) {
    try {
      media = await client.compareUserMediaLists({
        users: slug,
        listStatus: "COMPLETED",
      });
    } catch {
      media = [];
    }
  }

  return (
    <div className="flex flex-col items-center my-16">
      <HomePage initialUsers={users} initialMedia={media} />
    </div>
  );
}
