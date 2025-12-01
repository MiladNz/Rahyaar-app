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
        hostname: "rahyaar-api.liara.run",
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
