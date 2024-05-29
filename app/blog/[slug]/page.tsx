import { getBlogPost, getBlogPosts } from '../utils'
import { notFound } from 'next/navigation'
import { Code, components, CustomMDX, Table } from '@/components/mdx'
import React from 'react'
import { BlogImage } from '@/components/post-image'
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'
import { delimiter } from 'path'
import { useMDXComponents } from '@/mdx-components'
import { Button } from '@/components/ui/button'
import rehypeSlug from 'rehype-slug'

//  this will generate the static paths for the blog posts at build time
export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    params: {
      slug: post.slug
    }
  }))
}
export default async function BlogPost({
  params
}: {
  params: {
    slug: string
  }
}) {
  const { slug } = params
  const data = await getBlogPost(slug)
  if (!data) {
    notFound()
  }

  const options = {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm],

      rehypePlugins: [rehypeHighlight],
              rehypeSlug,
    }
  }


  return (
    <div className='rounded-md text-wrap shadow p-1 pt-0 prose  prose-slate dark-prose-invert'>
      <h1 className='text-6xl font-bold'>{data.metadata.title}</h1>
]        <CustomMDX options={ options } components={ {
          ...components,
          ...useMDXComponents(data.content, {
            Button,
            Table,

          }
          )

        }}
          source={ data.content } />
    </div>
  )
}
