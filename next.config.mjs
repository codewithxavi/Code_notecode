/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/code_notecode",
  assetPrefix: "/code_notecode/",
  trailingSlash: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
