import { getBlogPosts } from '../utils';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';

export async function generateStaticParams () {
    const posts = getBlogPosts()
    return posts.map((post) => ({
        params: {
            slug: post.slug
        }
    }))

}
export default async function BlogPost ({ params }: {
    params: {
        slug: string
    }
}) {

    const { slug } = params
    const post = getBlogPosts().find((post) => post.slug === slug)

    if (!post) {
        notFound()
    }

    return <div
        className='prose dark:prose-dark max-w-none w-full mt-10'
    >


              <CustomMDX source={ post.content } />


    </div>
}