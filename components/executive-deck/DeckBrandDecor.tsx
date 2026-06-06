import Image from "next/image";

export type SparkleVariant =
  | "yellow-main"
  | "yellow-inclined"
  | "blue-main"
  | "blue-inclined"
  | "darkblue-main"
  | "darkblue-inclined";

export type SparkleSpec = {
  variant: SparkleVariant;
  side: "left" | "right";
  top: string;
  size?: number;
  rotate?: number;
  opacity?: number;
};

export type AstroVariant =
  | "astro"
  | "astro-2"
  | "astro-4"
  | "astro-5"
  | "astro-7"
  | "astro-10"
  | "astro-11"
  | "agent-astro-4-l"
  | "agent-astro-10-l"
  | "agent-astro-10-r"
  | "agent-astro-12-r"
  | "agent-astro-20-l"
  | "agent-astro-flip-009"
  | "agent-astro-flip-020";

export type AstroSpec = {
  variant: AstroVariant;
  side: "left" | "right";
  bottom?: string;
  top?: string;
  size?: number;
};

export type DeckBrandDecorSpec = {
  sparkles?: SparkleSpec[];
  astro?: AstroSpec;
  cloudLogo?: "top-right" | "bottom-right";
};

const SPARKLE_SRC: Record<SparkleVariant, string> = {
  "yellow-main": "/sfdc-brand/Sparkles/Sparkles Yellow Main.svg",
  "yellow-inclined": "/sfdc-brand/Sparkles/Sparkles Yellow Inclined 2.svg",
  "blue-main": "/sfdc-brand/Sparkles/Sparkles Blue Main.svg",
  "blue-inclined": "/sfdc-brand/Sparkles/Sparkles Blue Inclined.svg",
  "darkblue-main": "/sfdc-brand/Sparkles/Sparkles DarkBlue Main.svg",
  "darkblue-inclined": "/sfdc-brand/Sparkles/Sparkles DarkBlue Inclined.svg",
};

const ASTRO_SRC: Record<AstroVariant, string> = {
  astro: "/sfdc-brand/Carachters/Astro/Astro 3D - 5.png",
  "astro-2": "/sfdc-brand/Carachters/Astro/Astro 3D - 2.png",
  "astro-4": "/sfdc-brand/Carachters/Astro/Astro 3D - 4.png",
  "astro-5": "/sfdc-brand/Carachters/Astro/Astro 3D - 5.png",
  "astro-7": "/sfdc-brand/Carachters/Astro/Astro SF 3D - 7.png",
  "astro-10": "/sfdc-brand/Carachters/Astro/Astro 3D - 10.png",
  "astro-11": "/sfdc-brand/Carachters/Astro/Astro 3D - 11.png",
  "agent-astro-4-l": "/sfdc-brand/Carachters/Agent Astro/Agent Astro 3D 4 L.png",
  "agent-astro-10-l":
    "/sfdc-brand/Carachters/Agent Astro/Agent Astro 3D 10 L.png",
  "agent-astro-10-r":
    "/sfdc-brand/Carachters/Agent Astro/Agent Astro 3D 10 R.png",
  "agent-astro-12-r":
    "/sfdc-brand/Carachters/Agent Astro/Agent Astro 3D 12 R.png",
  "agent-astro-20-l":
    "/sfdc-brand/Carachters/Agent Astro/Agent Astro 3D 20 L.png",
  "agent-astro-flip-009":
    "/sfdc-brand/Carachters/Agent Astro/Astrobot_Sunglasses_AFlip_009_2K.png",
  "agent-astro-flip-020":
    "/sfdc-brand/Carachters/Agent Astro/Astrobot_Sunglasses_AFlip_020_2K.png",
};

export type ProductLogo =
  | "Agentforce"
  | "Service"
  | "Sales"
  | "Marketing"
  | "Data Cloud"
  | "Tableau"
  | "Slack"
  | "Commerce"
  | "Industries"
  | "Platform";

const PRODUCT_SRC: Record<ProductLogo, string> = {
  Agentforce: "/sfdc-brand/Product Logos/Agentforce (Product).png",
  Service: "/sfdc-brand/Product Logos/Customer Success.png",
  Sales: "/sfdc-brand/Product Logos/Sales Cloud.png",
  Marketing: "/sfdc-brand/Product Logos/Marketing Cloud.png",
  "Data Cloud": "/sfdc-brand/Product Logos/Data Cloud.png",
  Tableau: "/sfdc-brand/Product Logos/Tableau.png",
  Slack: "/sfdc-brand/Product Logos/Slack.png",
  Commerce: "/sfdc-brand/Product Logos/Commerce.png",
  Industries: "/sfdc-brand/Product Logos/Industries.png",
  Platform: "/sfdc-brand/Product Logos/Platform.png",
};

const PRODUCT_LABEL: Record<ProductLogo, string> = {
  Agentforce: "Agentforce",
  Service: "Service Cloud",
  Sales: "Sales Cloud",
  Marketing: "Marketing Cloud",
  "Data Cloud": "Data Cloud",
  Tableau: "Tableau",
  Slack: "Slack",
  Commerce: "Commerce Cloud",
  Industries: "Industries",
  Platform: "Platform",
};

export function DeckProductChips({ products }: { products: ProductLogo[] }) {
  return (
    <div className="deck-product-chips" aria-hidden="true">
      {products.map((p) => (
        <span key={p} className="deck-product-chip">
          <Image
            src={PRODUCT_SRC[p]}
            alt=""
            width={56}
            height={56}
            className="deck-product-chip-icon"
            unoptimized
          />
          <span className="deck-product-chip-label">{PRODUCT_LABEL[p]}</span>
        </span>
      ))}
    </div>
  );
}

export default function DeckBrandDecor({ brand }: { brand: DeckBrandDecorSpec }) {
  return (
    <div className="deck-brand-decor" aria-hidden="true">
      {brand.sparkles?.map((sp, i) => {
        const size = sp.size ?? 36;
        return (
          <span
            key={`spark-${i}`}
            className="deck-decor-sparkle"
            style={{
              top: sp.top,
              [sp.side]: "1.5%",
              width: `${size}px`,
              height: `${size}px`,
              opacity: sp.opacity ?? 0.95,
              ["--spark-rot" as string]: `${sp.rotate ?? 0}deg`,
            }}
          >
            <Image
              src={SPARKLE_SRC[sp.variant]}
              alt=""
              width={size}
              height={size}
              className="h-full w-full"
            />
          </span>
        );
      })}

      {brand.astro && (
        <span
          className={`deck-decor-astro deck-decor-astro-${brand.astro.side}`}
          style={{
            width: `${brand.astro.size ?? 220}px`,
            ...(brand.astro.bottom ? { bottom: brand.astro.bottom } : {}),
            ...(brand.astro.top ? { top: brand.astro.top } : {}),
          }}
        >
          <Image
            src={ASTRO_SRC[brand.astro.variant]}
            alt=""
            width={brand.astro.size ?? 220}
            height={brand.astro.size ?? 220}
            className="h-full w-full object-contain"
          />
        </span>
      )}

      {brand.cloudLogo && (
        <span
          className={`deck-decor-cloud-logo deck-decor-cloud-${brand.cloudLogo}`}
        >
          <Image
            src="/sfdc-brand/Logo/Main Salesforce Cloud - Primary.svg"
            alt=""
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </span>
      )}
    </div>
  );
}
