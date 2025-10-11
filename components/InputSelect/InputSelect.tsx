import { forwardRef, useId } from "react";
import ReactSelect, {
  SelectInstance,
  StylesConfig,
  ActionMeta,
  GroupBase,
} from "react-select";

import Select from "react-select/base";
import { InputSelectProps } from "./InputSelectProps";

export const InputSelect = forwardRef<SelectInstance, InputSelectProps>(
  (
    { dropdownPosition = "relative", placeholder = "", onChange, ...rest },
    ref,
  ) => {
    const inputId = useId();

    const handleChange = (value: unknown, actionMeta: ActionMeta<unknown>) => {
      if (onChange) {
        onChange(value, actionMeta);
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
          ref={ref as React.Ref<Select<unknown, boolean, GroupBase<unknown>>>}
          inputId={inputId}
          {...rest}
          styles={styles}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

InputSelect.displayName = "InputSelect";
