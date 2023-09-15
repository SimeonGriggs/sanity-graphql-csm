import {useLoaderData} from '@remix-run/react'
import {request} from 'graphql-request'

import Posts from '~/components/Posts'
import type {Data} from '~/graphl'
import {GET_POSTS, graphqlUrl} from '~/graphl'

// 🔍 Sanity's GraphQL + Perspectives
export async function loader() {
  // Our bare GraphQL url without any parameters
  const queryUrl = new URL(graphqlUrl)

  // Add the perspective parameter to the query URL
  queryUrl.searchParams.set('perspective', 'previewDrafts')

  // Setup headers to authenticate the request
  if (!process.env.SANITY_API_VIEWER_TOKEN) {
    throw new Error('SANITY_API_VIEWER_TOKEN is required for previewing drafts')
  }

  let variables = {}
  let headers = new Headers()
  headers.set('Authorization', `Bearer ${process.env.SANITY_API_VIEWER_TOKEN}`)

  const data = await request<Data>(queryUrl.toString(), GET_POSTS, variables, headers)

  return {posts: data.allPost}
}

export default function Index() {
  const {posts} = useLoaderData<typeof loader>()

  return (
    <>
      <h1>Perspectives</h1>
      <pre>./app/routes/perspectives.tsx</pre>
      <Posts posts={posts} />
    </>
  )
}
