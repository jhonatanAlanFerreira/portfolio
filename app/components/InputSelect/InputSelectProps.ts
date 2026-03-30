import { Props } from "react-select";

export interface InputSelectProps extends Props {
  dropdownPosition?: "absolute" | "relative";
  placeholder?: string;
  noOptionsCustomMessage?: {
    empty: string;
    beforeTyping: string;
  };
}
