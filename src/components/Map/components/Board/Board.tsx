import { ICoordinates } from '../../Map'
import styles from './styles.module.scss'

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

  return (
    <div className={styles.columns}>
      {
        generatorArray.map((column, i) => (
          <div className={styles.rows}>
            {
              column.map((row) => (
                <>
                  <div className={styles.cell}>
                    {/* <input type="radio" name={currentPosition} value={row} onChange={handleChange} /> */}
                    <div
                      className={`${styles.square} ${isRowBlack(row, i) && styles.black}`}
                      onClick={() => handleClick(row)}
                    >
                      {Object.values(coordinates).includes(row) && <span>{row}</span>}
                    </div>
                  </div>
                </>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}
