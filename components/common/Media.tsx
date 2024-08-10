import React from "react";

import clsx from "clsx";
import { CARD_COMMON_CLASSES } from "./User";

import type { Media } from "@/libs/anilist/types";
import Image from "next/image";

type Props = {
  media: Media;
};

export default function Media({ media }: Props) {
  return (
    <div
      className={clsx(
        CARD_COMMON_CLASSES,
        "flex items-center min-h-[90px] relative overflow-clip"
      )}
    >
      {media.bannerImage && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 h-full w-full -z-10 bg-cover opacity-40"
          style={{
            backgroundImage: `url(${media.bannerImage})`,
          }}
        />
      )}

      <Image
        src={media.coverImage.medium}
        alt={`${media.title.romaji}'s cover image`}
        height="50"
        width="50"
        className="rounded-md mr-3"
      />

      <a
        href={`https://anilist.co/anime/${media.id}`}
        className="hover:underline line-clamp-2"
      >
        {media.title.romaji}
      </a>
    </div>
  );
}
