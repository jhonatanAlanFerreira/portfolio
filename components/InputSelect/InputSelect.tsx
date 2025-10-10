import { forwardRef, useEffect, useId, useState } from "react";
import ReactSelect, {
  SelectInstance,
  StylesConfig,
  ActionMeta,
  GroupBase,
} from "react-select";

import Select from "react-select/base";
import { InputSelectProps } from "./InputSelectProps";

export const InputSelect = forwardRef<SelectInstance, InputSelectProps>(
  ({ dropdownPosition = "relative", onChange, ...rest }, ref) => {
    const inputId = useId();
    const [hasValue, setHasValue] = useState<boolean>(false);

    useEffect(() => {
      checkHasValue(rest.value);
    }, [rest.value]);

    const handleChange = (value: unknown, actionMeta: ActionMeta<unknown>) => {
      checkHasValue(value);
      if (onChange) {
        onChange(value, actionMeta);
      }
    };

    const checkHasValue = (value: unknown) => {
      setHasValue(!!value && (Array.isArray(value) ? !!value.length : true));
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
        color: "#FFFFFF",
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
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className={`${
            hasValue ? "has-value" : ""
          } pointer-events-none absolute top-3 left-0 ml-2 text-gray-400 opacity-60 transition duration-200 ease-in-out`}
        >
          {rest.placeholder}
        </label>
      </div>
    );
  },
);

InputSelect.displayName = "InputSelect";
