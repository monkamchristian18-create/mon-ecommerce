import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Produit ajouté au panier');
  };

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
      </Link>

      <div className="p-5">
        <p className="mb-2 text-sm font-medium text-blue-600">
          {product.category}
        </p>

        <h3 className="text-lg font-bold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-slate-900">
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}