import { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
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
            });
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center p-6">
                <p className="text-lg font-medium text-slate-700">Loading products...</p>
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

    return (
        <main className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
            <section className="mx-auto max-w-7xl">
                <div className="mb-10 rounded-3xl bg-gradient-to-r from-amber-300 via-amber-200 to-slate-100 p-8 shadow-sm shadow-slate-200">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Explore Our Products
                    </h1>
                    <p className="mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
                        Discover your next favorite item with curated products displayed in a clean responsive layout.
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="rounded-3xl bg-white p-10 text-center shadow-sm shadow-slate-200">
                        <p className="text-xl font-semibold text-slate-700">No products available right now.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default ProductList;

