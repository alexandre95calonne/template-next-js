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
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères"),
  email: z
    .string()
    .email("Adresse email invalide")
    .min(5, "L'email doit contenir au moins 5 caractères")
    .max(100, "L'email ne doit pas dépasser 100 caractères"),
  message: z
    .string()
    .min(5, "Votre message doit contenir au moins 5 caractères")
    .max(1000, "Votre message ne doit pas dépasser 1000 caractères"),
  honeypot: z.string().max(0, "Champ invalide").optional(),
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
        console.error("Erreur détaillée:", errorData);
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }

      reset();
      setFormSubmitted(true);
    } catch (error) {
      console.error("Erreur complète:", error);
      alert(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionLayout className="relative" id="contact">
      <div className="grid w-full grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[18px]">
            <h2 className="font-anton text-[26px] text-secondary md:text-[32px]">
              Un projet ? Contactez-nous !
            </h2>
            <p className="text-lg text-secondary/75">
              Confiez-nous la pose de vos clôtures et portails, nous
              garantissons une réponse en 48h.
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
                <h3 className="mb-4 font-anton text-2xl text-secondary">
                  Message envoyé !
                </h3>
                <p className="mb-8 text-secondary/75">
                  Merci de nous avoir contacté. Nous vous répondrons dans les
                  meilleurs délais.
                </p>
                <PrimaryButton
                  text="NOUVEAU MESSAGE"
                  onClick={() => setFormSubmitted(false)}
                  variant="TertiaryWithIcon"
                />
              </div>
            ) : (
              <>
                <h3 className="mb-6 font-anton text-2xl text-secondary">
                  Bonjour,
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
                      placeholder="Votre nom"
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
                      placeholder="Votre mail"
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
                      placeholder="Votre message"
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
                        <span>Envoi en cours...</span>
                      </div>
                    ) : (
                      <PrimaryButton
                        text="ENVOYER"
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
