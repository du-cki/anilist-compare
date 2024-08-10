import React from "react";

import clsx from "clsx";

import type { User } from "@/libs/anilist/types";

export const CARD_COMMON_CLASSES = clsx(
  "bg-gray-200/60 dark:bg-gray-300/20 dark:hover:bg-gray-300/40 transition-all hover:bg-gray-200 py-2 px-3 rounded-lg"
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
      <img
        src={user.avatar.large}
        height="50"
        width="50"
        className="rounded-md"
      />

      <a
        href={`https://anilist.co/user/${user.name}`}
        className="text-2xl hover:underline"
      >
        {user.name}
      </a>
    </div>
  );
}

export default User;
