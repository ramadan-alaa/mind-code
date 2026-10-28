import { z } from "zod";

export function buildEnrollmentSchema(
  copy: (en: string, ar: string) => string,
) {
  const required = copy("Please complete this field.", "يرجى ملء هذا الحقل.");
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(
          2,
          copy(
            "Enter a name with at least 2 characters.",
            "اكتب اسم من حرفين على الأقل.",
          ),
        )
        .max(
          100,
          copy("Use no more than 100 characters.", "الحد الأقصى ١٠٠ حرف."),
        ),
      guardian: z
        .string()
        .trim()
        .max(
          100,
          copy("Use no more than 100 characters.", "الحد الأقصى ١٠٠ حرف."),
        ),
      age: z.string().min(1, required),
      course: z.enum(["html", "css", "javascript", "react"], {
        message: required,
      }),
      experience: z.string().min(1, required),
      method: z.string().min(1, required),
      phone: z
        .string()
        .trim()
        .regex(
          /^\+?[\d\s()-]{8,22}$/,
          copy(
            "Enter a valid contact number (8–15 digits).",
            "أدخل رقم تواصل صحيح (٨–١٥ رقمًا).",
          ),
        )
        .refine(
          (v) => {
            const count = v.replace(/\D/g, "").length;
            return count >= 8 && count <= 15;
          },
          copy("Use between 8 and 15 digits.", "استخدم من ٨ إلى ١٥ رقمًا."),
        ),
      message: z
        .string()
        .trim()
        .max(
          1500,
          copy(
            "Keep your message under 1,500 characters.",
            "الحد الأقصى للرسالة ١٥٠٠ حرف.",
          ),
        ),
      consent: z
        .boolean()
        .refine(
          (v) => v,
          copy("Please confirm your consent.", "يرجى الموافقة أولًا."),
        ),
    })
    .superRefine((data, ctx) => {
      if (data.age === "under12" || data.age === "12-17") {
        if (data.guardian.length < 2)
          ctx.addIssue({
            code: "custom",
            path: ["guardian"],
            message: copy(
              "A parent or guardian name is required for learners under 18.",
              "اسم ولي الأمر مطلوب للطلاب أقل من ١٨ سنة.",
            ),
          });
      }
    });
}

export type EnrollmentValues = z.infer<
  ReturnType<typeof buildEnrollmentSchema>
>;

export function whatsAppInquiryUrl(
  number: string,
  title: string,
  fields: { label: string; value: string }[],
) {
  if (!/^\d{8,15}$/.test(number)) return null;
  const text = [
    title,
    ...fields
      .filter((field) => field.value.trim())
      .map((field) => `${field.label}: ${field.value}`),
  ].join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
