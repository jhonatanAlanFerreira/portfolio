import { InputText } from "@/components/InputText/InputText";
import { useForm } from "react-hook-form";

export default function Contact() {
  return (
    <div className="w-full h-full bg-black/50 p-4 border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 rounded-lg text-center">
      <p className="text-gray-400 font-bold text-lg">
        Whether you’d like to share feedback or simply say hi, feel free to
        reach out.
      </p>
      <div className="flex w-full gap-3">
        <div className="flex-1">
          <InputText label="Name"></InputText>
        </div>
        <div className="flex-1">
          <InputText label="Email"></InputText>
        </div>
      </div>
    </div>
  );
}
