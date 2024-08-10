import React from "react";

import debounce from "debounce";
import userOptions from "@/utils/actions/userOptions";

import AsyncReactSelect from "react-select/async";

type OPTION_TYPE = {
  label: string;
  value: any;
  disabled?: boolean;
};

const loadUserOptions = debounce(
  (search: string, callback: (options: OPTION_TYPE[]) => void) => {
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

export default function SearchUser() {
  return (
    <AsyncReactSelect
      placeholder="Search"
      cacheOptions={true}
      instanceId="search_user"
      formatOptionLabel={(option) => (
        <div className="flex items-center space-x-3 py-2">
          <img
            src={option.value.avatar.large}
            height={35}
            width={35}
            className="rounded-md"
          />

          <p className="text-black">{option.label}</p>
        </div>
      )}
      loadOptions={loadUserOptions}
      isOptionDisabled={(option) => !!option.disabled}
      onChange={(value) => console.log(value)}
    />
  );
}
