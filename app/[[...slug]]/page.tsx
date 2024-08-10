import React from "react";

import AniListClient from "@/libs/anilist";
import User from "@/components/common/User";
import Media from "@/components/common/Media";

import type { Media as MediaT, User as UserT } from "@/libs/anilist/types";

export default async function page({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const client = new AniListClient();

  let users = {} as Record<string, UserT>;
  try {
    users = await client.fetchUserProfiles({
      users: slug,
    });
  } catch {
    users = {};
  }

  let media = [] as MediaT[];
  if (slug.length > 1) {
    try {
      media = await client.compareUserMediaLists({
        users: slug,
        list_type: "COMPLETED",
      });
    } catch {
      media = [];
    }
  }

  return (
    <div className="flex flex-col items-center my-16">
      <div className="w-full md:w-3/4 xl:w-2/4 px-6">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <div className="space-y-3">
          {Object.values(users).map((user) => (
            <User user={user} key={user.id} />
          ))}
        </div>

        {media.length > 0 && (
          <div className="w-full mt-6">
            <h1 className="text-2xl font-bold mb-4">Media</h1>

            <div className="space-y-3">
              {media.map((media) => (
                <Media media={media} key={media.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
