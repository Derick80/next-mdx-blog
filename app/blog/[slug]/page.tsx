import fs from 'fs'
import path from 'path'
import { getBlogPosts, getPostBySlug } from '../utils'
import React from 'react'

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
  const { content } = await getPostBySlug(slug)
  console.log(content)

  return (
    <div className='dark-prose-invert prose prose-slate text-wrap rounded-md p-1  pt-0 shadow'>
      {content}
    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'app', 'blog', 'posts'))
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))
  return {
    paths,
    fallback: false
  }
}
