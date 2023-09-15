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

  // Add the parameter to the query URL
  queryUrl.searchParams.set('resultSourceMap', 'true')

  // Content source maps are returned in the "extensions" key of the response
  const {data: rawData, extensions} = await rawRequest<Data>(queryUrl.toString(), GET_POSTS)

  // ✏️ Sanity's GraphQL + Visual Editing
  // Which we then need to apply to the data to create links for visual editing
  if (typeof extensions === 'object' && extensions !== null && 'sanitySourceMap' in extensions) {
    const transcoder = createTranscoder({studioUrl: 'http://localhost:3333'})
    const csm = extensions.sanitySourceMap as ContentSourceMap
    const transcoded = transcoder(rawData, csm)

    return {posts: transcoded.result.allPost}
  }

  return {posts: rawData.allPost}
}

export default function Index() {
  const {posts} = useLoaderData<typeof loader>()

  return (
    <>
      <h1>Content Source Maps + Visual Editing</h1>
      <pre>./app/routes/csm.tsx</pre>
      <Posts posts={posts} />
    </>
  )
}