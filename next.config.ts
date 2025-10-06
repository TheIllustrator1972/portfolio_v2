import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'http://192.168.11.19:3000', // Assuming your development server runs on port 3000
    'https://192.168.11.19:3000',
    'https://192.168.11.19:3001',
    // Add any other local IPs/ports you use for testing
  ],
};

export default nextConfig;
