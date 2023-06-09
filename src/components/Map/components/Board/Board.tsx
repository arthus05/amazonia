import { ICoordinates } from '../../Map'
import { Circle } from '../Circle'
import { Square } from '../Square'
import { Triangle } from '../Triangle'
import styles from './styles.module.scss'

const getIconComponent = (checkpoint: string) => {
  switch (checkpoint) {
    case 'startingPoint':
      return <Triangle />
    case 'object':
      return <Square />
    case 'destination':
      return <Circle />
    default:
      return null;
  }
}

interface IBoard {
  generatorArray: string[][]
  handleClick: (row: string) => void
  coordinates: ICoordinates
}

export const Board = ({ generatorArray, handleClick, coordinates }: IBoard) => {
  const isRowBlack = (row: string, index: number) => {
    const rowNumber = Number(row.split('')[1])

    return (rowNumber + index) % 2 === 0
  }

  const getIcon = (row: string) => {
    const foundCheckpoint = Object.keys(coordinates).findLast((key) => coordinates[key as keyof ICoordinates] === row)

    if (!foundCheckpoint) return null

    return getIconComponent(foundCheckpoint)
  }

  return (
    <section className={styles.container}>
      <div className={styles.line}>

        <div className={styles.numbers}>
          <p>1</p>
          <p>8</p>
        </div>
        <div className={styles.columns}>
          {
            generatorArray.map((column, i) => (
              <div className={styles.rows}>
                {
                  column.map((row) => (
                    <>
                      <div className={styles.cell}>
                        <div
                          className={`${styles.square} ${isRowBlack(row, i) && styles.black}`}
                          onClick={() => handleClick(row)}
                        >
                          {Object.values(coordinates).includes(row) && <span>{getIcon(row)}</span>}
                        </div>
                      </div>
                    </>
                  ))
                }
              </div>
            ))
          }
        </div>

      </div>
      <div className={styles.letters}>
        <p>A</p>
        <p>H</p>
      </div>
    </section>
  )
}
