import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Imagem enxuta para o container (docker/frontend/Dockerfile).
  output: "standalone",
  // As rotas do DRF terminam em "/". Sem isto o Next responderia 308 em toda
  // chamada a /api/proxy/api/.../ antes de chegar ao Route Handler.
  skipTrailingSlashRedirect: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
