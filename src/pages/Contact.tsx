import { useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import {
  buildEnrollmentSchema,
  whatsAppInquiryUrl,
  type EnrollmentValues as Values,
} from "../lib/enrollment";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageCircle,
  Mail,
  Camera,
  PanelsTopLeft,
  ArrowUpRight,
  CalendarDays,
  Info,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCopy } from "../components/ui";
import { academy } from "../config/academy";
import { courses } from "../data/courses";
import SEO from "../components/SEO";
export default function Contact() {
  const { copy, ar, local } = useCopy();
  const [params] = useSearchParams();
  const [ready, setReady] = useState(false);
  const [handoff, setHandoff] = useState("");
  const configured = /^\d{8,15}$/.test(academy.whatsapp);
  const schema = buildEnrollmentSchema(copy);
  const selected = params.get("course");
  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      guardian: "",
      age: "",
      course: courses.some((c) => c.slug === selected)
        ? (selected as Values["course"])
        : undefined,
      level: (() => {
        const course = courses.find((c) => c.slug === selected);
        const level = Number(params.get("level") ?? 1);
        return course &&
          Number.isInteger(level) &&
          level >= 1 &&
          level <= course.levels.length
          ? String(level)
          : "1";
      })(),
      experience: "",
      method: "",
      phone: "",
      message: "",
      consent: false,
    },
  });
  useEffect(() => {
    if (isSubmitted) void trigger();
  }, [ar, isSubmitted, trigger]);
  const age = useWatch({ control, name: "age" });
  const selectedCourseSlug = useWatch({ control, name: "course" });
  const selectedCourse = courses.find(
    (course) => course.slug === selectedCourseSlug,
  );
  const selectedLevel = useWatch({ control, name: "level" });
  useEffect(() => {
    if (
      selectedCourse &&
      Number(selectedLevel) > selectedCourse.levels.length
    ) {
      setValue("level", "1", { shouldValidate: isSubmitted });
    }
  }, [selectedCourse, selectedLevel, setValue, isSubmitted]);
  const labels = {
    name: copy("Student name", "اسم الطالب"),
    guardian: copy("Parent / guardian name", "اسم ولي الأمر"),
    age: copy("Student age range", "الفئة العمرية للطالب"),
    course: copy("Interested course", "الكورس المطلوب"),
    level: copy("Interested level", "المستوى المطلوب"),
    experience: copy("Programming experience", "خبرتك في البرمجة"),
    method: copy("Preferred contact method", "وسيلة التواصل المفضلة"),
    phone: copy("Contact number", "رقم التواصل"),
    message: copy("Anything you’d like us to know?", "تحب تقولنا حاجة إضافية؟"),
  };
  const onSubmit = (data: Values) => {
    const values = {
      ...data,
      course: courses.find((c) => c.slug === data.course)?.name || data.course,
      level: `${copy("Level", "المستوى")} ${data.level}`,
      age:
        data.age === "under12"
          ? copy("Under 12", "أقل من ١٢")
          : data.age === "25+"
            ? copy("25+ years", "٢٥ سنة أو أكثر")
            : data.age,
      experience:
        data.experience === "none"
          ? copy("No experience yet", "بدون خبرة سابقة")
          : data.experience === "some"
            ? copy("A little experience", "خبرة بسيطة")
            : copy("I’ve built projects before", "سبق لي بناء مشاريع"),
      method:
        data.method === "whatsapp"
          ? copy("WhatsApp", "واتساب")
          : copy("Phone call", "مكالمة هاتفية"),
    };
    setHandoff(
      whatsAppInquiryUrl(
        academy.whatsapp,
        copy(
          "MindCode Academy — Enrollment inquiry",
          "مايندكود أكاديمي — استفسار تسجيل",
        ),
        (Object.keys(labels) as (keyof typeof labels)[]).map((key) => ({
          label: labels[key],
          value: values[key],
        })),
      ) || "",
    );
    setReady(true);
  };
  return (
    <>
      <SEO en="Contact & enrollment" ar="التواصل والتسجيل" />
      <section className="container page-heading">
        <p className="eyebrow">
          <span />
          {copy("LET’S START A CONVERSATION", "خلينا نبدأ الكلام")}
        </p>
        <h1>
          {copy("Big questions. Small questions.", "أسئلة كبيرة. أسئلة صغيرة.")}
          <br />
          <span>{copy("We’re here for both.", "إحنا هنا ليك.")}</span>
        </h1>
        <p>
          {copy(
            "Tell us about your goals. Let’s find your next step in programming.",
            "احكيلنا عن أهدافك. ونختار خطوتك الجاية في البرمجة.",
          )}
        </p>
      </section>
      <section className="container contact-layout section">
        <aside>
          <h2>{copy("Say hello.", "قول أهلًا.")}</h2>
          <p>
            {copy(
              "Learner or parent, you’re welcome here. Ask about courses, levels, or available online sessions.",
              "طالب أو ولي أمر، أهلًا بيك. اسأل عن الكورسات والمستويات ومواعيد المحاضرات الأونلاين.",
            )}
          </p>
          <div className="contact-channels">
            {[
              {
                Icon: MessageCircle,
                name: copy("WhatsApp", "واتساب"),
                url: configured ? `https://wa.me/${academy.whatsapp}` : "",
              },
              {
                Icon: Mail,
                name: copy("Email", "البريد الإلكتروني"),
                url: academy.email ? `mailto:${academy.email}` : "",
              },
              {
                Icon: PanelsTopLeft,
                name: copy("Facebook", "فيسبوك"),
                url: academy.facebookUrl,
              },
              {
                Icon: Camera,
                name: copy("Instagram", "إنستجرام"),
                url: academy.instagramUrl,
              },
            ].map(({ Icon, name, url }) => (
              <div className="contact-channel" key={name}>
                <Icon size={19} />
                <div>
                  {url ? (
                    <a href={url} target="_blank" rel="noreferrer">
                      {name}
                      <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <>
                      <strong>{name}</strong>
                      <span>
                        {copy("Not configured yet", "لم يتم الإعداد بعد")}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="schedule-card">
            <CalendarDays size={23} />
            <h3>{copy("Let’s make time to learn.", "نخصص وقت للتعلم.")}</h3>
            <p>
              {copy(
                "Proposed online teaching slots",
                "مواعيد تدريس أونلاين مقترحة",
              )}
            </p>
            {selectedCourse?.scheduleOnRequest ? (
              <p>
                {copy(
                  "Schedule on request. One live 2-hour session per week.",
                  "المواعيد حسب الطلب. محاضرة مباشرة أسبوعيًا مدتها ساعتان.",
                )}
              </p>
            ) : (
              academy.slots.map((s) => (
                <div key={s.en}>{s[ar ? "ar" : "en"]}</div>
              ))
            )}
            <small>
              {copy(
                "Africa/Cairo time. Subject to confirmation. These are proposed slots, not confirmed active groups.",
                "بتوقيت القاهرة. تخضع للتأكيد. هذه مواعيد مقترحة وليست مجموعات قائمة مؤكدة.",
              )}
            </small>
          </div>
        </aside>
        <div className="form-panel">
          <h2>{copy("Your first step starts here.", "أول خطوة تبدأ هنا.")}</h2>
          <p>
            {copy(
              "An inquiry, not a commitment. Let’s get to know you.",
              "مجرد استفسار، بدون التزام. خلينا نتعرف عليك.",
            )}
          </p>
          {!configured && (
            <div className="config-notice">
              <Info size={19} />
              <div>
                <strong>
                  {copy(
                    "WhatsApp enrollment is not connected yet.",
                    "التسجيل عبر واتساب غير مفعّل حاليًا.",
                  )}
                </strong>
                <p>
                  {copy(
                    "The academy needs to add its WhatsApp number before inquiries can be sent. You can explore and validate the form; no information is saved.",
                    "تحتاج الأكاديمية لإضافة رقم واتساب لإرسال الاستفسارات. يمكنك تجربة النموذج والتحقق منه، ولا يتم حفظ بياناتك.",
                  )}
                </p>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            onChange={() => setReady(false)}
          >
            <div className="form-grid">
              {(
                [
                  "name",
                  "guardian",
                  "age",
                  "course",
                  "level",
                  "experience",
                  "method",
                  "phone",
                  "message",
                ] as const
              ).map((key) => (
                <div
                  className={`field ${key === "message" ? "full-field" : ""}`}
                  key={key}
                >
                  <label htmlFor={key}>
                    {labels[key]}{" "}
                    {(key === "guardian" &&
                      !(age === "under12" || age === "12-17")) ||
                    key === "message" ? (
                      <span>({copy("optional", "اختياري")})</span>
                    ) : (
                      <span aria-hidden="true">*</span>
                    )}
                  </label>
                  {["name", "guardian", "phone"].includes(key) ? (
                    <input
                      id={key}
                      {...register(key)}
                      type={key === "phone" ? "tel" : "text"}
                      autoComplete={
                        key === "name"
                          ? "name"
                          : key === "phone"
                            ? "tel"
                            : "off"
                      }
                      aria-required={
                        key !== "guardian" ||
                        age === "under12" ||
                        age === "12-17"
                      }
                      aria-invalid={!!errors[key]}
                      aria-describedby={
                        errors[key] ? `${key}-error` : undefined
                      }
                      placeholder={key === "phone" ? "+20 …" : undefined}
                    />
                  ) : key === "message" ? (
                    <textarea
                      id={key}
                      rows={4}
                      {...register(key)}
                      aria-required={false}
                      aria-invalid={!!errors[key]}
                      aria-describedby={
                        errors[key] ? `${key}-error` : undefined
                      }
                    />
                  ) : (
                    <select
                      id={key}
                      {...register(key)}
                      aria-required={
                        key !== "guardian" ||
                        age === "under12" ||
                        age === "12-17"
                      }
                      aria-invalid={!!errors[key]}
                      aria-describedby={
                        errors[key] ? `${key}-error` : undefined
                      }
                    >
                      <option value="">
                        {copy("Please select", "اختر من القائمة")}
                      </option>
                      {(key === "age"
                        ? [
                            ["under12", copy("Under 12", "أقل من ١٢")],
                            ["12-17", copy("12–17 years", "١٢–١٧ سنة")],
                            ["18-24", copy("18–24 years", "١٨–٢٤ سنة")],
                            ["25+", copy("25+ years", "٢٥ سنة أو أكثر")],
                          ]
                        : key === "course"
                          ? courses.map((c) => [c.slug, c.name])
                          : key === "level"
                            ? (selectedCourse?.levels ?? []).map(
                                (level, index) => [
                                  String(index + 1),
                                  `${copy("Level", "المستوى")} ${index + 1}${level.sessions ? ` — ${local(level)}` : ""}`,
                                ],
                              )
                            : key === "experience"
                              ? [
                                  [
                                    "none",
                                    copy(
                                      "No experience yet",
                                      "بدون خبرة سابقة",
                                    ),
                                  ],
                                  [
                                    "some",
                                    copy("A little experience", "خبرة بسيطة"),
                                  ],
                                  [
                                    "experienced",
                                    copy(
                                      "I’ve built projects before",
                                      "سبق لي بناء مشاريع",
                                    ),
                                  ],
                                ]
                              : [
                                  ["whatsapp", copy("WhatsApp", "واتساب")],
                                  [
                                    "phone",
                                    copy("Phone call", "مكالمة هاتفية"),
                                  ],
                                ]
                      ).map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors[key] && (
                    <span
                      className="field-error"
                      id={`${key}-error`}
                      role="alert"
                    >
                      {errors[key]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <label className="consent-label">
              <input
                type="checkbox"
                {...register("consent")}
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby="consent-error"
              />
              <span>
                {copy(
                  "I agree to share these details with MindCode Academy through WhatsApp to discuss this inquiry. For learners under 18, I confirm a parent or guardian is involved and consents to contact.",
                  "أوافق على مشاركة هذه البيانات مع مايندكود أكاديمي عبر واتساب لمناقشة الاستفسار. للطلاب أقل من ١٨ عامًا، أؤكد مشاركة ولي الأمر وموافقته على التواصل.",
                )}
              </span>
            </label>
            {errors.consent && (
              <span className="field-error" id="consent-error" role="alert">
                {errors.consent.message}
              </span>
            )}
            <p className="privacy-note">
              {copy(
                "This website does not store your inquiry. WhatsApp receives your details only when you choose to send the prepared message. Please don’t include sensitive information.",
                "هذا الموقع لا يحفظ استفسارك. يستقبل واتساب بياناتك فقط عندما تختار إرسال الرسالة المُجهزة. يرجى عدم إضافة معلومات حساسة.",
              )}
            </p>
            <button className="button" type="submit">
              {copy("Review inquiry", "مراجعة الاستفسار")}
              <ArrowUpRight size={17} />
            </button>
            {ready && (
              <div className="form-result" role="status">
                <Check size={20} />
                <div>
                  <strong>
                    {copy("Your inquiry is ready.", "استفسارك جاهز.")}
                  </strong>
                  {configured ? (
                    <p>
                      {copy(
                        "Review and send your message in WhatsApp.",
                        "راجع وأرسل رسالتك في واتساب.",
                      )}
                    </p>
                  ) : (
                    <p>
                      {copy(
                        "Sending is disabled until the academy connects WhatsApp. Your details have not been sent or saved.",
                        "الإرسال معطل حتى تفعّل الأكاديمية واتساب. لم يتم إرسال أو حفظ بياناتك.",
                      )}
                    </p>
                  )}
                  {configured ? (
                    <a
                      className="button"
                      href={handoff}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy("Continue to WhatsApp", "المتابعة إلى واتساب")}
                      <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <button className="button" type="button" disabled>
                      {copy("WhatsApp not configured", "واتساب غير مُعد")}
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
