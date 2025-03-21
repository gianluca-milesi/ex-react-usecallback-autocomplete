import { useState, useEffect, useCallback } from "react"
import ItemSuggestion from "./components/ItemSuggestion"
import ItemCard from "./components/ItemCard"

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
  const [item, setItem] = useState(null)
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

  async function fetchItem(id) {
    try {
      setIsLoading(true)
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products/${id}`)
      if (!response.ok) {
        throw new Error("API Error")
      }
      const data = await response.json()
      setItem(data)
      setSearch("")
      setItems([])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <main>
      <section className="search-items">
        <h2>Cerca su Amazon</h2>
        <input type="text" placeholder="Cerca un prodotto..." value={search} onChange={e => setSearch(e.target.value)} />
        {search !== "" && (
          <div className="dropdown-menu">
            {isLoading ? (<p style={{ padding: "1rem" }}>Caricamento...</p>
            ) : (
              <ul>
                {items.map(i => (
                  <li key={i.id} onClick={() => fetchItem(i.id)}>
                    <ItemSuggestion name={i.name} description={i.description} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      <section className="item-details">
        <h2>Dettagli prodotto</h2>
        {isLoading ? (<p style={{ padding: "1rem" }}>Caricamento...</p>
        ) : (
          item && <ItemCard name={item.name} description={item.description} price={item.price} image={item.image} />)}
      </section>
    </main>
  )
}

export default App