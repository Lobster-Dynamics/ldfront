/** @type {import('next').NextConfig} */
const nextConfig = {
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
