import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Panier() {
  const { items, removeFromCart, updateQuantite, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Ton panier est vide.</p>
        <Link to="/" className="text-blue-600 underline">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Mon panier</h2>

      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-3">
          <div>
            <p className="font-medium">{item.nom}</p>
            <p className="text-gray-500">{item.prix} FCFA</p>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => updateQuantite(item.id, item.quantite - 1)}>
              -
            </button>
            <span>{item.quantite}</span>
            <button type="button" onClick={() => updateQuantite(item.id, item.quantite + 1)}>
              +
            </button>
          </div>

          <p className="font-semibold">{item.prix * item.quantite} FCFA</p>

          <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm text-red-500">
            Supprimer
          </button>
        </div>
      ))}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-bold">Total : {total} FCFA</p>
        <Link to="/checkout" className="rounded bg-black px-4 py-2 text-white hover:opacity-80">
          Passer au paiement
        </Link>
      </div>
    </div>
  );
}
