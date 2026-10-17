export interface Produit {
  id: number;
  nom: string;
  prix: number;
  image: string;
  description: string | null;
  stock: number;
}

export interface CartItem extends Produit {
  quantite: number;
}

export interface Commande {
  id: number;
  total: number;
  nom: string;
  adresse: string;
  ville: string;
  statutPaiement: string;
}

export interface NouvelleCommande {
  items: { id: number; quantite: number }[];
  nom: string;
  adresse: string;
  ville: string;
}
