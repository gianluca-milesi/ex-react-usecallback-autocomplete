import { useState, useEffect, useCallback } from "react"
import ItemsList from "./components/ItemsList"

function debounce(callback, delay) {
  let timeout
  return (value) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(value)
    }, delay)
  }
}


function App() {

  const [items, setItems] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function fetchItems(query) {
    try {
      setIsLoading(true)
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      if (!response.ok) {
        throw new Error("API Error")
      }
      const data = await response.json()
      setItems(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
      console.log("CIAO")
    }
  }

  const debounceFetchItems = useCallback(debounce(fetchItems, 500), [])

  useEffect(() => {
    if (search === "") {
      setItems([])
    } else {
      debounceFetchItems(search)
    }
  }, [search, debounceFetchItems])


  return (
    <main>
      <section className="search-items">
        <h2>Cerca su Amazon</h2>
        <input type="text" placeholder="Cerca un prodotto..." value={search} onChange={e => setSearch(e.target.value)} />
        {search !== "" && (
          <div className="dropdown-menu">
            {isLoading ? (<p style={{ padding: "1rem" }}>Caricamento...</p>
            ) : (
              <ItemsList items={items} setSearch={setSearch} />
            )}
          </div>
        )}
      </section>

    </main>
  )
}

export default App