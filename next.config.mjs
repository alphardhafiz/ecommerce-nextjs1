/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "emhvmcckmktnmqbysdga.supabase.co",
      },
    ],
  },
};

export default nextConfig;
