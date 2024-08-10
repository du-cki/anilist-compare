"use client";

import React, { useState } from "react";

import User from "../common/User";
import Media from "../common/Media";

import SearchUser from "../common/SearchUser";

import fetchComparedMedia from "@/utils/actions/fetchComparedMedia";

import type { Media as MediaT, User as UserT } from "@/libs/anilist/types";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold font-mono mb-2">{title}</h2>

      {children}
    </div>
  );
}

type Props = {
  initialUsers: UserT[];
  initialMedia: MediaT[];
};

export default function HomePage({ initialUsers, initialMedia }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [media, setMedia] = useState(initialMedia);

  const refetchData = async (forUsers?: UserT[]) => {
    try {
      const usersToFetchFor = (forUsers || users).map((user) => user.name);

      if (usersToFetchFor.length <= 1) {
        return;
      }

      const medias = await fetchComparedMedia(
        usersToFetchFor,
        "COMPLETED",
        "ANIME"
      );

      setMedia(medias);
    } catch (error) {
      setUsers([]);
      console.error(error);
    }
  };

  const onUserRemove = async (id: number) => {
    setMedia([]);

    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);

    await refetchData(newUsers);
  };

  const onUserAdd = async (user: UserT) => {
    setMedia([]);

    const newUsers = [...users, user];
    setUsers(newUsers);

    await refetchData(newUsers);
  };

  return (
    <div className="w-full md:w-3/4 xl:w-2/4 px-6 space-y-4">
      <SearchUser
        onChange={(option) => {
          if (option) onUserAdd(option.value);
        }}
      />

      <div className="pt-8 space-y-4">
        {Object.keys(users).length > 0 && (
          <Section title="Users">
            <div className="space-y-3">
              {users.map((user) => (
                <User user={user} key={user.id} onRemove={onUserRemove} />
              ))}
            </div>
          </Section>
        )}

        {media.length > 0 && (
          <Section title="Media">
            <div className="space-y-3">
              {media.map((media) => (
                <Media media={media} key={media.id} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
