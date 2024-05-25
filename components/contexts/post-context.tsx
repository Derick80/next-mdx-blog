'use client'
import React from 'react'

const PostContext = React.createContext({
  post: {
    title: '',
    author: '',
    description: '',
    publishedAt: '',
    categories: '',
    published: ''
  },
  count: 0
})

export function usePostContext() {
  return React.useContext(PostContext)
}

export default function PostProvider({
  children,
  post,
  count
}: {
  children: React.ReactNode
  post: {
    title: string
    author: string
    description: string
    publishedAt: string
    categories: string
    published: string
  }
  count: number
}) {
  return (
    <PostContext.Provider value={{ post, count }}>
      {children}
    </PostContext.Provider>
  )
}
