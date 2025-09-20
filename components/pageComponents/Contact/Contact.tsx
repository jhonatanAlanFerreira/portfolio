"use client";
import { InputText } from "@/components/InputText/InputText";
import { TextArea } from "@/components/TextArea/TextArea";
import { useForm } from "react-hook-form";
import { ContactData } from "./ContactInterfaces";
import { sendEmailAction } from "./ContactActions";
import { useState } from "react";
import PageLoading from "@/components/PageLoading/PageLoading";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaIsValid, setCaptchaIsValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>();

  const sendEmail = (data: ContactData) => {
    if (!captchaToken) return;
    setLoading(true);

    sendEmailAction({ ...data, captchaToken }).then((res) => {
      if (res.success) {
        reset();
        setCaptchaIsValid(false);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    });
  };

  return (
    <div className="relative w-full h-full">
      <Toaster position="top-right" />

      <form className="h-full" onSubmit={handleSubmit(sendEmail)}>
        <div className="flex flex-col gap-3 w-full h-full bg-black/80 p-4 border border-slate-600/60 hover:border-slate-400/50 transition-colors duration-300 rounded-lg text-center">
          <p className="text-gray-400 font-bold text-lg">
            Whether you’d like to share feedback or simply say hi, feel free to
            reach out.
          </p>

          <div className="mt-10 flex w-full gap-3">
            <InputText
              errorMessage={errors.name?.message}
              {...register("name", { required: "Name is required" })}
              label="Name"
            />
            <InputText
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              label="Email"
            />
          </div>

          <TextArea
            errorMessage={errors.message?.message}
            {...register("message", { required: "Message is required" })}
            label="Message"
          />

          <div className="flex justify-end grayscale">
            {loading ? (
              <div className="pt-2">
                <PageLoading loading={loading} />
              </div>
            ) : (
              <>
                {captchaIsValid && (
                  <button
                    disabled={!captchaToken}
                    className="hover:scale-105 cursor-pointer text-white h-10 relative px-6 py-2 rounded-lg bg-slate-950/80 transition duration-300 hover:bg-slate-950/70 hover:shadow-sm hover:shadow-slate-500/20"
                  >
                    Send
                  </button>
                )}
                <div className="relative min-h-5" hidden={captchaIsValid}>
                  <div className="absolute right-1 pt-2">
                    <PageLoading loading={true}></PageLoading>
                  </div>
                  <div className="relative z-2">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onExpired={() => setCaptchaIsValid(false)}
                      onChange={(token) => {
                        if (token) {
                          setCaptchaToken(token);
                          return setTimeout(() => setCaptchaIsValid(true), 500);
                        }
                        setCaptchaIsValid(false);
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
