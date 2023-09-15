import {useLocation} from '@remix-run/react'
import {enableVisualEditing} from '@sanity/overlays'
import {useEffect} from 'react'

import type {Post} from '~/graphl'

type PostsProps = {
  posts: Post[]
}

export default function Posts(props: PostsProps) {
  const {pathname} = useLocation()

  // Only enable overlays when content source maps have been encoded
  useEffect(() => {
    let disable: () => void

    if (pathname === '/csm' || pathname === '/both') {
      disable = enableVisualEditing()
    }

    return () => (disable ? disable() : undefined)
  }, [pathname])

  return props.posts.map((post: any) => (
    <article key={post._id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </article>
  ))
}
