import { useEffect, useMemo, useState } from "react"

import { dijkstra } from "../../utils"
import { Board } from "./components"

import styles from './styles.module.scss'
import { Triangle } from "./components/Triangle"

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

interface IHistoric {
  coordinates: ICoordinates
  deliverTime: number
}

export interface ICoordinates {
  startingPoint: string
  object: string
  destination: string
}

const Map = () => {
  const [coordinates, setCoordinates] = useState<ICoordinates>({} as ICoordinates)
  const [historic, setHistoric] = useState<IHistoric[]>([])

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
      time: (startToObjectPath?.time + objectToDestinationPath?.time).toFixed(2),
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

  const onReset = () => {
    if (result) {
      
      setHistoric([...historic, {
        coordinates,
        deliverTime: Number(result.time)
      }])
    }

    setCoordinates({} as ICoordinates)
  }

  return (
    <section className={styles.container}>
      <section className={styles.topInfo}>
        <h2>By clicking on a board's square, select the coordinates:</h2>
        <p>Drone Start: <span className={styles.startingPoint}>{coordinates.startingPoint}</span></p>
        { coordinates.startingPoint && <p>Object pick-up: <span className={styles.object}>{coordinates.object}</span></p>}
        { coordinates.object && <p>Delivery destination: <span className={styles.destination}>{coordinates.destination}</span></p>}
      </section>

      <section className={styles.boardContainer}>
        <Board coordinates={coordinates} handleClick={handleClick} generatorArray={arr} />
        <div className={styles.result}>
          <h2>
            Shortest time: {result?.time}
          </h2>
          <h2>
            Path: {result?.path.join(' -> ')}
          </h2>
          <button onClick={onReset}>Reset!</button>
          {
            historic && (
              <section>
                <h2>Historic</h2>
                  <ol>
                    {
                      historic.map((item, index) => (
                        <li key={index}>
                          From <strong>{item.coordinates.startingPoint}</strong>,
                          picking-up at <strong>{item.coordinates.object} </strong>
                          to <strong>{item.coordinates.destination}</strong> in <strong>{item.deliverTime}</strong> seconds
                        </li>
                      ))
                    }
                  </ol>
              </section>
            )
          }
        </div>
      </section>
    </section>
  )
}

export default Map