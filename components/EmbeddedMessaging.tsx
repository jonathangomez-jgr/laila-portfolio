"use client";

import { useEffect } from "react";

export type EmbeddedMessagingConfig = {
  orgId: string;
  deploymentName: string;
  siteUrl: string;
  scrt2URL: string;
  language?: string;
  bootstrapSrc?: string;
};

declare global {
  interface Window {
    embeddedservice_bootstrap?: {
      settings: { language?: string; [k: string]: unknown };
      init: (
        orgId: string,
        deploymentName: string,
        siteUrl: string,
        opts: { scrt2URL: string }
      ) => void;
    };
    __embeddedMessagingInitialized?: boolean;
  }
}

export default function EmbeddedMessaging({
  config,
}: {
  config: EmbeddedMessagingConfig;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__embeddedMessagingInitialized) return;

    const src =
      config.bootstrapSrc ?? `${config.siteUrl}/assets/js/bootstrap.min.js`;

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-embedded-messaging="${config.deploymentName}"]`
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.embeddedMessaging = config.deploymentName;
    script.onload = () => {
      try {
        if (!window.embeddedservice_bootstrap) {
          console.error("Embedded Messaging: bootstrap did not load");
          return;
        }
        window.embeddedservice_bootstrap.settings.language =
          config.language ?? "es";
        window.embeddedservice_bootstrap.init(
          config.orgId,
          config.deploymentName,
          config.siteUrl,
          { scrt2URL: config.scrt2URL }
        );
        window.__embeddedMessagingInitialized = true;
      } catch (err) {
        console.error("Error loading Embedded Messaging:", err);
      }
    };
    script.onerror = () => {
      console.error("Failed to load Embedded Messaging bootstrap script");
    };
    document.body.appendChild(script);
  }, [config]);

  return null;
}
