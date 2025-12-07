import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeSlug from "rehype-slug"
import rehypeMathjax from "rehype-mathjax/chtml"
import rehypeHighlight from "rehype-highlight"

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  
  // Ignore ESLint errors during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Exclude vis-network from server-side bundling
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "vis-network", "vis-data"]
    }
    return config
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug, // Add IDs to headings for anchor links
      rehypeHighlight, // Add syntax highlighting to code blocks
      [
        rehypeMathjax,
        {
          chtml: {
            fontURL:
              "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
          },
        },
      ],
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
