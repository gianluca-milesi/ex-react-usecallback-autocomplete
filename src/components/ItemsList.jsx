import ItemCard from "./ItemCard"


function ItemsList({ items = [], setSearch = () => { } }) {
    return (
        <div className="dropdown-menu">
            <ul>
                {items.map(i => (
                    <li key={i.id} onClick={() => setSearch(i.name)}>
                        <ItemCard name={i.name} description={i.description} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ItemsList