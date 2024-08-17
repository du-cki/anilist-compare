import React from "react";

import clsx from "clsx";
import { CARD_BACKGROUND, CARD_COMMON_CLASSES } from "./User";

import type { Media } from "@/libs/anilist/types";
import Image from "next/image";

type Props = {
  media: Media;
};

export default function Media({ media }: Props) {
  return (
    <a
      className={clsx(
        CARD_COMMON_CLASSES,
        "flex items-center min-h-[90px] relative overflow-clip",
        "bg-none"
      )}
      href={`https://anilist.co/anime/${media.id}`}
    >
      {media.bannerImage && (
        <Image
          src={media.bannerImage}
          alt={`${media.title.romaji}'s banner image`}
          fill={true}
          sizes="100vw"
          className={clsx(
            CARD_BACKGROUND,
            "absolute top-0 left-0 right-0 bottom-0 z-[-1] opacity-50 object-cover"
          )}
        />
      )}

      <Image
        src={media.coverImage.medium}
        alt={`${media.title.romaji}'s cover image`}
        height="50"
        width="50"
        className="rounded-md mr-3"
      />

      <p className="hover:underline line-clamp-2">{media.title.romaji}</p>
    </a>
  );
}
