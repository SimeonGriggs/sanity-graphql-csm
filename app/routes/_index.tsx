import {useLoaderData} from '@remix-run/react'
import {request} from 'graphql-request'

import Posts from '~/components/Posts'
import type {Data} from '~/graphl'
import {GET_POSTS, graphqlUrl} from '~/graphl'

// Sanity's GraphQL in Remix
export async function loader() {
  // Our bare GraphQL url without any parameters
  const queryUrl = new URL(graphqlUrl)

  const data = await request<Data>(queryUrl.toString(), GET_POSTS)

  return {posts: data.allPost}
}

export default function Index() {
  const {posts} = useLoaderData<typeof loader>()

  return (
    <>
      <h1>Sanity GraphQL</h1>
      <pre>./app/routes/_index.tsx</pre>
      <Posts posts={posts} />
    </>
  )
}
