import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import rateLimit from "@/lib/rate-limit";

export const runtime = "nodejs";

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

// Schéma adapté pour le formulaire de contact de Template Next JS
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z
    .string()
    .email("Format d'email invalide")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Format d'email invalide"
    ),
  message: z
    .string()
    .min(5, "Le message doit contenir au moins 5 caractères")
    .max(1000, "Le message ne doit pas dépasser 1000 caractères"),
  honeypot: z.string().max(0).optional(),
  formType: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.MAIL_TO ||
      !process.env.MAIL_FROM
    ) {
      throw new Error(
        "Variables d'environnement manquantes pour l'envoi d'emails"
      );
    }

    // Initialisation de Resend à l'intérieur de la fonction
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Rate limiting
    try {
      await limiter.check(5, "CONTACT_RATE_LIMIT");
    } catch {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    if (validatedData.honeypot) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: validatedData.email,
      subject: `Nouveau message de contact - ${validatedData.name}`,
      html: `
  <div style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f5f5f5; color: #303234; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <!-- En-tête -->
      <div style="background-color: #D91F10; padding: 40px 30px; text-align: center;">
        <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: 700;">Nouveau Message</h1>
        <p style="color: #FFFFFF; margin: 10px 0 0; font-size: 16px;">
          Via le formulaire de contact
        </p>
      </div>
      
      <!-- Contenu principal -->
      <div style="padding: 40px 30px; background-color: #FFFFFF;">
        <div style="margin-bottom: 35px;">
          <h2 style="color: #D91F10; font-size: 20px; margin: 0 0 25px 0; font-weight: 600; border-bottom: 1px solid #e0e0e0; padding-bottom: 12px;">
            Informations de contact
          </h2>
          
          <div style="display: table; width: 100%;">
            <div style="display: table-row;">
              <div style="display: table-cell; padding: 12px 16px 12px 0; font-weight: 500; color: #666; width: 100px;">Nom</div>
              <div style="display: table-cell; padding: 12px 0; color: #303234;">${validatedData.name}</div>
            </div>
            <div style="display: table-row;">
              <div style="display: table-cell; padding: 12px 16px 12px 0; font-weight: 500; color: #666;">Email</div>
              <div style="display: table-cell; padding: 12px 0; color: #303234;">
                <a href="mailto:${validatedData.email}" style="color: #D91F10; text-decoration: none; font-weight: 500;">${validatedData.email}</a>
              </div>
            </div>
          </div>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 25px; border-radius: 8px; border-left: 4px solid #D91F10; margin-bottom: 30px;">
          <h3 style="color: #D91F10; font-size: 18px; margin-top: 0; margin-bottom: 16px; font-weight: 600;">Message</h3>
          <p style="color: #303234; margin: 0; line-height: 1.7; white-space: pre-wrap; font-size: 15px;">${validatedData.message}</p>
        </div>
      </div>
      
      <!-- Pied de page -->
      <div style="background-color: #f5f5f5; padding: 25px; text-align: center; color: #666;">
        <p style="margin: 0; font-size: 14px;">
          Message reçu le ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })} à ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  </div>
`,
    });

    if (error) {
      console.error("Erreur Resend détaillée:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email", details: error },
        { status: 500 }
      );
    }

    if (!data?.id) {
      return NextResponse.json(
        { error: "L'email n'a pas pu être envoyé" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès",
      id: data.id,
    });
  } catch (error) {
    console.error("Erreur:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erreur lors du traitement de la demande" },
      { status: 500 }
    );
  }
}
