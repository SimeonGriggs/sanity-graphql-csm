import {gql, useQuery} from '@apollo/client'

import Posts from './Posts'

const GET_POSTS = gql`
  query allPost {
    allPost {
      _id
      title
      content
    }
  }
`

function App() {
  const {loading, error, data} = useQuery(GET_POSTS)

  if (loading) return <p className="p-8 text-center block animate-pulse">Loading...</p>
  if (error) return <p className="p-8 text-center block bg-red-50">Error : {error.message}</p>

  const posts = data.allPost || []

  return (
    <main className="grid gap-8 p-8 bg-blue-50">
      <Posts posts={posts} />
    </main>
  )
}

export default App
