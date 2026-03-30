import { forwardRef, useId } from "react";
import { InputTextPropsInterface } from "./InputTextProps";

export const InputText = forwardRef<HTMLInputElement, InputTextPropsInterface>(
  ({ label, errorMessage, ...rest }, ref) => {
    const inputId = useId();

    return (
      <div className="float-label-input relative">
        <input
          type="text"
          id={inputId}
          placeholder=" "
          className={`focus:shadow-outline block w-full appearance-none rounded-md border bg-black/50 px-3 py-3 leading-normal text-white transition-colors duration-300 hover:border-slate-400/50 focus:outline-none ${
            errorMessage ? "!border-rose-500" : "border-slate-600/60"
          }`}
          autoComplete="off"
          ref={ref}
          {...rest}
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute top-3 left-0 px-1 transition duration-200 ease-in-out ${
            errorMessage ? "text-rose-500" : "ml-1 text-gray-400 opacity-60"
          }`}
        >
          {label}
        </label>
        {errorMessage && <p className="text-rose-500">{errorMessage}</p>}
      </div>
    );
  },
);

InputText.displayName = "InputText";
