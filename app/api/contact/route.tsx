import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import rateLimit from "@/lib/rate-limit";

export const runtime = "nodejs";

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

// Schema adapted for the Next.js template contact form
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  message: z
    .string()
    .min(5, "Message must contain at least 5 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
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
      throw new Error("Missing environment variables for email sending");
    }

    // Initialize Resend inside the function
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Rate limiting
    try {
      await limiter.check(5, "CONTACT_RATE_LIMIT");
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    if (validatedData.honeypot) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: validatedData.email,
      subject: `New contact message - ${validatedData.name}`,
      html: `
  <div style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f5f5f5; color: #303234; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <!-- Header -->
      <div style="background-color: #D91F10; padding: 40px 30px; text-align: center;">
        <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: 700;">New Message</h1>
        <p style="color: #FFFFFF; margin: 10px 0 0; font-size: 16px;">
          Via the contact form
        </p>
      </div>
      
      <!-- Main content -->
      <div style="padding: 40px 30px; background-color: #FFFFFF;">
        <div style="margin-bottom: 35px;">
          <h2 style="color: #D91F10; font-size: 20px; margin: 0 0 25px 0; font-weight: 600; border-bottom: 1px solid #e0e0e0; padding-bottom: 12px;">
            Contact Information
          </h2>
          
          <div style="display: table; width: 100%;">
            <div style="display: table-row;">
              <div style="display: table-cell; padding: 12px 16px 12px 0; font-weight: 500; color: #666; width: 100px;">Name</div>
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
      
      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 25px; text-align: center; color: #666;">
        <p style="margin: 0; font-size: 14px;">
          Message received on ${new Date().toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })} at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  </div>
`,
    });

    if (error) {
      console.error("Detailed Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Error sending email", details: error },
        { status: 500 }
      );
    }

    if (!data?.id) {
      return NextResponse.json(
        { error: "Email could not be sent" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      id: data.id,
    });
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 500 }
    );
  }
}
