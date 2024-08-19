import React from "react";

import clsx from "clsx";
import Image from "next/image";

import RemoveSvg from "@/public/assets/remove.svg";

import type { User } from "@/libs/anilist/types";

export const CARD_COMMON_CLASSES = clsx(
  "transition-all py-2 px-3 rounded-lg",
  "text-lg md:text-2xl font-extrabold"
);

export const CARD_BACKGROUND = clsx("bg-gray-200/20 dark:bg-gray-300/20");
export const CARD_HOVER_BACKGROUND = clsx(
  "hover:bg-gray-200/40 dark:hover:bg-gray-300/40"
);

export const COLORED_COMMON_CLASSES = clsx(
  CARD_COMMON_CLASSES,
  CARD_BACKGROUND,
  CARD_HOVER_BACKGROUND
);

type Props = {
  user: User;
  onRemove?: (id: number) => void;
};

function User({ user, onRemove }: Props) {
  return (
    <div
      className={clsx(
        COLORED_COMMON_CLASSES,
        "flex items-center min-h-[70px] justify-between"
      )}
    >
      <div className="flex items-center space-x-3">
        <Image
          src={user.avatar.large}
          alt={`${user.name}'s avatar`}
          height="50"
          width="50"
          className="rounded-md w-14 h-14"
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
        <RemoveSvg height="30" width="30" />
      </button>
    </div>
  );
}

export default User;
