import clsx from "clsx";
import React from "react";

import Select from "react-select";

export type OptionT = {
  label: string;
  value: any;
  disabled?: boolean;
};

type Props = { className?: string } & React.ComponentProps<
  typeof Select<OptionT>
>;

export default function Dropdown({ className, ...props }: Props) {
  return (
    <Select
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
