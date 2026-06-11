function ProductCard({ product }) {
    return (
        <div className="border-2 border-gray-400 rounded-lg p-4 m-2 shadow-lg shadow-gray-700">
            <div className="flex w-50 h-64">
                <img src={product.image} alt={product.name} />
            </div>
            <h3 className="flex justify-center py-2 bg-lime-600 text-lg font-bold">{product.name}</h3>
            <p className="flex justify-center py-2 bg-amber-400 text-lg font-bold">${product.price}</p>
        </div>
    );
}
export default ProductCard;