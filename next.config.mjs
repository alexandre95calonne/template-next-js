// next.config.mjs est le fichier de configuration pour Next.js

import bundleAnalyzer from "@next/bundle-analyzer";
import createJiti from "jiti";
import { fileURLToPath } from "url";
import { dirname } from "path";

const jiti = createJiti(fileURLToPath(import.meta.url));

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lottie.host",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "dam.malt.com",
        port: "",
        pathname: "/files/**",
      },
    ],
  },
  productionBrowserSourceMaps: true,

  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
