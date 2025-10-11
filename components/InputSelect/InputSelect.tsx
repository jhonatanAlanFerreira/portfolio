import { forwardRef, useId, useState } from "react";
import ReactSelect, {
  SelectInstance,
  StylesConfig,
  ActionMeta,
  GroupBase,
  InputActionMeta,
} from "react-select";

import Select from "react-select/base";
import { InputSelectProps } from "./InputSelectProps";
import { TimezoneOption } from "../pageComponents/Widgets/TimezoneWidget/TimezoneWidgetInterfaces";

export const InputSelect = forwardRef<SelectInstance, InputSelectProps>(
  (
    {
      dropdownPosition = "relative",
      placeholder = "",
      onChange,
      onInputChange,
      ...rest
    },
    ref,
  ) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const inputId = useId();

    const handleChange = (value: unknown, actionMeta: ActionMeta<unknown>) => {
      if (onChange) {
        onChange(value, actionMeta);
      }
    };

    const onInternalInputChange = (
      value: string,
      actionMeta: InputActionMeta,
    ) => {
      setSearch(value);
      if (onInputChange) {
        onInputChange(value, actionMeta);
      }
    };

    const styles: StylesConfig = {
      control: (styles) => ({
        ...styles,
        backgroundColor: "#00000080",
        border: "1px solid #47556999 !important",
        minHeight: "3rem",
        height: "auto",
      }),
      singleValue: (styles) => ({
        ...styles,
        color: "#FFFFFF",
      }),
      input: (styles) => ({
        ...styles,
        color: "#FFFFFF",
      }),
      dropdownIndicator: (styles) => ({
        ...styles,
        color: "#FFFFFF",
      }),
      indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: "#47556999",
      }),
      placeholder: (styles) => ({
        ...styles,
        color: "gray",
        opacity: "0.8",
      }),
      option: (styles, state) => ({
        ...styles,
        color: "#FFFFFF",
        backgroundColor: "#00000080",
      }),
      menu: (styles) => ({
        ...styles,
        border: "1px solid #47556999",
        position: dropdownPosition,
        width: "95%",
        background: "#00000080",
        marginLeft: "2.5%",
      }),
    };

    return (
      <div className="float-label-input relative">
        <ReactSelect
          key={(rest.options as TimezoneOption[])
            .map((opt) => opt.value)
            .join(",")}
          onMenuOpen={() => setMenuIsOpen(true)}
          onMenuClose={() => setMenuIsOpen(false)}
          menuIsOpen={menuIsOpen}
          ref={ref as React.Ref<Select<unknown, boolean, GroupBase<unknown>>>}
          inputId={inputId}
          {...rest}
          defaultInputValue={search}
          styles={styles}
          onChange={handleChange}
          onInputChange={onInternalInputChange}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

InputSelect.displayName = "InputSelect";
