import { memo } from "react"


function ItemCard({ name = "", description = "" }) {
    return (
        <div className="card">
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    )
}

export default memo(ItemCard)