import fetchComparedMedia from "@/utils/actions/fetchComparedMedia";

import { DEFAULT_LIST_STATUS, LIST_OPTIONS } from "@/utils/common";

import { type NextRequest, NextResponse } from "next/server";

import type { ListStatus } from "@/libs/anilist/types";

const json = (data: any, status: number = 200) =>
  NextResponse.json(data, { status });

export const POST = async (req: NextRequest) => {
  if (!req.url) return;
  const { pathname, searchParams } = new URL(req.url);

  let listType = searchParams.get("list")?.toUpperCase();
  if (listType) {
    if (!LIST_OPTIONS.some((o) => o.value === listType)) {
      const listOptions = LIST_OPTIONS.map((option) => option.value);

      return json(
        {
          error: `Invalid list type, expected: ${listOptions.join(", ")}`,
        },
        400
      );
    }
  } else {
    listType = DEFAULT_LIST_STATUS;
  }

  let type = searchParams.get("type")?.toUpperCase();
  if (type) {
    if (!["ANIME", "MANGA"].some((o) => o === type)) {
      return json(
        {
          error: "Invalid type, expected: ANIME or MANGA",
        },
        400
      );
    }
  } else {
    type = "ANIME";
  }

  const users = pathname.split("/").slice(1);
  if (users.length <= 1) {
    return json(
      {
        error: "Please provide at least 2 users",
      },
      400
    );
  }

  try {
    const req = await fetchComparedMedia(
      users,
      listType as ListStatus,
      "ANIME"
    );

    return json(req);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: JSON.parse(error.message),
      },
      { status: 400 }
    );
  }
};
