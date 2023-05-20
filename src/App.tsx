import { Map } from "./components/Map";

import styles from './App.module.scss'

function App() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Shortest Path</h1>
      <Map />
    </main>
  )
}

export default App
