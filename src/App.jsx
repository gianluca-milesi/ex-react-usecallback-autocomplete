import { useState, useEffect, useMemo } from "react"
import ItemsList from "./components/ItemsList"


function App() {

  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")

  async function fetchItems() {
    try {
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`)
      if (!response.ok) {
        throw new Error("API Error")
      }
      const data = await response.json()
      setItems(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [search])


  return (
    <main>
      <section className="search-items">
        <h2>Cerca su Amazon</h2>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        {search === "" ? "" : <ItemsList items={items} setSearch={setSearch} />}
      </section>

    </main>
  )
}

export default App