"use client";

import { Box, Button, Text, Group, Badge } from "@mantine/core";
import { IconDownload, IconShieldLock } from "@tabler/icons-react";

// Mock data — replace with real values from your detection logic
const userInfo = {
  ip: "103.189.160.26",
  country: "🇳🇵",
  browser: "Chrome 145.0.0.0 (Windows 10)",
  resolution: "1680x1050px",
  cpu: "9-cores CPU",
};

export default function VpnWarningBanner() {
  return (
    <Box
      className="
        relative w-full max-w-4xl mx-auto my-8
        rounded-lg overflow-hidden
        border-4 border-[#00e000]
        bg-[#111111]
        shadow-[0_0_30px_rgba(0,224,0,0.3)]
      "
    >
      {/* Subtle green glow overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[rgba(0,224,0,0.04)] to-transparent" />

      <div className="relative z-10 px-8 py-8 text-center">
        {/* Headline */}
        <Text
          component="h2"
          className="
            text-white font-extrabold text-3xl md:text-4xl
            tracking-tight mb-4
          "
          style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
        >
          Warning! Download only with VPN...
        </Text>

        {/* Divider */}
        <hr className="border-gray-600 mb-5" />

        {/* Body warning */}
        <Text className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6">
          Downloading torrents is risky for you: your IP and leaked private data
          being actively tracked by your <strong className="text-white">ISP</strong> and{" "}
          <strong className="text-white">Government Agencies</strong>. Protect
          yourself from expensive lawsuits and fines NOW! You must use a VPN
          like <strong className="text-white">Expert</strong>. It is the only
          way to download torrents fully anonymous by encrypting all traffic with
          zero logs.
        </Text>

        {/* Exposed data row */}
        <div className="flex flex-wrap justify-center gap-2 items-center mb-3 text-sm md:text-base">
          <Text className="text-[#ccff00] font-semibold">
            Personal data disclosing your real identity: your IP address,
          </Text>
          <Badge
            color="red"
            variant="filled"
            size="lg"
            radius="sm"
            className="font-mono font-bold text-white text-sm"
          >
            {userInfo.ip}
          </Badge>
          <Text className="text-[#ccff00] font-semibold">
            is exposed, which points directly to your location in{" "}
            {userInfo.country}. You are browsing with
          </Text>
        </div>

        {/* Browser / resolution / CPU row */}
        <Group justify="center" gap="xs" className="mb-6 flex-wrap">
          {[userInfo.browser, userInfo.resolution, userInfo.cpu].map(
            (info, i) => (
              <Badge
                key={i}
                color="dark"
                variant="filled"
                size="lg"
                radius="sm"
                className="border border-red-600 text-white font-semibold text-xs md:text-sm"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                {info}
              </Badge>
            )
          )}
        </Group>

        {/* Testimonial quote */}
        <Text
          className="text-[#00bfff] text-base md:text-lg font-semibold italic mb-7"
          style={{ fontFamily: "Georgia, serif" }}
        >
          &ldquo;Do not risk it! Protect yourself right now by downloading
          Expert VPN&rdquo;{" "}
          <span className="not-italic font-bold text-white">- William</span>
        </Text>

        {/* CTA Button */}
        <Button
          size="lg"
          radius="md"
          leftSection={<IconDownload size={20} />}
          className="
            bg-[#3db53d] hover:bg-[#2fa02f]
            text-white font-bold text-base tracking-wide
            px-10 py-3
            shadow-[0_4px_15px_rgba(0,200,0,0.4)]
            transition-all duration-200
          "
          style={{
            background: "linear-gradient(180deg, #4ecf4e 0%, #2ea02e 100%)",
            border: "1px solid #5de05d",
          }}
        >
          Download Expert VPN
        </Button>
      </div>
    </Box>
  );
}
