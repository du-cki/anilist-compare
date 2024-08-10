"use client";

import React, { useState } from "react";

import fetchComparedMedia from "@/utils/actions/fetchComparedMedia";

import { LIST_OPTIONS } from "@/utils/common";

import User from "../common/User";
import Media from "../common/Media";
import SearchUser from "../common/SearchUser";
import Dropdown from "../common/Dropdown";
import MediaSkeleton from "../common/MediaSkeleton";

import type {
  ListStatus,
  Media as MediaT,
  User as UserT,
} from "@/libs/anilist/types";
import clsx from "clsx";
import UserView from "./UserView";
import ListView from "./ListView";

function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="mb-2">
        {title && <h2 className="text-2xl font-bold font-mono">{title}</h2>}
      </div>

      {children}
    </div>
  );
}

type Props = {
  initialUsers: UserT[];
  initialMedia: MediaT[];
  initialListStatus: ListStatus;
};

export default function HomePage({
  initialUsers,
  initialMedia,
  initialListStatus,
}: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [media, setMedia] = useState(initialMedia);
  const [listStatus, setListStatus] = useState(initialListStatus);
  const [isDisabled, setIsDisabled] = useState(false);

  const refetchData = async ({
    forUsers,
    forList,
  }: {
    forUsers?: UserT[];
    forList?: ListStatus;
  }) => {
    try {
      setMedia([]);
      setIsDisabled(true);
      const usersToFetchFor = (forUsers || users).map((user) => user.name);

      if (usersToFetchFor.length <= 1) {
        return;
      }

      const medias = await fetchComparedMedia(
        usersToFetchFor,
        forList || listStatus,
        "ANIME"
      );

      setMedia(medias);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  };

  const onUserAdd = async (user: UserT) => {
    const _users = [...users, user];

    setUsers(_users);
    await refetchData({ forUsers: _users });
  };

  const onUserRemove = async (id: number) => {
    const _users = users.filter((user) => user.id !== id);

    setUsers(_users);
    await refetchData({ forUsers: _users });
  };

  const onListChange = async (status: ListStatus) => {
    setListStatus(status);
    await refetchData({ forList: status });
  };

  return (
    <div className="w-full md:w-3/4 xl:w-2/4 px-6 space-y-4">
      <UserView
        users={users}
        isDisabled={isDisabled}
        onUserAdd={onUserAdd}
        onUserRemove={onUserRemove}
      />

      <div className={clsx("pt-5", users.length <= 1 && "hidden")}>
        <ListView
          media={media}
          listStatus={listStatus}
          isDisabled={isDisabled}
          onListChange={onListChange}
        />
      </div>
    </div>
  );
}
