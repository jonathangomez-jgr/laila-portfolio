"use client";

import { QRCodeSVG } from "qrcode.react";

const SLACK_URL = "https://salesforce.enterprise.slack.com/archives/C098J4UH205";

export default function SlackQRCard({
  channel,
  sub,
  btn,
}: {
  channel: string;
  sub: string;
  btn: string;
}) {
  return (
    <a
      href={SLACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col items-center justify-between gap-5 rounded-2xl border border-[#4A154B]/20 bg-gradient-to-b from-[#f9f0fa] to-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* QR */}
      <div className="overflow-hidden rounded-2xl border border-[#4A154B]/10 bg-white p-3 shadow-sm">
        <QRCodeSVG
          value={SLACK_URL}
          size={160}
          bgColor="#ffffff"
          fgColor="#4A154B"
          level="M"
        />
      </div>

      {/* Logo + name */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {/* Slack logo */}
          <svg width="22" height="22" viewBox="0 0 122.8 122.8" aria-hidden>
            <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"/>
            <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"/>
            <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"/>
            <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"/>
          </svg>
          <h2 className="text-2xl font-semibold text-gray-950">Slack</h2>
        </div>
        <p className="text-sm font-medium text-[#4A154B]">{channel}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>

      <span className="rounded-full bg-[#4A154B] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(74,21,75,0.25)] transition group-hover:bg-[#611f69] group-hover:shadow-[0_12px_28px_rgba(74,21,75,0.35)]">
        {btn}
      </span>
    </a>
  );
}
