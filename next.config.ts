import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeMathjax from "rehype-mathjax/chtml"

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
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
