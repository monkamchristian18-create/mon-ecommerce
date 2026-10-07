import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/formatCurrency';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 2000 : 0;
  const total = subtotal + shipping;

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success('Produit supprimé');
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="rounded-2xl bg-white p-12 shadow-sm">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-6 text-3xl font-black">
            Votre panier est vide
          </h1>

          <p className="mt-3 text-slate-500">
            Ajoutez des produits pour commencer vos achats.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Voir les produits
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-black">Mon panier</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-full rounded-xl object-cover sm:w-28"
              />

              <div className="flex-1">
                <h2 className="font-bold">{item.name}</h2>

                <p className="mt-1 text-sm text-slate-500">
                  {formatCurrency(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                  className="h-9 w-9 rounded-lg bg-slate-100 font-bold"
                >
                  −
                </button>

                <span className="w-6 text-center font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                  className="h-9 w-9 rounded-lg bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="font-medium text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Résumé de la commande
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-500">
                Sous-total
              </span>

              <span className="font-semibold">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Livraison
              </span>

              <span className="font-semibold">
                {formatCurrency(shipping)}
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>

                <span className="font-black text-blue-600">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-lg bg-blue-600 px-5 py-3 text-center font-bold text-white hover:bg-blue-700"
          >
            Passer la commande
          </Link>
        </aside>
      </div>
    </section>
  );
}