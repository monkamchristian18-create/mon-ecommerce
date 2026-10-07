import { Link } from 'react-router-dom';

import { categories, products } from '../data/products';

export default function Categories() {
  const categoryList = categories.filter(
    (category) => category !== 'Toutes'
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="font-semibold text-blue-600">
          COLLECTION
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Catégories
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((category) => {
          const count = products.filter(
            (product) => product.category === category
          ).length;

          return (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">📦</div>

              <h2 className="mt-5 text-xl font-bold">
                {category}
              </h2>

              <p className="mt-2 text-slate-500">
                {count} produit{count > 1 ? 's' : ''}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}