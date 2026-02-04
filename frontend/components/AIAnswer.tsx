type Props = {
  text: string;
};

export default function AIAnswer({ text }: Props) {
  const lines = text.split("\n");

  return (
    <div className="space-y-3 text-gray-300">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Headings (**, ##, or ending with :)
        if (
          trimmed.startsWith("**") ||
          trimmed.startsWith("##") ||
          trimmed.endsWith(":")
        ) {
          return (
            <h3
              key={i}
              className="mt-4 font-semibold text-lg text-white text-glow"
            >
              {trimmed.replace(/\*\*/g, "").replace(/##/g, "")}
            </h3>
          );
        }

        // Bullet points
        if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
          return (
            <li key={i} className="ml-5 list-disc text-gray-300">
              {trimmed.replace(/^[-•]\s*/, "")}
            </li>
          );
        }

        // Empty line
        if (trimmed === "") {
          return <div key={i} className="h-2" />;
        }

        // Normal paragraph
        return (
          <p key={i} className="leading-relaxed text-gray-300">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
