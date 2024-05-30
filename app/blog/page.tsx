import { BlogPosts } from '@/components/blog-post'
import { getBlogPosts } from './utils'

export default async function Blog() {
  const blogposts = getBlogPosts()
  if (!blogposts) return <div>loading...</div>

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <h1 className='text-6xl font-bold'>Blog</h1>
      <div className='dark:prose-dark prose mt-10 w-full max-w-none'>
        <BlogPosts allBlogs={blogposts} />
      </div>
    </div>
  )
}
