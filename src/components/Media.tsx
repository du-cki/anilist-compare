import React, { useState } from "react";

import clsx from "clsx";

import { toTenPointDecimal } from "../../utils";

import { CARD_BACKGROUND, CARD_COMMON_CLASSES } from "./User";
import { ChevronDown, Star } from "lucide-react";

import type { ComparedListResponse } from "../../libs/anilist/types";

type Props = {
  media: ComparedListResponse[number];
};

export default function Media({ media }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    title,
    bannerImage,
    coverImage,
    seasonYear,
    averageScore,
    statuses,
    episodes,
    chapters,
  } = media;

  return (
    <div className="relative flex flex-col rounded-lg overflow-hidden group shadow-sm bg-gray-900/50">
      {bannerImage && (
        <div
          className={clsx(
            CARD_BACKGROUND,
            "absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-300",
          )}
          style={{ backgroundImage: `url(${bannerImage})` }}
        />
      )}

      <div
        className={clsx(
          CARD_COMMON_CLASSES,
          "relative flex items-center p-3 h-max",
        )}
      >
        <div
          className="relative w-20 shrink-0 aspect-2/3 rounded-lg shadow-lg overflow-hidden mr-3"
          style={{ backgroundColor: coverImage.color || "#1f2937" }}
        >
          <img
            src={coverImage.medium}
            alt={`${title.romaji} cover`}
            className="w-full h-full object-cover transition-opacity"
            loading="lazy"
          />
        </div>

        <div className="flex-1 h-max">
          <h1 className="line-clamp-2 text-lg font-semibold text-gray-100">
            {title.romaji}
          </h1>

          <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
            <span>{seasonYear || "N/A"}</span>

            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />

              <span className="text-gray-300">
                {averageScore ? toTenPointDecimal(averageScore) : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 p-2 shrink-0 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
          aria-expanded={isOpen}
        >
          <ChevronDown
            className={clsx(
              "w-5 h-5 text-gray-300 transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </div>

      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="p-3 border-t border-white/10 bg-black/20 backdrop-blur-sm space-y-2">
            {Object.entries(statuses).map(([username, status]) => {
              const hasChapters = chapters != null;
              const hasEpisodes = episodes != null;
              const progressLabel = hasChapters
                ? "Chapters"
                : hasEpisodes
                  ? "Episodes"
                  : "Progress";
              const total = chapters || episodes;

              return (
                <div
                  key={username}
                  className="bg-black/30 rounded-md p-3 text-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-200">
                      {username}
                    </span>

                    <div className="flex items-center gap-1 text-yellow-400 font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      {status.score > 0 ? status.score : "N/A"}
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-gray-400">
                    <div className="flex flex-col gap-1">
                      <span>
                        {progressLabel}:{" "}
                        <span className="text-gray-200">{status.progress}</span>
                        {total ? (
                          <span className="text-gray-500"> / {total}</span>
                        ) : (
                          ""
                        )}
                      </span>

                      {(status.progressVolumes != null ||
                        status.repeat > 0) && (
                        <div className="flex items-center gap-2 text-xs">
                          {status.progressVolumes != null && (
                            <span>
                              Volumes:{" "}
                              <span className="text-gray-200">
                                {status.progressVolumes}
                              </span>
                            </span>
                          )}

                          {status.repeat > 0 && (
                            <span
                              className={clsx(
                                status.progressVolumes != null &&
                                  "border-l border-gray-600 pl-2",
                              )}
                            >
                              Repeats:{" "}
                              <span className="text-gray-200">
                                {status.repeat}
                              </span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {status.updatedAt > 0 && (
                      <span className="text-xs text-gray-500">
                        {new Date(status.updatedAt * 1000).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
