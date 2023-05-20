import { useEffect, useMemo, useState } from "react"

import { dijkstra } from "../../utils"
import { Board } from "./components"

const arr = [
  ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
  ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
  ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
  ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'],
  ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'],
  ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'],
]

export interface ICoordinates {
  startingPoint: string
  object: string
  destination: string
}

const Map = () => {
  const [coordinates, setCoordinates] = useState<ICoordinates>({} as ICoordinates)

  const [apiData, setApiData] = useState()

  useEffect(() => {
    fetch('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f')
      .then(response => response.json())
      .then(data => setApiData(data))
  }, [])

  const result = useMemo(() => {
    const { startingPoint, object, destination } = coordinates

    if (!startingPoint || !object || !destination || !apiData) return null

    const startToObjectPath = dijkstra(apiData, startingPoint, object)
    const objectToDestinationPath = dijkstra(apiData, object, destination)

    return {
      distance: (startToObjectPath?.distance + objectToDestinationPath?.distance).toFixed(2),
      path: [...startToObjectPath.path, ...objectToDestinationPath.path.slice(1)]
    }
  }, [coordinates, apiData])

  const handleClick = (row: string) => {
    if (!coordinates.startingPoint) {
      setCoordinates({...coordinates, startingPoint: row})
    } else if (!coordinates.object) {
      setCoordinates({...coordinates, object: row})
    } else if (!coordinates.destination) {
      setCoordinates({...coordinates, destination: row})
    }
  }

  return (
    <>
      <Board coordinates={coordinates} handleClick={handleClick} generatorArray={arr} />
      <h1>
        Distância: {result?.distance}
      </h1>
      <h1>
        Caminho: {result?.path.join(' -> ')}
      </h1>
      <button onClick={() => setCoordinates({} as ICoordinates)}>Reset</button>
    </>
  )
}

export default Map