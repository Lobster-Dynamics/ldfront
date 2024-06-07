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
				permanent: true,
			},
		];
	},
	webpack: (config) => {
		/**
		 * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
		 * Module parse failed: Unexpected character '�' (1:0)" error
		 */
		config.resolve.alias.canvas = false;

		config.resolve.extensionAlias = {
			".js": [".js", ".ts", ".tsx"],
		};

		return config;
	},
};

export default nextConfig;
