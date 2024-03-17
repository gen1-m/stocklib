/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      // The star in the hostname is for allowing all subdomains
      remotePatterns: [
          {
              protocol: "https",
              hostname: "*",
          }
      ],
  },
}

module.exports = nextConfig
