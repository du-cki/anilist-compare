"use client";

import React, { useState } from "react";

import User from "../common/User";
import Media from "../common/Media";

import SearchUser from "../common/SearchUser";

import type { Media as MediaT, User as UserT } from "@/libs/anilist/types";

type Props = {
  initialUsers: Record<string, UserT>;
  initialMedia: MediaT[];
};

export default function HomePage({ initialUsers, initialMedia }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [media, setMedia] = useState(initialMedia);

  return (
    <div className="w-full md:w-3/4 xl:w-2/4 px-6 space-y-4">
      {/* <SearchUser /> */}

      {users && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Users</h1>

          <div className="space-y-3">
            {Object.values(users).map((user) => (
              <User user={user} key={user.id} />
            ))}
          </div>
        </div>
      )}

      {media.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Media</h1>

          <div className="space-y-3">
            {media.map((media) => (
              <Media media={media} key={media.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
