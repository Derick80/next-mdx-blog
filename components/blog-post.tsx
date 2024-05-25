import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from './ui/card'
import { Muted } from './typography/typography'
import { Badge } from './ui/badge'

export type BlogPost = {
  slug: string
  metadata: {
    title: string
    author: string
    description: string
    publishedAt: string
    categories: string[]
    published: string
  }
  content: string
}

export function BlogPosts({ allBlogs }: { allBlogs: BlogPost[] }) {
  const slug = allBlogs.map((post) => post.slug)
  console.log(slug)

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Card key={post.slug}>
            <CardHeader
              className='pb-1 pt-2'
            >
              <CardTitle>
                <Link href={`/blog/${post.slug}`}>
                  <Muted>{post.metadata.title}</Muted>
                </Link>
              </CardTitle>
            </CardHeader>
              <CardContent className='pb-2 gap-4 w-full'>
                <CardDescription
                  className='italic text-xs'
              >  { post.metadata.description }</CardDescription>
                <div className='flex flex-row gap-1 md:gap-2'>
                  { post.metadata.categories.map((category) => (
                    <Badge key={ category }>{ category }</Badge>
                  )) }
                </div>

                <CardFooter>{post.metadata.author}</CardFooter>
              </CardContent>

          </Card>
        ))}
    </div>
  )
}
