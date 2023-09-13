import './index.css'

import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'
import {createTranscoder} from '@sanity/preview-kit/csm'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

const projectId = 'm2begyfh'
const dataset = 'orderable-v3'
const graphqlTag = 'default'
const apiVersion = '2023-08-01'
const uri = new URL(
  `https://${projectId}.api.sanity.io/v${apiVersion}/graphql/${dataset}/${graphqlTag}`,
)
// Requires a token with read permissions to the dataset
uri.searchParams.set('perspective', 'previewDrafts')
// Requires enterprise plan
uri.searchParams.set('resultSourceMap', 'true')
const httpLink = new HttpLink({
  uri: uri.toString(),
  headers: {
    // BAD PATTERN: Do not expose token client-side this is just for a low-risk demo
    Authorization: `Bearer ${import.meta.env.VITE_SANITY_API_VIEWER_TOKEN}`,
  },
})

const encodeCSMFromExtensions = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    // Return without stega encoding if no extensions
    if (!response?.extensions?.sanitySourceMap) {
      return response
    }

    // Prepare transcoder to create links to Sanity Studio
    const transcoder = createTranscoder({studioUrl: 'https://demo-custom-workflow.sanity.studio'})

    const csm = response.extensions.sanitySourceMap
    const transcoderResult = transcoder(response.data, csm)

    return {data: transcoderResult.result}
  })
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: encodeCSMFromExtensions.concat(httpLink),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
