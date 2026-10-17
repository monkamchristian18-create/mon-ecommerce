import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { getProduits } from '../services/shopApi';
import type { Produit } from '../types';

export default function Catalogue() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [chargement, setChargement] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let actif = true;

    getProduits()
      .then((data) => {
        if (actif) setProduits(data);
      })
      .catch((error: unknown) => {
        if (actif) {
          setErreur(error instanceof Error ? error.message : 'Impossible de charger les produits.');
        }
      })
      .finally(() => {
        if (actif) setChargement(false);
      });

    return () => {
      actif = false;
    };
  }, []);

  const handleAjouter = (produit: Produit): void => {
    addToCart(produit);
    toast.success(`${produit.nom} ajouté au panier`);
  };

  if (chargement) return <p className="p-4">Chargement des produits...</p>;
  if (erreur) return <p className="p-4 text-red-600">{erreur}</p>;
  if (produits.length === 0) return <p className="p-4">Aucun produit disponible pour le moment.</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {produits.map((produit) => (
        <div key={produit.id} className="flex flex-col rounded-lg border p-3">
          {produit.image ? (
            <img src={produit.image} alt={produit.nom} className="h-40 w-full rounded object-cover" />
          ) : (
            <div className="flex h-40 w-full items-center justify-center rounded bg-gray-100 text-sm text-gray-400">
              Pas d'image
            </div>
          )}
          <h3 className="mt-2 font-semibold">{produit.nom}</h3>
          <p className="text-gray-600">{new Intl.NumberFormat('fr-FR').format(produit.prix)} FCFA</p>
          <button
            type="button"
            onClick={() => handleAjouter(produit)}
            className="mt-auto rounded bg-black py-2 text-white hover:opacity-80"
          >
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}
