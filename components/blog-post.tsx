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
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${post.slug}`}>
                  <Muted>{post.metadata.title}</Muted>
                </Link>
              </CardTitle>
              <CardContent>
                <CardDescription>{post.metadata.description}</CardDescription>
                <CardFooter>{post.metadata.author}</CardFooter>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
    </div>
  )
}
