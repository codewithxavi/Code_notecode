/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  assetPrefix: isProd ? "/code_notecode/" : "",
  basePath: isProd ? "/code_notecode/" : "",
  trailingSlash: true,
  output: "export",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
