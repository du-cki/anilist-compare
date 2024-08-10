"use client";

import React from "react";

import User from "../common/User";
import SearchUser from "../common/SearchUser";

import Section from "./Section";

import type { User as UserT } from "@/libs/anilist/types";

type Props = {
  users: UserT[];
  isDisabled: boolean;

  onUserAdd?: (user: UserT) => void;
  onUserRemove?: (id: number) => void;
  refetch?: (...args: any) => Promise<void>;
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
        <Section title="Users">
          <div className="space-y-3">
            {users.map((user) => (
              <User user={user} key={user.id} onRemove={onUserRemove} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
