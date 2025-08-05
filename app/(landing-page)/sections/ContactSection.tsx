import { useState } from "react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Icon } from "@iconify/react";
import { contactInfos } from "@/data/contact-infos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must contain at least 5 characters")
    .max(100, "Email must not exceed 100 characters"),
  message: z
    .string()
    .min(5, "Your message must contain at least 5 characters")
    .max(1000, "Your message must not exceed 1000 characters"),
  honeypot: z.string().max(0, "Invalid field").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          formType: "contact",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detailed error:", errorData);
        throw new Error(errorData.error || "Error sending message");
      }

      reset();
      setFormSubmitted(true);
    } catch (error) {
      console.error("Complete error:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionLayout className="relative" id="contact">
      <div className="grid w-full grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[18px]">
            <h2 className="font-syne text-[26px] text-secondary md:text-[32px]">
              Template Contact Section
            </h2>
            <p className="text-lg text-secondary/75">
              This is a demo contact form for the Next.js template. Replace with
              your actual contact information.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            <div className="flex items-center gap-4">
              <Icon icon="mdi:email" className="h-8 w-8 text-secondary" />
              <span className="text-lg text-secondary/75">
                {contactInfos.email}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Icon icon="mdi:phone" className="h-8 w-8 text-secondary" />
              <span className="text-lg text-secondary/75">
                {contactInfos.phone}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Icon icon="mdi:map-marker" className="h-8 w-8 text-secondary" />
              <div className="flex flex-col text-lg text-secondary/75">
                <span>{contactInfos.address.street}</span>
                <span>{contactInfos.address.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative translate-y-[80px] rounded-xl border-[1px] bg-primary p-8 shadow-sm lg:absolute lg:bottom-[-100px] lg:right-0 lg:w-full lg:max-w-2xl lg:translate-y-0">
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-tertiary">
                  <Icon icon="mdi:check" className="h-8 w-8 text-tertiary" />
                </div>
                <h3 className="mb-4 font-syne text-2xl text-secondary">
                  Message sent!
                </h3>
                <p className="mb-8 text-secondary/75">
                  Thank you for contacting us. We'll get back to you as soon as
                  possible.
                </p>
                <PrimaryButton
                  text="NEW MESSAGE"
                  onClick={() => setFormSubmitted(false)}
                />
              </div>
            ) : (
              <>
                <h3 className="mb-6 font-syne text-2xl text-secondary">
                  Contact Form
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot field */}
                  <div className="hidden">
                    <input
                      type="text"
                      {...register("honeypot")}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Your name"
                      {...register("name")}
                      className="w-full rounded-xl border border-tertiary px-4 py-3 text-secondary/75 placeholder-secondary/75 focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/10"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your email"
                      {...register("email")}
                      className="w-full rounded-xl border border-tertiary px-4 py-3 text-secondary/75 placeholder-secondary/75 focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/10"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="Your message"
                      rows={4}
                      {...register("message")}
                      className="w-full rounded-xl border border-tertiary px-4 py-3 text-secondary/75 placeholder-secondary/75 focus:border-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary/10"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-start pt-2">
                    {isSubmitting ? (
                      <div className="flex w-fit items-center gap-2 rounded-xl bg-tertiary px-6 py-2 text-sm uppercase tracking-wide text-primary opacity-70">
                        <Icon
                          icon="mdi:loading"
                          className="h-4 w-4 animate-spin"
                        />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <PrimaryButton
                        text="SEND"
                        onClick={handleSubmit(onSubmit)}
                      />
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
