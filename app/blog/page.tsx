import VA from '@/content/blog/gene/variant-alleles-scope.mdx'
import { getBlogPosts } from './utils'
import { BlogPosts } from '@/components/blog-post';

export default async function Blog () {

    const blogposts = getBlogPosts()
    if (!blogposts) return <div>loading...</div>
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Blog</h1>
            <div
                className='prose dark:prose-dark max-w-none w-full mt-10'>
              <BlogPosts allBlogs={ blogposts } />
                </div>
            </div>
    )
}