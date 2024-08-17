import React from "react";

import AniListClient from "@/libs/anilist";
import HomePage from "@/components/home/HomePage";

import { DEFAULT_LIST_STATUS, LIST_OPTIONS } from "@/utils/common";

import type { ComparedListResponse, User as UserT } from "@/libs/anilist/types";

type Props = {
  params: { slug?: string[] };
  searchParams: { list?: string };
};

export default async function page({
  params: { slug },
  searchParams: { list },
}: Props) {
  const client = new AniListClient();

  const listStatus =
    LIST_OPTIONS.find((o) => o.value === list?.toUpperCase())?.value ||
    DEFAULT_LIST_STATUS;

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

  let media = [] as ComparedListResponse;
  if (slug && slug.length > 1) {
    try {
      media = await client.compareUserMediaLists({
        users: slug,
        listStatus,
      });
    } catch {
      media = [];
    }
  }

  return (
    <div className="flex flex-col items-center my-16">
      <HomePage
        initialUsers={users}
        initialMedia={media}
        initialListStatus={listStatus}
      />
    </div>
  );
}
