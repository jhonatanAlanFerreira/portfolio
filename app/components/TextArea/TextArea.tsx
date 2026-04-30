import { forwardRef, useId } from "react";
import { TextAreaPropsInterface } from "./TextAreaProps";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaPropsInterface>(
  ({ label, errorMessage, ...rest }, ref) => {
    const inputId = useId();

    return (
      <div className="float-label-input relative h-full">
        <textarea
          ref={ref}
          id={inputId}
          placeholder=" "
          className={`focus:shadow-outline block h-full w-full appearance-none rounded-md border px-3 py-3 leading-normal text-[var(--primary)] transition-colors duration-300 hover:border-[var(--accent)]/40 focus:outline-none ${
            errorMessage ? "!border-rose-500" : "border-[var(--border-subtle)]"
          }`}
          autoComplete="off"
          {...rest}
        ></textarea>
        <label
          htmlFor={inputId}
          className={`ease-in-outbg-white pointer-events-none absolute top-3 left-0 pl-1 transition duration-200 ${
            errorMessage
              ? "text-rose-500"
              : "ml-1 text-[var(--muted)] opacity-60"
          }`}
        >
          {label}
        </label>
        {errorMessage && <p className="text-rose-500">{errorMessage}</p>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
