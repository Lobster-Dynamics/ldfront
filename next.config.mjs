/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export", // (optional) Set your desired output configuration
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	env: {
		BACKEND_URL: process.env.BACKEND_URL,
	},
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/file-explorer",
				permanent: true
			}
		]
	}
};

export default nextConfig;
