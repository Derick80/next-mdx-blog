import type { MDXComponents } from 'mdx/types'
import { Code } from './components/mdx'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { BlogImage } from './components/post-image'
const options = {
  remarkPlugins: [
    remarkGfm, {
      table: {
        type: 'table',
        delimiter: {
          row: '\n',
          cell: '|',
          header: '-'
        }
      }
    }
  ],
  rehypePlugins: [
    rehypeHighlight
  ],

}
export function useMDXComponents(code:string,components: MDXComponents): MDXComponents {
  return {
    BlogImage,
    Code,
    table: (props) => {
      return (
        <table {...props} />
      )
    }
    ,
    ...components,

  }
}
