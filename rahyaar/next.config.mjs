/** @type {import('next').NextConfig} */

const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "localhost",
  //       port: "6500",
  //     },
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "آدرس دامنه بک اند",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
      },
    ],
  },
};

export default nextConfig;
