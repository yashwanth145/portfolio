import { cn } from "@/lib/utils";

type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  accent?: string;
};

export function PageHeading({
  eyebrow,
  title,
  description,
  align = "left",
  accent,
}: PageHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-5", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-purple/25 bg-white/5 px-4 py-1.5 text-xs tracking-[0.28em] text-purple-light uppercase shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-2">
        {accent ? (
          <p className="font-magneto text-3xl text-purple-light sm:text-4xl">{accent}</p>
        ) : null}
        <h1 className="font-magneto text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
      {description ? (
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
      ) : null}
      <div className={cn("honey-divider w-24", align === "center" && "mx-auto")} />
    </div>
  );
}
