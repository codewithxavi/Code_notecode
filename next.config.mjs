/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
console.log("next.config.mjs");
console.log("envs ", process.env.NODE_ENV);
const nextConfig = {
  basePath: isProd ? "/code_notecode" : "",
  trailingSlash: true,
  output: "export",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
