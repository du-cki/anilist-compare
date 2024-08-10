import React from "react";

import clsx from "clsx";
import { CARD_COMMON_CLASSES } from "./User";

import type { Media } from "@/libs/anilist/types";

type Props = {
  media: Media;
};

export default function Media({ media }: Props) {
  return (
    <div
      key={media.id}
      className={clsx(
        CARD_COMMON_CLASSES,
        "flex items-center space-x-3 min-h-[70px]"
      )}
    >
      <img
        src={media.coverImage.extraLarge}
        height="50"
        width="50"
        className="rounded-md"
      />

      <a
        href={`https://anilist.co/anime/${media.id}`}
        className="text-2xl hover:underline"
      >
        {media.title.romaji}
      </a>
    </div>
  );
}
