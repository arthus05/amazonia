import { useEffect, useMemo, useState } from "react"
import { dijkstra } from "./utils";

function App() {
  const [apiData, setApiData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f')
      .then(response => response.json())
      .then(data => setApiData(data))
  }, [])

  const renderResult = useMemo(() => {
    if (!apiData) return null
    setIsLoading(true)
    const value = dijkstra(apiData, 'A1', 'B2')
    setIsLoading(false)

    return value
  }, [apiData])

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <h1>Shortest Path</h1>
      {
        renderResult && (
          <>
            <p>Distance: {renderResult.distance}</p>
            <p>Path: {renderResult.path}</p>
          </>
        )
      }
    </>
  )
}

export default App
