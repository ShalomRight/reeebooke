/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: false,
	},
	images: {
		unoptimized: false,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig