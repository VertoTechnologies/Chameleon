/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://thispersondoesnotexist.com/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // ... rest of the configuration.
  output: "standalone",
};
export default nextConfig;
