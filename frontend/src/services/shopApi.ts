import type { Commande, NouvelleCommande, Produit } from '../types';

const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

async function readError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string };
    return body.error ?? `Erreur serveur (${res.status})`;
  } catch {
    return `Erreur serveur (${res.status})`;
  }
}

export async function getProduits(): Promise<Produit[]> {
  const res = await fetch(`${API_URL}/produits`);
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as Produit[];
}

export async function createCommande(data: NouvelleCommande): Promise<Commande> {
  const res = await fetch(`${API_URL}/commandes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await readError(res));
  return (await res.json()) as Commande;
}

export async function choisirPaiementLivraison(commandeId: number): Promise<void> {
  const res = await fetch(`${API_URL}/commandes/${commandeId}/paiement-livraison`, {
    method: 'PATCH'
  });
  if (!res.ok) throw new Error(await readError(res));
}
