import Link from 'next/link'
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import { H1 } from './typography/typography'
import { BlogImage } from './post-image'
import rehypeHighlight from 'rehype-highlight';
import { Code } from '@/app/actions'
import remarkGfm from 'remark-gfm'
import { useMDXComponents } from '@/mdx-components'
// ![stupdi](https://res.cloudinary.com/dch-photo/image/upload/v1675678877/Japan_2023/Kanazawa/PXL_20230131_110609004.MP_tndiyy.jpg)
import {compile} from '@mdx-js/mdx'
import clsx from 'clsx'
interface TableData {
  code: string
  headers: string[]
  rows: string[][]
}

interface TableProps {
  data: TableData
}
function Table ({ data }: TableProps) {
  const tableCode = compile(data.code)
  console.log(tableCode)
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
function CustomLink({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  let href = props.href

  if (href && href.startsWith('/')) {
    return <Link href={href}>{children}</Link>
  }

  if (props.href && props.href.startsWith('#')) {
    return <a />
  }

  return <a target='_blank' rel='noopener noreferrer' {...props} />
}

// // Ichanged this from the template to satisfy the typescript compiler but I'm not sure if it's correct
// function CustomLink ({ props }: {
//   props: LinkProps & HTMLProps<HTMLAnchorElement>
// }) {

//   if (props.href.startsWith('/')) {
//     return (
//       <Link href={ props.href }
//       >
//         {props.children}
//       </Link>
//     )
//   }

//   if (props.href.startsWith('#')) {
//     return <a {...props} />
//   }

//   return <a target='_blank' rel='noopener noreferrer' {...props} />
// }
// @ts-expect-error need to figure this out at some point.

const Paragraph: React.FC<any> = props => {
  if (typeof props.children !== 'string' && props.children.type === 'img') {
    return <>{props.children}</>
  }

  return <p {...props} />
}



const components = {
  p: Paragraph,
  a: CustomLink,
  code: (props: { children: string, className: string }) => {
    return <Code code={ props.children } lang={'typescript'}


    />
  },
   table: function Table({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<'table'>) {
    return (
      <div
        className={clsx(
          'my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto',
          className,
        )}
      >
        <div className="max-sm:min-w-full max-sm:flex-none max-sm:px-6">
          <table {...props} />
        </div>
      </div>
    )
  },
  h1: (props: { children: string }) => {
    return <H1>{props.children}</H1>
  }
  ,
  img: ({
    cloudinaryId,
    imgProps,
    transparentBackground,
  }: {
    cloudinaryId: string
    imgProps: JSX.IntrinsicElements['img']
    transparentBackground?: boolean
  }) => {
    return (
      <BlogImage
        cloudinaryId={cloudinaryId}
        imgProps={imgProps}
        transparentBackground={transparentBackground}
      />

    )


  }
}


const options = {
  remarkPlugins: [
    remarkGfm
  ],
  remarkGfm,
  rehypePlugins: [
    rehypeHighlight
  ],

}

 function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={ {
        ...components, ...(props.components || {
          BlogImage,
          Table,

      }) } }
      options={ options }
    />
  )
}



export { CustomMDX,Code,CustomLink,Table,components,BlogImage}

