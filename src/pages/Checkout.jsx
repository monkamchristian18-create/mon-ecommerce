import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/formatCurrency';

export default function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const { register, handleSubmit } = useForm();

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 2000 : 0;
  const total = subtotal + shipping;

  const onSubmit = (data) => {
    console.log('Commande:', {
      customer: data,
      items,
      total
    });

    clearCart();

    toast.success('Commande enregistrée');

    navigate('/');
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black">
          Aucun produit à commander
        </h1>

        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white"
        >
          Voir les produits
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-black">
        Finaliser la commande
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold">
            Informations de livraison
          </h2>

          <div className="mt-6 grid gap-5">
            <input
              {...register('name', {
                required: true
              })}
              placeholder="Nom complet"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              type="email"
              {...register('email', {
                required: true
              })}
              placeholder="Email"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              {...register('phone', {
                required: true
              })}
              placeholder="Téléphone"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              {...register('address', {
                required: true
              })}
              placeholder="Adresse"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              {...register('city', {
                required: true
              })}
              placeholder="Ville"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <h2 className="mt-10 text-xl font-bold">
            Mode de paiement
          </h2>

          <select
            {...register('payment', {
              required: true
            })}
            className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="">
              Choisir un mode de paiement
            </option>

            <option value="cash">
              Paiement à la livraison
            </option>

            <option value="mobile_money">
              Mobile Money
            </option>
          </select>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Résumé
          </h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span className="font-semibold">
                  {formatCurrency(
                    item.price * item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t pt-5">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Livraison</span>
              <span>{formatCurrency(shipping)}</span>
            </div>

            <div className="flex justify-between text-lg font-black">
              <span>Total</span>
              <span className="text-blue-600">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Confirmer la commande
          </button>
        </aside>
      </form>
    </section>
  );
}