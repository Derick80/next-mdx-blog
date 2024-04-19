import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('next').NextConfig} */
/** @type {import('rehype-pretty-code').Options} */


const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ],
    // Optionally, add any other Next.js config below
}

const withMDX = createMDX( {
    options: {
        remarkPlugins: [ remarkGfm ],
        rehypePlugins: [ rehypePrettyCode ],
    },
} )

// Merge MDX config with Next.js config
export default withMDX( nextConfig )