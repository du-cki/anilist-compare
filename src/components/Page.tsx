import React, { useEffect, useState } from "react";

import {
  anilist,
  debounce,
  DEFAULT_LIST_STATUS,
  ListOptions,
  MediaType,
} from "../../utils";

import Dropdown, { type OptionT } from "./Dropdown";
import User from "./User";

import type {
  User as UserT,
  ListStatus as ListStatusT,
  MediaType as MediaTypeT,
  ComparedListResponse,
} from "../../libs/anilist/types";
import Media from "./Media";

const searchUsers = debounce(
  (search: string, callback: (options: OptionT[]) => void) => {
    anilist.searchUsers(search).then((options) => {
      callback(
        options.map((user) => ({
          label: user.name,
          value: user,
        })),
      );
    });
  },
  700,
);

export default function Page({
  initialUsers,
  initialListStatus,
  initialMediaType,
}: {
  initialUsers: UserT[];
  initialListStatus: ListStatusT;
  initialMediaType: MediaTypeT;
}) {
  const [users, setUsers] = useState<UserT[]>(initialUsers);
  const [listStatus, setListStatus] = useState<ListStatusT>(initialListStatus);
  const [mediaType, setMediaType] = useState<MediaTypeT>(initialMediaType);

  const [compared, setCompared] = useState<ComparedListResponse | null>(null);

  useEffect(() => {
    if (users.length < 2) return;

    setCompared(null);
    anilist
      .compareUserMediaLists({
        users: users.map((u) => u.name),
        listStatus,
        mediaType,
      })
      .then(setCompared);
  }, [users, listStatus, mediaType]);

  useEffect(() => {
    const newPath =
      users.length > 0
        ? `/${users.map((u) => encodeURIComponent(u.name)).join("/")}`
        : "/";

    const params = new URLSearchParams(window.location.search);
    params.set("list", listStatus);
    params.set("type", mediaType);

    const newUrl = `${newPath}?${params.toString()}`;

    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [users, listStatus, mediaType]);

  return (
    <div className="space-y-10">
      <Dropdown
        type="async"
        placeholder="Search"
        className="searchable"
        cacheOptions={true}
        instanceId="search_user"
        onChange={(option) =>
          option && setUsers((users) => [...users, option.value])
        }
        value={null}
        loadOptions={searchUsers}
        formatOptionLabel={(option: OptionT) => (
          <div className="flex items-center space-x-3 h-10 overflow-hidden">
            <img
              src={option.value.avatar.large}
              alt={`${option.value.name}'s avatar`}
              loading="eager"
              height={35}
              width={35}
              className="rounded-md h-8.75 w-8.75 object-cover"
            />

            <p>{option.label}</p>
          </div>
        )}
      />

      <div className="space-y-2">
        {users.map((user) => (
          <User
            key={user.name}
            user={user}
            onRemove={() =>
              setUsers((oldUsers) =>
                oldUsers.filter((user_) => user_.id !== user.id),
              )
            }
          />
        ))}
      </div>

      {users.length > 0 && (
        <div className="flex justify-between gap-3">
          <Dropdown
            type="sync"
            options={ListOptions}
            value={ListOptions.find((opt) => opt.value == listStatus)}
            onChange={(option) => option && setListStatus(option.value)}
            className="w-1/2"
          />

          <Dropdown
            type="sync"
            options={MediaType}
            value={MediaType.find((opt) => opt.value == mediaType)}
            onChange={(option) => option && setMediaType(option.value)}
            className="w-1/2"
          />
        </div>
      )}

      {compared && (
        <div className="space-y-8">
          {compared.map((media) => (
            <Media key={media.id} media={media} />
          ))}
        </div>
      )}
    </div>
  );
}
