function ItemCard({ name, description, price, image }) {

    return (
        <div className="card">
            <img src={image} />
            <div className="card-body">
                <h4>{name}</h4>
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}

export default ItemCard