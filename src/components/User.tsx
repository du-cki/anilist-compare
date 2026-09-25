import React from "react";

import clsx from "clsx";
import { X } from "lucide-react";

import type { User as UserT } from "../../libs/anilist/types";

export const CARD_COMMON_CLASSES = clsx(
  "py-2 px-3 rounded-lg",
  "text-lg md:text-2xl font-extrabold",
);

export const CARD_BACKGROUND = clsx("bg-gray-300/20");

export const COLORED_COMMON_CLASSES = clsx(
  CARD_COMMON_CLASSES,
  CARD_BACKGROUND,
);

type Props = {
  user: UserT;
  onRemove?: () => void;
};

export default function User({ user, onRemove }: Props) {
  return (
    <div
      className={clsx(
        COLORED_COMMON_CLASSES,
        "flex items-center min-h-17.5 justify-between",
      )}
    >
      <div className="flex items-center space-x-3">
        <img
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
        className="ml-1 p-1 fill-gray-300 rounded-full hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
        onClick={() => onRemove?.()}
      >
        <X className="w-5 h-5 " />
      </button>
    </div>
  );
}
