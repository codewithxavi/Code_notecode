/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "/code_notecode",
  assetPrefix: "/code_notecode/", // assetPrefix requires the trailing slash
  trailingSlash: true,
  output: "export",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
