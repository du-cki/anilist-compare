import React from "react";

import Image from "next/image";

import debounce from "debounce";
import userOptions from "@/utils/actions/userOptions";

import AsyncSelect from "react-select/async";

import AsyncDropdown from "./AsyncDropdown";
import type { OptionT } from "./Dropdown";

const loadUserOptions = debounce(
  (search: string, callback: (options: OptionT[]) => void) => {
    userOptions(search).then((options) => {
      callback(
        options.map((user) => ({
          label: user.name,
          value: user,
        }))
      );
    });
  },
  500
);

type Props = {} & React.ComponentProps<typeof AsyncSelect<OptionT>>;

export default function SearchUser({ ...props }: Props) {
  return (
    <AsyncDropdown
      placeholder="Search"
      cacheOptions={true}
      instanceId="search_user"
      value={null}
      className="searchable"
      loadOptions={loadUserOptions}
      formatOptionLabel={(option: OptionT) => (
        <div className="flex items-center space-x-3 max-h-[40px] min-h-[40px] overflow-hidden">
          <Image
            src={option.value.avatar.large}
            alt={`${option.value.name}'s avatar`}
            loading="lazy"
            height={35}
            width={35}
            className="rounded-md"
          />

          <p>{option.label}</p>
        </div>
      )}
      {...props}
    />
  );
}
