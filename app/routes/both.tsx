import {useLoaderData} from '@remix-run/react'
import type {ContentSourceMap} from '@sanity/client'
import {createTranscoder} from '@sanity/preview-kit/csm'
import {rawRequest} from 'graphql-request'

import Posts from '~/components/Posts'
import type {Data} from '~/graphl'
import {GET_POSTS, graphqlUrl} from '~/graphl'

// 🗺️ Sanity's GraphQL + Content Source Maps
export async function loader() {
  // Our bare GraphQL url without any parameters
  const queryUrl = new URL(graphqlUrl)

  // Add the parameters to the query URL
  queryUrl.searchParams.set('resultSourceMap', 'true')
  queryUrl.searchParams.set('perspective', 'previewDrafts')

  // Setup headers to authenticate the request
  if (!process.env.SANITY_API_VIEWER_TOKEN) {
    throw new Error('SANITY_API_VIEWER_TOKEN is required for previewing drafts')
  }

  let variables = {}
  let headers = new Headers()
  headers.set('Authorization', `Bearer ${process.env.SANITY_API_VIEWER_TOKEN}`)

  // Content source maps are returned in the "extensions" key of the response
  const {data, extensions} = await rawRequest<Data>(
    queryUrl.toString(),
    GET_POSTS,
    variables,
    headers,
  )

  // ✏️ Sanity's GraphQL + Visual Editing
  // Which we then need to apply to the data to create links for visual editing
  if (typeof extensions === 'object' && extensions !== null && 'sanitySourceMap' in extensions) {
    const transcoder = createTranscoder({studioUrl: 'http://localhost:3333'})
    const csm = extensions.sanitySourceMap as ContentSourceMap
    const transcoded = transcoder(data, csm)

    return {posts: transcoded.result.allPost}
  }

  return {posts: data.allPost}
}

export default function Index() {
  const {posts} = useLoaderData<typeof loader>()

  return (
    <>
      <h1>Perspectives, Content Source Maps + Visual Editing</h1>
      <pre>./app/routes/both.tsx</pre>
      <Posts posts={posts} />
    </>
  )
}
