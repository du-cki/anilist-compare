import React from "react";

import clsx from "clsx";

import Select from "react-select";
import AsyncSelect from "react-select/async";

export type OptionT = {
  label: string;
  value: any;
  disabled?: boolean;
};

type Props = { className?: string } & (
  | ({ type?: "sync" } & React.ComponentProps<typeof Select<OptionT>>)
  | ({ type: "async" } & React.ComponentProps<typeof AsyncSelect<OptionT>>)
);

export default function Dropdown({ className, type, ...props }: Props) {
  const commonProps:
    | React.ComponentProps<typeof Select<OptionT>>
    | React.ComponentProps<typeof AsyncSelect<OptionT>> = {
    unstyled: true,
    classNamePrefix: "react-select-theme",
    className: clsx("react-select-theme-container", className),
    noOptionsMessage: () => null,
    isOptionDisabled: (option) => !!option.disabled,
    components: {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
    },
  };

  if (type === "async") {
    return <AsyncSelect {...commonProps} {...props} />;
  }

  return <Select {...commonProps} {...props} />;
}
