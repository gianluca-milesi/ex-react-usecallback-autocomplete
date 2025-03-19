import { useMemo } from "react"
import ItemCard from "./ItemCard"


function ItemsList({ items = [], setSearch = () => { } }) {

    const memoizedItems = useMemo(() => {
        return items.map(i => (
            <li key={i.id} onClick={() => setSearch(i.name)}>
                <ItemCard name={i.name} description={i.description} />
            </li>
        ))
    }, [items, setSearch])

    return (
        <div className="dropdown-menu">
            <ul>
                {memoizedItems}
            </ul>
        </div>
    )
}

export default ItemsList