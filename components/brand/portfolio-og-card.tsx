import { RMMark } from "@/components/brand/rm-mark";
import { brandColors } from "@/lib/brand";

const MAX_DESCRIPTION_LENGTH = 145;

export function shortenOgDescription(value: string) {
  if (value.length <= MAX_DESCRIPTION_LENGTH) return value;

  const shortened = value.slice(0, MAX_DESCRIPTION_LENGTH + 1);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > 100 ? boundary : MAX_DESCRIPTION_LENGTH).trim()}…`;
}

export function getOgTitleSize(title: string) {
  if (title.length > 72) return 48;
  if (title.length > 52) return 54;
  return 62;
}

export function PortfolioOgCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: brandColors.paper,
        color: brandColors.graphite,
        padding: "64px 70px 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 58,
        }}
      >
        <div style={{ display: "flex", width: 620, flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: brandColors.signal,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: getOgTitleSize(title),
              fontWeight: 650,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 600,
              marginTop: 24,
              color: brandColors.muted,
              fontSize: 23,
              lineHeight: 1.4,
            }}
          >
            {shortenOgDescription(description)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 390,
            alignItems: "center",
            color: brandColors.graphite,
          }}
        >
          <RMMark width={390} height={204} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${brandColors.rule}`,
          paddingTop: 18,
          color: brandColors.muted,
          fontSize: 16,
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ color: brandColors.graphite, fontWeight: 600 }}>Raphael Mansueto</span>
        <span>raphaelmansueto.com</span>
      </div>
    </div>
  );
}
