import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disables the Image Optimization pipeline entirely (no /_next/image
    // proxy, no .next/cache/images) so every <Image> is a plain <img> that
    // fetches the current file on disk on every load — content editors
    // replacing a file at the same path (mock or CMS-managed) see the
    // update immediately, with nothing to invalidate.
    unoptimized: true,
  },
};

export default nextConfig;
