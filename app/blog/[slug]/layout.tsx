// get blog posts based on the slug and return the metadata and content

import { notFound } from 'next/navigation'
import { getBlogPosts } from '../utils'
export default async function Layout({
  params,
  children
}: {
  params: {
    slug: string
  }
  children: React.ReactNode
}) {
  const { slug } = params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className=' mt-10 w-full mx-auto max-w-3xl'>
      {children}
    </div>
  )
}
