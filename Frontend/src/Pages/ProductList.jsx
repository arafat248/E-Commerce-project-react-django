import {useEffect, useState} from 'react';
import ProductCard from '../Components/ProductCard';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);

    // const Base_url = import.meta.env.Base_urls;
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products")
            .then((response) => {
                if(!response.ok){
                    throw new Error("Failed to fetch products");
                    
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })          
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            }   
            );  
    }, []);
    if (Loading) {
        return <p>Loading...</p>;
    }
    if (Error) {
        return <p>Error: {Error}</p>;
    }
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
export default ProductList;