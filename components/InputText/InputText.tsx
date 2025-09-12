import { forwardRef, useId } from "react";
import { InputTextPropsInterface } from "./InputTextPropsInterface";

export const InputText = forwardRef<HTMLInputElement, InputTextPropsInterface>(
  ({ label, errorMessage, ...rest }, ref) => {
    const inputId = useId();

    return (
      <div className="relative float-label-input">
        <input
          type="text"
          id={inputId}
          placeholder=" "
          className={`block w-full bg-black/50 focus:outline-none focus:shadow-outline border hover:border-slate-400/50 transition-colors duration-300 rounded-md py-3 px-3 appearance-none leading-normal text-white ${
            errorMessage ? "border-rose-500" : "border-slate-600/60"
          }`}
          autoComplete="off"
          ref={ref}
          {...rest}
        />
        <label
          htmlFor={inputId}
          className={`absolute top-3 left-0 pointer-events-none transition duration-200 ease-in-out px-1 text-white ${
            errorMessage ? "!text-rose-500" : "!text-white opacity-60 ml-1"
          }`}
        >
          {label}
        </label>
        {errorMessage && <p className="text-rose-500">* {errorMessage}</p>}
      </div>
    );
  }
);

InputText.displayName = "InputText";
