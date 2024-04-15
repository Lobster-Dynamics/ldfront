/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export", // (optional) Set your desired output configuration
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
    env:{
    BACKEND_URL: process.env.BACKEND_URL,
  }
};

export default nextConfig;
