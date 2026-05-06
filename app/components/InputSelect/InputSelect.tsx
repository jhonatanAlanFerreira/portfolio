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
      isLoading,
      onChange,
      onInputChange,
      noOptionsCustomMessage,
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
      control: (base, state) => ({
        ...base,
        background:
          "linear-gradient(135deg, rgba(11,22,35,0.75), rgba(15,27,46,0.65))",
        border: `1px solid ${
          state.isFocused
            ? "rgba(56,189,248,0.6)"
            : "rgba(71,85,105,0.4)"
        }`,
        boxShadow: state.isFocused
          ? "0 0 0 1px rgba(56,189,248,0.4)"
          : "none",
        backdropFilter: "blur(10px)",
        minHeight: "3rem",
        transition: "all 0.2s ease",
        ":hover": {
          border: "1px solid rgba(56,189,248,0.4)",
        },
      }),

      singleValue: (base) => ({
        ...base,
        color: "#e5e7eb",
      }),

      input: (base) => ({
        ...base,
        color: "#e5e7eb",
      }),

      placeholder: (base) => ({
        ...base,
        color: "#94a3b8",
        opacity: 0.7,
      }),

      dropdownIndicator: (base) => ({
        ...base,
        color: "#94a3b8",
        ":hover": {
          color: "#38bdf8",
        },
      }),

      indicatorSeparator: () => ({
        display: "none",
      }),

      option: (base, state) => ({
        ...base,
        background: state.isFocused
          ? "rgba(56,189,248,0.15)"
          : "transparent",
        color: "#e5e7eb",
        cursor: "pointer",
        ":active": {
          background: "rgba(56,189,248,0.25)",
        },
      }),

      menu: (base) => ({
        ...base,
        background:
          "linear-gradient(135deg, rgba(11,22,35,0.95), rgba(15,27,46,0.9))",
        border: "1px solid rgba(71,85,105,0.4)",
        backdropFilter: "blur(12px)",
        borderRadius: "0.5rem",
        overflow: "hidden",
        position: dropdownPosition,
        width: "100%",
        marginTop: "0.25rem",
      }),

      menuList: (base) => ({
        ...base,
        maxHeight: "200px",
      }),
    };

    return (
      <div className="relative">
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
          isLoading={menuIsOpen && isLoading}
          autoFocus={menuIsOpen}
          noOptionsMessage={({ inputValue }) =>
            isLoading
              ? "Searching..."
              : inputValue
                ? noOptionsCustomMessage?.empty
                : noOptionsCustomMessage?.beforeTyping
          }
          classNames={{
            menuList: () => "gray-scroll",
          }}
        />
      </div>
    );
  },
);

InputSelect.displayName = "InputSelect";