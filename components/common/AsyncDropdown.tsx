import React from "react";

import AsyncSelect from "react-select/async";
import type { OptionT } from "./Dropdown";

type Props = {} & React.ComponentProps<typeof AsyncSelect<OptionT>>;

export default function Dropdown({ ...props }: Props) {
  return (
    <AsyncSelect
      className="react-select-theme-container"
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
