"use client";

import React from "react";

import User from "../common/User";
import SearchUser from "../common/SearchUser";

import type { User as UserT } from "@/libs/anilist/types";

type Props = {
  users: UserT[];
  isDisabled: boolean;

  onUserAdd?: (user: UserT) => void;
  onUserRemove?: (id: number) => void;
};

export default function UserView({
  users,
  isDisabled,
  onUserAdd,
  onUserRemove,
}: Props) {
  return (
    <>
      <SearchUser
        onChange={(option) => {
          if (option) onUserAdd?.(option.value);
        }}
        isDisabled={isDisabled}
      />

      {users.length > 0 && (
        <div className="space-y-3 pt-3">
          {users.map((user) => (
            <User user={user} key={user.id} onRemove={onUserRemove} />
          ))}
        </div>
      )}
    </>
  );
}
