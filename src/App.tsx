import {gql, useQuery} from '@apollo/client'
import {enableVisualEditing} from '@sanity/overlays'
import {useEffect} from 'react'

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
  useEffect(enableVisualEditing, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  const posts = data.allPost || []

  return (
    <main className="grid gap-8 p-8 bg-blue-50">
      {posts.map((post: any) => (
        <article
          key={post._id}
          className="container mx-auto p-8 bg-white rounded-lg shadow-lg shadow-blue-500/10"
        >
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="mt-4">{post.content}</p>
        </article>
      ))}
    </main>
  )
}

export default App
