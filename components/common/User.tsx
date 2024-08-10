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
  onRemove?: (id: number) => void;
};

function User({ user, onRemove }: Props) {
  return (
    <div
      className={clsx(
        CARD_COMMON_CLASSES,
        "flex items-center min-h-[70px] justify-between"
      )}
    >
      <div className="flex items-center space-x-3">
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

      <button
        className="fill-gray-400 hover:bg-gray-300/80 dark:hover:bg-gray-200/20 rounded-lg"
        onClick={() => onRemove?.(user.id)}
      >
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          height="50"
          width="50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
        </svg>
      </button>
    </div>
  );
}

export default User;
