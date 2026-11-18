import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/Nilesh_Kamble_AI_Frontend_2026.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value:
              'attachment; filename="Nilesh_Kamble_AI_Frontend_2026.pdf"',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mzstatic.com",
      },
    ],
  },
};

export default nextConfig;
