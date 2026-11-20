import {
  Flag,
  MoveRight,
  RotateCw,
  Repeat2,
  Square,
  Plus,
  Send,
  Mail,
} from "lucide-react";
import type { CodePreview, CoursePreview } from "../../data/coursePreviews";
import { TechnicalText, useCopy } from "../ui";
import "../../styles/course-previews.css";

const icons = {
  start: Flag,
  move: MoveRight,
  turn: RotateCw,
  repeat: Repeat2,
  finish: Square,
  score: Plus,
  send: Send,
  receive: Mail,
};
const keywords = new Set([
  "using",
  "string",
  "var",
  "int",
  "new",
  "await",
  "class",
  "static",
  "void",
  "return",
  "def",
  "if",
  "else",
  "for",
  "in",
  "import",
  "from",
  "as",
  "True",
  "False",
  "None",
]);

function HighlightedLine({
  line,
  language,
}: {
  line: string;
  language: CodePreview["language"];
}) {
  // Tokenize strings/comments first, so keywords inside them remain string/comment text.
  const tokens =
    line.match(
      /(?:\$|f)?"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*$|#.*$|\b\d+\b|\b[A-Za-z_]\w*\b|\s+|./g,
    ) ?? [];
  return tokens.map((token, index) => {
    const kind = /^(?:\$|f)?["']/.test(token)
      ? "string"
      : token.startsWith("//") ||
          (language === "python" && token.startsWith("#"))
        ? "comment"
        : keywords.has(token)
          ? "keyword"
          : /^\d+$/.test(token)
            ? "number"
            : undefined;
    return kind ? (
      <span key={index} className={`syntax-${kind}`}>
        {token}
      </span>
    ) : (
      token
    );
  });
}

/** Content only: the shared course page owns the existing editor window, tabs and toolbar. */
export default function CourseHeroPreview({
  preview,
  resultOnly = false,
}: {
  preview: CoursePreview;
  resultOnly?: boolean;
}) {
  const { ar, copy, local } = useCopy();
  return (
    <div
      className={`program-hero-preview program-preview-${preview.kind}`}
      data-language={preview.kind === "code" ? preview.language : preview.kind}
    >
      {preview.kind === "code" ? (
        <>
          {!resultOnly && (
            <pre dir="ltr" aria-label={copy("Code example", "مثال كود")}>
              {preview.code.map((line, i) => (
                <div key={i} className="editor-line">
                  <span className="line-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <code className="line-text">
                    <HighlightedLine
                      line={line || " "}
                      language={preview.language}
                    />
                  </code>
                </div>
              ))}
            </pre>
          )}
          <div className="program-example-output">
            <small dir={ar ? "rtl" : "ltr"}>
              {copy("Example output", "ناتج توضيحي")}
            </small>
            <pre dir="ltr">
              <code>{preview.output.join("\n")}</code>
            </pre>
          </div>
        </>
      ) : resultOnly ? (
        <p className="program-block-result" dir={ar ? "rtl" : "ltr"}>
          <TechnicalText>{local(preview.result)}</TechnicalText>
        </p>
      ) : (
        <ol
          className={`program-block-sequence ${preview.kind === "scratchjr" ? "junior-sequence" : "scratch-stack"}`}
          aria-label={local(preview.title)}
          dir="ltr"
        >
          {preview.blocks.map((block, index) => {
            const Icon = icons[block.icon];
            return (
              <li
                key={index}
                className={`program-block block-${block.category}${block.depth ? " block-nested" : ""}`}
              >
                <Icon
                  size={preview.kind === "scratchjr" ? 24 : 16}
                  aria-hidden="true"
                />
                <span dir={ar ? "rtl" : "ltr"}>{local(block.label)}</span>
              </li>
            );
          })}
        </ol>
      )}
      <p className="program-preview-caption" dir={ar ? "rtl" : "ltr"}>
        <TechnicalText>{local(preview.caption)}</TechnicalText>
      </p>
    </div>
  );
}
