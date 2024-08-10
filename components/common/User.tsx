import React from "react";

import clsx from "clsx";
import Image from "next/image";

import type { User } from "@/libs/anilist/types";

export const CARD_COMMON_CLASSES = clsx(
  "bg-gray-200/60 hover:bg-gray-200",
  "dark:bg-gray-300/20 dark:hover:bg-gray-300/30",
  "transition-all py-2 px-3 rounded-lg",
  "text-lg md:text-2xl"
);

type Props = {
  user: User;
};

function User({ user }: Props) {
  return (
    <div
      className={clsx(
        CARD_COMMON_CLASSES,
        "flex items-center space-x-3 min-h-[70px]"
      )}
    >
      <Image
        src={user.avatar.large}
        alt={`${user.name}'s avatar`}
        height="50"
        width="50"
        className="rounded-md"
      />

      <a
        href={`https://anilist.co/user/${user.name}`}
        className="hover:underline"
      >
        {user.name}
      </a>
    </div>
  );
}

export default User;
