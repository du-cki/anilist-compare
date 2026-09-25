import type { APIRoute } from "astro";
import { anilist, DEFAULT_LIST_STATUS, ListOptions, MediaType } from "../../../utils";

export const POST: APIRoute = async ({ params, url }) => {
  const rawUsers = params.users;
  const usersArray = rawUsers ? rawUsers.split("/") : [];

  if (usersArray.length < 2) {
    return new Response(
      JSON.stringify({ error: "At least two users are required for comparison." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const listQuery = url.searchParams.get("list");
  const typeQuery = url.searchParams.get("type");

  const listStatus =
    ListOptions.find((o) => o.value === listQuery?.toUpperCase())?.value ||
    DEFAULT_LIST_STATUS;

  const mediaType =
    MediaType.find((o) => o.value === typeQuery?.toUpperCase())?.value ||
    MediaType[0].value;


  try {
    const media = await anilist.compareUserMediaLists({
      users: usersArray,
      listStatus,
      mediaType,
    });

    return new Response(JSON.stringify(media), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to compare user media lists." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};