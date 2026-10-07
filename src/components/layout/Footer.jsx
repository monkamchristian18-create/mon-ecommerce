export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold">
              Mon E-commerce
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Votre boutique en ligne simple, moderne et
              accessible.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Navigation</h3>

            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <p>Accueil</p>
              <p>Produits</p>
              <p>Catégories</p>
              <p>Panier</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>

            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <p>Email : contact@mon-ecommerce.com</p>
              <p>Téléphone : +237 600 000 000</p>
              <p>Douala, Cameroun</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Mon E-commerce. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}