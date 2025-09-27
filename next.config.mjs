/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		turbopack: {
			// Ensure Turbopack uses this project folder as the workspace root so
			// `.env.local` and lockfile resolution are correct.
			// Use process.cwd() in ESM instead of __dirname.
			root: process.cwd(),
		},
	},
};

export default nextConfig;
