import React from "react";

import clsx from "clsx";
import { CARD_COMMON_CLASSES } from "./User";

type Props = {};

export default function MediaSkeleton({}: Props) {
  return (
    <div
      className={clsx(
        CARD_COMMON_CLASSES,
        "flex items-center min-h-[90px] relative overflow-clip animate-pulse"
      )}
    />
  );
}
