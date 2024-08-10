import React from "react";

import clsx from "clsx";

import AsyncSelect from "react-select/async";

import type { OptionT } from "./Dropdown";

type Props = { className?: string } & React.ComponentProps<
  typeof AsyncSelect<OptionT>
>;

export default function Dropdown({ className, ...props }: Props) {
  return (
    <AsyncSelect
      className={clsx("react-select-theme-container", className)}
      classNamePrefix="react-select-theme"
      noOptionsMessage={() => null}
      isOptionDisabled={(option) => !!option.disabled}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      {...props}
    />
  );
}
