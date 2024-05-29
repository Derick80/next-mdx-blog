import fs from 'fs'
import path from 'path'
import { getBlogPosts, getPostBySlug, parseMdx } from '../utils'
import React from 'react'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/typography/typography'
import { BlogImage } from '@/components/post-image'


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
const {frontmatter, content} = await getPostBySlug(slug)




console.log(content,'content from slug page');



  return (
    <div className='rounded-md text-wrap shadow p-1 pt-0 prose  prose-slate dark-prose-invert'>

    {content}

    </div>
  )
}



export async function getStaticPaths () {
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
