import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL('https://fimgs.net/mdimg/perfume-thumbs/**')],
	},
}

export default nextConfig
