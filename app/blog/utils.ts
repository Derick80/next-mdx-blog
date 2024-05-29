import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import readingTime from 'reading-time'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { compileMDX } from 'next-mdx-remote/rsc'
import { BlogImage } from '@/components/post-image'
import { Button } from '@/components/ui/button'
type Metadata = {
  title: string
  author: string
  description: string
  publishedAt: string
  categories: string[]
  published: string
  readingTime: string
  wordCount: number
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}
  // find the categories line in the frontmatter and store the values in a variant as an array
  const categories = frontMatterLines
    .find((line) => line.includes('categories'))
    ?.split(': ')[1]
    .split(',')
    .map((category) => category.trim())
  // remove square brackets from the first and last element of the array
  categories![0] = categories![0].replace('[', '')
  categories![categories!.length - 1] = categories![
    categories!.length - 1
  ].replace(']', '')
  // remove the last element of the array to avoid adding the categories line to the metadata object

  frontMatterLines.pop()

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')

    metadata[key.trim() as keyof Omit<Metadata, 'categories'>] = value
  })
  // add the categories array back to the end of the metadata object and remove the quotes
  const fixedCategories = categories!.map((category) =>
    category.replace(/^['"](.*)['"]$/, '$1')
  )

  metadata.categories = fixedCategories

  // transform category to array

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      readingTime: metadata.readingTime,
      slug,
      content
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export async function getBlogPost(slug: string) {
  let mdxFile = await serialize(
    path.join(process.cwd(), 'app', 'blog', 'posts', `${slug}.mdx`)
  )
  if (!mdxFile) {
    return null
  }
  const { metadata, content } = readMDXFile(
    path.join(process.cwd(), 'app', 'blog', 'posts', `${slug}.mdx`)
  )
  const mdxSource = await serialize(content, {
    scope: metadata,
    mdxOptions: {
      remarkPlugins: [(await import('remark-gfm')).default]
    }
  })

  return { metadata, mdxSource }
}

export async function getPostBySlug(slug: string) {
  try {
    const fileData = fs.readFileSync(
      path.join(process.cwd(), 'app', 'blog', 'posts', `${slug}.mdx`),
      'utf-8'
    )
    const { frontmatter, content } = await compileMDX<Metadata>({
      source: fileData,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight]
        }
      },
      components: {
        BlogImage,
        Button
      }
    })

    return {
      frontMatter: frontmatter,
      content
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  console.log(date, 'date')

  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}

const components = {
  Button,
  BlogImage
}
export async function parseMdx(source: string) {
  return await compileMDX({
    source: source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight]
      }
    }
  })
}
