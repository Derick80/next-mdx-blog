import fs from 'fs'
import path from 'path'
import React from 'react'
import { Code, CustomMDX } from '@/components/mdx'
import { MDXProvider } from '@mdx-js/react'
import { getBlogPosts, getPostBySlug } from '../utils'
import { BlogImage } from '@/components/post-image'

//  this will generate the static paths for the blog posts at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts()
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
  const  post = await getPostBySlug(slug)

  if (!post) return <div>loading...</div>
  console.log(post, 'post'  );

  return (
    <div className='dark-prose-invert prose prose-slate text-wrap rounded-md p-1  pt-0 shadow'>
     {post.content }
    </div>
  )
}

