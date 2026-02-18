"use client";

import { Anchor, Text, Divider } from "@mantine/core";

const primaryLinks = [
  { label: "Blog", href: "/blog" },
  { label: "DMCA", href: "/dmca" },
  { label: "API", href: "/api" },
  { label: "RSS", href: "/rss" },
  { label: "Contact", href: "/contact" },
  { label: "Browse Movies", href: "/browse-movies" },
  { label: "Requests", href: "/requests" },
  { label: "Login", href: "/login" },
  { label: "Language", href: "/language" },
];

const secondaryLinks = [
  { label: "EZTV", href: "https://eztv.re" },
  { label: "YIFY Status", href: "/status" },
  { label: "YTS Proxies", href: "/proxies" },
  { label: "YTS Proxies (TOR)", href: "/proxies-tor" },
  { label: "YTS Official Link", href: "/official" },
  { label: "Follow @ytsyify", href: "https://twitter.com/ytsyify" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] border-t border-[#2a2a2a] py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
        {/* Primary Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          <Text size="sm" c="gray.5" fw={500}>
            YTS © 2011 - 2026
          </Text>

          {primaryLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-x-1">
              <Text size="sm" c="dimmed">
                -
              </Text>
              <Anchor
                href={link.href}
                size="sm"
                c="gray.5"
                underline="never"
                className="hover:text-white transition-colors duration-150"
                style={{ color: "inherit" }}
              >
                {link.label}
              </Anchor>
            </span>
          ))}
        </div>

        {/* Secondary Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          {secondaryLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-x-1">
              {index !== 0 && (
                <Text size="sm" c="dimmed">
                  -
                </Text>
              )}
              <Anchor
                href={link.href}
                size="sm"
                c="gray.5"
                underline="never"
                className="hover:text-white transition-colors duration-150"
                style={{ color: "inherit" }}
              >
                {link.label}
              </Anchor>
            </span>
          ))}
        </div>

        {/* User Agreement Row */}
        <Text size="xs" c="dimmed" ta="center">
          By using this site you agree to and accept our{" "}
          <Anchor
            href="/user-agreement"
            size="xs"
            c="gray.5"
            className="hover:text-white transition-colors duration-150"
            style={{ fontSize: "inherit" }}
          >
            User Agreement
          </Anchor>
          , which can be read{" "}
          <Anchor
            href="/user-agreement"
            size="xs"
            c="gray.5"
            className="hover:text-white transition-colors duration-150"
            style={{ fontSize: "inherit" }}
          >
            here
          </Anchor>
          .
        </Text>
      </div>
    </footer>
  );
}

export default Footer;
