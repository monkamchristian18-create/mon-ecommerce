import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PaymentForm from '../components/PaymentForm';
import type { PaymentData } from '../components/PaymentForm';
import { useCart } from '../context/CartContext';
import { choisirPaiementLivraison, createCommande } from '../services/shopApi';
import { startPayment, waitForMtnPayment } from '../services/paymentApi';

interface Livraison {
  nom: string;
  adresse: string;
  ville: string;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [livraison, setLivraison] = useState<Livraison>({ nom: '', adresse: '', ville: '' });
  const [commandeId, setCommandeId] = useState<number | null>(null);
  const [montant, setMontant] = useState<number>(0);
  const [creation, setCreation] = useState<boolean>(false);

  const handleCreerCommande = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setCreation(true);

    try {
      const commande = await createCommande({
        items: items.map((item) => ({ id: item.id, quantite: item.quantite })),
        ...livraison
      });
      setCommandeId(commande.id);
      setMontant(commande.total); // total calculé par le serveur
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Impossible de créer la commande.');
    } finally {
      setCreation(false);
    }
  };

  const handlePayment = async (data: PaymentData): Promise<void> => {
    if (commandeId === null) {
      throw new Error('Commande introuvable');
    }

    if (data.paymentMethod === 'CASH_ON_DELIVERY') {
      await choisirPaiementLivraison(commandeId);
    } else {
      const { reference, payment_url } = await startPayment(data, commandeId);

      if (payment_url) {
        window.location.href = payment_url; // Orange Money : redirection
        return;
      }

      const statut = await waitForMtnPayment(reference); // MTN : attente de la validation
      if (statut !== 'success') {
        throw new Error('Paiement non confirmé');
      }
    }

    clearCart();
    navigate('/');
  };

  if (items.length === 0 && commandeId === null) {
    return <p className="p-6 text-center">Ton panier est vide.</p>;
  }

  return (
    <div className="mx-auto max-w-lg p-4">
      <h2 className="mb-4 text-xl font-bold">Finaliser la commande</h2>

      {commandeId === null ? (
        <form onSubmit={handleCreerCommande} className="flex flex-col gap-3">
          <p>
            Total estimé : <strong>{total} FCFA</strong>
          </p>
          <input
            type="text"
            placeholder="Nom complet"
            value={livraison.nom}
            onChange={(e) => setLivraison({ ...livraison, nom: e.target.value })}
            required
            className="rounded border p-2"
          />
          <input
            type="text"
            placeholder="Adresse de livraison"
            value={livraison.adresse}
            onChange={(e) => setLivraison({ ...livraison, adresse: e.target.value })}
            required
            className="rounded border p-2"
          />
          <input
            type="text"
            placeholder="Ville"
            value={livraison.ville}
            onChange={(e) => setLivraison({ ...livraison, ville: e.target.value })}
            required
            className="rounded border p-2"
          />
          <button
            type="submit"
            disabled={creation}
            className="rounded bg-black py-2 text-white disabled:opacity-50"
          >
            {creation ? 'Création...' : 'Continuer vers le paiement'}
          </button>
        </form>
      ) : (
        <PaymentForm amount={montant} onSubmit={handlePayment} />
      )}
    </div>
  );
}
