import { getBlogPost, getBlogPosts } from '../utils'
import { notFound } from 'next/navigation'
import { Code, components, CustomMDX } from '@/components/mdx'
import { TContainer } from '@/app/blog/posts/tst-container'
import React from 'react'
import { BlogImage } from '@/components/post-image'
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'
import { delimiter } from 'path'
import { useMDXComponents } from '@/mdx-components'

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
console.log(data.metadata,'data');

  const options = {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm, {
          table: {
            type: 'table',
            delimiter: {
              row: '\n',
              cell: '|',
              header: '-'
            }
          }

        }],

        rehypePlugins: [rehypeHighlight]
    }
  }


  return (
    <div className=' mt-10 w-full mx-auto max-w-3xl'>
      <h1 className='text-6xl font-bold'>{data.metadata.title}</h1>
      <div className='dark:prose-dark prose mt-10'>
        <CustomMDX options={ options } components={ {
          ...components,
          ...useMDXComponents(data.content, {
             TContainer,
          }
          )

        }}
          source={ data.content } />
      </div>
    </div>
  )
}
