import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/usa-tax-site" : "";

const nextConfig: NextConfig = {
  output: "export",
  // Only use directory-style URLs (page/index.html) for the GitHub Pages
  // export — that static host needs it for trailing-slash URLs to resolve.
  // Locally, this must stay off or the dev server's own trailingSlash
  // redirect forces a full page reload on every next/link navigation.
  trailingSlash: isGithubPages,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
