"use client";

import React, { useState } from "react";

import clsx from "clsx";

import { LIST_OPTIONS } from "@/utils/common";

import Media from "../common/Media";
import Dropdown from "../common/Dropdown";
import Section from "./Section";

import type { ListStatus, Media as MediaT } from "@/libs/anilist/types";
import MediaSkeleton from "../common/MediaSkeleton";

type Props = {
  media: MediaT[];
  listStatus: ListStatus;
  isDisabled: boolean;

  onListChange?: (status: ListStatus) => void;
};

export default function ListView({
  media,
  listStatus,
  isDisabled,

  onListChange,
}: Props) {
  return (
    <Section aria-readonly={true}>
      <Dropdown
        options={LIST_OPTIONS}
        defaultValue={LIST_OPTIONS.find((o) => o.value === listStatus)}
        className={clsx("w-72", isDisabled && "opacity-50 cursor-pointer")}
        isDisabled={isDisabled}
        isSearchable={false}
        onChange={(option) => {
          if (option) onListChange?.(option.value);
        }}
      />

      <div className="space-y-3">
        {isDisabled ? (
          <>
            <MediaSkeleton />
            <MediaSkeleton />
            <MediaSkeleton />
            <MediaSkeleton />
            <MediaSkeleton />
          </>
        ) : (
          media.map((media) => <Media media={media} key={media.id} />)
        )}
      </div>
    </Section>
  );
}
