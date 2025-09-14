import { InputText } from "@/components/InputText/InputText";
import { TextArea } from "@/components/TextArea/TextArea";
import { useForm } from "react-hook-form";
import { ContactData } from "./ContactInterfaces";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>();

  const sendEmail = (data: ContactData) => {
    console.log(data);
  };

  return (
    <form className="h-full" onSubmit={handleSubmit((data) => sendEmail(data))}>
      <div className="flex flex-col gap-3 w-full h-full bg-black/80 p-4 border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 rounded-lg text-center">
        <p className="text-gray-400 font-bold text-lg">
          Whether you’d like to share feedback or simply say hi, feel free to
          reach out.
        </p>
        <div className="mt-10 flex w-full gap-3">
          <div className="flex-1">
            <InputText
              errorMessage={errors.name && errors.name.message?.toString()}
              {...register("name", { required: "Name is required" })}
              label="Name"
            ></InputText>
          </div>
          <div className="flex-1">
            <InputText
              errorMessage={errors.email && errors.email.message?.toString()}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              label="Email"
            ></InputText>
          </div>
        </div>
        <div className="flex-1">
          <TextArea
            errorMessage={errors.message && errors.message.message?.toString()}
            {...register("message", { required: "Message is required" })}
            label="Message"
          ></TextArea>
        </div>
        <div className="flex justify-end grayscale">
          <button className="hover:scale-105 cursor-pointer text-white h-10 relative px-6 py-2 rounded-lg bg-slate-950/80 transition duration-300 hover:bg-slate-950/70 hover:shadow-sm hover:shadow-slate-500/20">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
