import React from "react";

import clsx from "clsx";
import { CARD_BACKGROUND, CARD_COMMON_CLASSES } from "./User";

import type { ComparedListResponse } from "@/libs/anilist/types";
import Image from "next/image";
import moment from "moment";

type Props = {
  media: ComparedListResponse[number];
  isOpened: boolean;
} & React.ComponentProps<"div">;

export default function Media({ media, isOpened, ...props }: Props) {
  return (
    <div className="rounded-lg overflow-clip">
      <div
        className={clsx(
          CARD_COMMON_CLASSES,
          "flex items-center min-h-[90px] relative overflow-clip rounded-none",
          "hover:cursor-pointer"
        )}
        {...props}
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

        <a href={`https://anilist.co/anime/${media.id}`}>
          <Image
            src={media.coverImage.medium}
            alt={`${media.title.romaji}'s cover image`}
            height="50"
            width="50"
            className="rounded-md mr-3 hover:opacity-80 transition-all"
          />
        </a>

        <span className="line-clamp-2">{media.title.romaji}</span>
      </div>

      <div
        className={clsx(
          CARD_BACKGROUND,
          "w-full transition-all ease-linear duration-400 p-3 space-y-3",
          !isOpened && "h-0 py-0"
        )}
      >
        {Object.entries(media.statuses).map(([user, status]) => (
          <div key={user} className="font-semibold">
            <span className="text-gray-400 text-sm font-semibold">
              <a
                href={`https://anilist.co/user/${user}`}
                className="font-extrabold text-lg default-text hover:underline"
              >
                {user}
              </a>
              {": "}
              (Last Update:{" "}
              {status.updatedAt
                ? moment(status.updatedAt * 1000).fromNow()
                : "N/A"}
              )
            </span>

            <div className="pl-2">
              {[
                ["Volumes", status.progressVolumes ?? false],
                ["Score", `${status.score}/10`],
                [
                  "Episodes",
                  `${status.progress}/${
                    media.episodes || media.chapters || "?"
                  }`,
                ],
                ["Repeat", status.repeat ?? false],
              ]
                .filter(([_, v]) => v)
                .map(([k, v]) => (
                  <p key={k as string}>
                    ↪ {k}: {v}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
