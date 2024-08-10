export type AniListError = {
  errors: {
    message: string;
    status: number;
  }[];
  data: null;
};

type BaseResponse<T> = {
  data: T;
};

export type SearchType = "ANIME" | "MANGA";

export type ListType =
  | "COMPLETED"
  | "CURRENT"
  | "PLANNING"
  | "DROPPED"
  | "REPEATING"
  | "PAUSED";

export type Media = {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
};

export type MediaList = {
  lists: {
    name: ListType;
    entries: {
      media: Media;
    }[];
  }[];
};

export type User = {
  id: number;
  name: string;
  avatar: {
    large: string;
  };
};

export type AniListUserResponse = BaseResponse<Record<string, User>>;
export type AniListMediaResponse = BaseResponse<Record<string, MediaList>>;
