import { InputHTMLAttributes } from "react";

export interface InputTextPropsInterface
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}
