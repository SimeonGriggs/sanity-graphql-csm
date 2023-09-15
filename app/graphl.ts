import {gql} from 'graphql-request'

export const GET_POSTS = gql`
  query allPost {
    allPost {
      _id
      title
      content
    }
  }
`

export type Post = {
  _id: string
  title?: string
  content?: string
}

export type Data = {allPost: Post[]}

const projectId = 'm2begyfh'
const dataset = 'orderable-v3'
const graphqlTag = 'default'
const apiVersion = '2023-08-01'

export const graphqlUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/graphql/${dataset}/${graphqlTag}`
