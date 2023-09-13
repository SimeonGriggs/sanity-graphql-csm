import {enableVisualEditing} from '@sanity/overlays'
import {useEffect} from 'react'

type PostsProps = {
  posts: {
    _id: string
    title: string
    content: string
  }[]
}

export default function Posts(props: PostsProps) {
  useEffect(enableVisualEditing, [])

  return props.posts.map((post: any) => (
    <article
      key={post._id}
      className="container mx-auto p-8 bg-white rounded-lg shadow-lg shadow-blue-500/10"
    >
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="mt-4">{post.content}</p>
    </article>
  ))
}
