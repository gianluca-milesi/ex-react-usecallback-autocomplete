import { useState, useEffect, useMemo } from "react"
import ItemCard from "./components/ItemCard"


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

  const memoizedItems = useMemo(() => {
    return items.map(i => (
      <li key={i.id} onClick={() => setSearch(i.name)}>
        <ItemCard name={i.name} description={i.description} />
        <hr />
      </li>
    ));
  }, [items])


  return (
    <main>
      <section className="search-items">
        <h2>Cerca su Amazon</h2>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        {search === "" ? "" :
          <div className="drop-down-menu">
            <ul>{memoizedItems}</ul>
          </div>
        }
      </section>

    </main>
  )
}

export default App