import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/products/${id}/`)
            .then((response) => {
                if(!response.ok){
                    throw new Error("Failed to fetch product details");                    
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center p-6">
                <p className="text-lg font-medium text-slate-700">Loading product...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center p-6">
                <p className="text-lg font-medium text-red-600">Error: {error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center p-6">
                <p className="text-lg font-medium text-slate-700">Product not found.</p>
            </div>
        );
    }
    return (
        <main className="bg-slate-50 min-h-screen px-4 py-12 sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-[2rem] bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:flex-row sm:items-start">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full max-w-2xl rounded-[1.75rem] object-cover shadow-lg"
                />
                <div className="w-full sm:w-auto">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{product.name}</h1>
                    <p className="mt-4 text-2xl font-bold text-slate-900">{product.price}</p>
                    <p className="mt-4 text-slate-600 leading-7">{product.description}</p>
                    <button className="mt-6 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-blue-700">
                        Add to Cart
                    </button>
                    <div>
                        <a href="/" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
                        &larr; Back to Products
                    </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default ProductDetails;