/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['supportive-presence-667b49df8e.media.strapiapp.com'],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      }
};

export default nextConfig;
