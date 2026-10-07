import { Link } from 'react-router-dom';

import ProductGrid from '../components/products/ProductGrid';
import { products } from '../data/products';

export default function Home() {
  return (
    <div>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 font-semibold text-blue-400">
              BIENVENUE
            </p>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Tout ce dont vous avez besoin, au même endroit.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Découvrez nos produits et profitez d'une expérience
              d'achat simple et moderne.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold hover:bg-blue-700"
            >
              Découvrir les produits
            </Link>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-800 p-10">
            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur">
              <p className="text-6xl">🛍️</p>

              <h2 className="mt-6 text-2xl font-bold">
                Votre boutique en ligne
              </h2>

              <p className="mt-3 text-blue-100">
                Commandez facilement depuis votre ordinateur
                ou votre téléphone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-semibold text-blue-600">
              PRODUITS
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Produits populaires
            </h2>
          </div>

          <Link
            to="/products"
            className="font-semibold text-blue-600"
          >
            Voir tout →
          </Link>
        </div>

        <ProductGrid products={products.slice(0, 4)} />
      </section>
    </div>
  );
}