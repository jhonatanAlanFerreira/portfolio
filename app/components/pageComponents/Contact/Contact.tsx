"use client";
import { InputText } from "@/app/components/InputText/InputText";
import { TextArea } from "@/app/components/TextArea/TextArea";
import { useForm } from "react-hook-form";
import { ContactData } from "./ContactInterfaces";
import { sendEmailAction } from "./ContactActions";
import { useState } from "react";
import PageLoading from "@/app/components/PageLoading/PageLoading";
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
    <div className="relative h-full w-full pb-10 sm:pb-0">
      <Toaster position="top-right" />

      <form className="h-full" onSubmit={handleSubmit(sendEmail)}>
        <div className="flex h-full w-full flex-col gap-3 rounded-lg border border-[var(--border-subtle)] bg-[rgba(11,22,35,0.6)] p-4 text-center backdrop-blur-md transition-colors duration-300 hover:border-[var(--accent)]/40">
          <p className="text-sm font-bold text-[var(--muted)] lg:text-lg">
            Whether you’d like to share feedback or simply say hi, feel free to
            reach out.
          </p>

          <div className="flex w-full gap-3 lg:mt-10">
            <InputText
              errorMessage={errors.name?.message}
              {...register("name", { required: "Name is required" })}
              label="Name"
            />
            <InputText
              errorMessage={errors.email?.message}
              {...register("email", {
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
                    className="relative h-10 cursor-pointer rounded-lg bg-[rgba(255,255,255,0.05)] px-6 py-2 text-[var(--primary)] transition duration-300 hover:scale-105 hover:bg-[rgba(255,255,255,0.08)] hover:shadow-[0_0_12px_rgba(2,218,222,0.2)]"
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
