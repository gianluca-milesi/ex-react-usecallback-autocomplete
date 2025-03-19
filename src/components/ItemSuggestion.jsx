function ItemSuggestion({ name = "", description = "" }) {
    return (
        <div className="item-suggestion">
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    )
}

export default ItemSuggestion