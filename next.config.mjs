/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ksyxvqrghckjmgtuxwkk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/vehicle-images/**",
      },
    ],
    qualities: [100, 75],
  },
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  reactCompiler: true,
};

export default nextConfig;
