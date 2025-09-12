import { forwardRef, useId } from "react";
import { TextAreaPropsInterface } from "./TextAreaProps";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaPropsInterface>(
  ({ label, errorMessage, ...rest }, ref) => {
    const inputId = useId();

    return (
      <div className="relative float-label-input">
        <textarea
          ref={ref}
          id={inputId}
          placeholder=" "
          className={`block w-full bg-black/50 focus:outline-none focus:shadow-outline border hover:border-slate-400/50 transition-colors duration-300 rounded-md py-3 px-3 appearance-none leading-normal text-white ${
            errorMessage ? "!border-rose-500" : "border-slate-600/60"
          }`}
          autoComplete="off"
          {...rest}
        ></textarea>
        <label
          htmlFor={inputId}
          className={`absolute top-3 left-0 pl-1 pointer-events-none transition duration-200 ease-in-outbg-white ${
            errorMessage ? "text-rose-500" : "text-gray-400 opacity-60 ml-1"
          }`}
        >
          {label}
        </label>
        {errorMessage && <p className="text-rose-500">* {errorMessage}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
