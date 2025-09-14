import { InputText } from "@/components/InputText/InputText";
import { TextArea } from "@/components/TextArea/TextArea";
import { useForm } from "react-hook-form";

export default function Contact() {
  return (
    <div className="flex flex-col gap-3 w-full h-full bg-black/80 p-4 border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 rounded-lg text-center">
      <p className="text-gray-400 font-bold text-lg">
        Whether you’d like to share feedback or simply say hi, feel free to
        reach out.
      </p>
      <div className="mt-10 flex w-full gap-3">
        <div className="flex-1">
          <InputText label="Name"></InputText>
        </div>
        <div className="flex-1">
          <InputText label="Email"></InputText>
        </div>
      </div>
      <div className="flex-1">
        <TextArea label="Message"></TextArea>
      </div>
      <div className="flex justify-end grayscale">
        <button className="cursor-pointer text-white h-10 relative px-6 py-2 rounded-lg bg-slate-950/80 transition duration-300 hover:bg-slate-950/70 hover:shadow-sm hover:shadow-slate-500/20">
          Send
        </button>
      </div>
    </div>
  );
}
