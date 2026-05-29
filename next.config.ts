import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.qrserver.com", pathname: "/**" },
      { protocol: "https", hostname: "img.vietqr.io", pathname: "/**" },
      { protocol: "https", hostname: "thumbs.dreamstime.com", pathname: "/**" },
      { protocol: "https", hostname: "png.pngtree.com", pathname: "/**" },
      { protocol: "https", hostname: "img.magnific.com", pathname: "/**" },
      { protocol: "https", hostname: "sepay.vn", pathname: "/**" },
      { protocol: "https", hostname: "file.hstatic.net", pathname: "/**" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com", pathname: "/**" },
      { protocol: "https", hostname: "www.svgrepo.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
