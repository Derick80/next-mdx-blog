import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('next').NextConfig} */
/** @type {import('rehype-pretty-code').Options} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      }
    ]
  },

  experimental: {
    mdxRs: true,
  },  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ]

  // Optionally, add any other Next.js config below

}


// I think that my tailwindcss typography plugin overrights the rehype-pretty-code plugin.

const withMDX = createMDX({
  options: {
    remarkPlugins: [ remarkGfm, {
      tablePipeAlign: true,
      tableCellPadding: true,
      stringLength: ( string ) => string.length,

    }
    ],
    rehypePlugins: [ rehypePrettyCode, rehypeHighlight,
      [ rehypeAutolinkHeadings, {
        behavior: 'wrap',
      }
      ]

    ]
  },
  extension: /\.mdx?$/,
  format: 'mdx',

     providerImportSource: '@mdx-js/react',

})

// Merge MDX config with Next.js config
export default withMDX( nextConfig)
