import { useMemo, useState } from 'react';

import ProductGrid from '../components/products/ProductGrid';
import { categories, products } from '../data/products';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Toutes');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === 'Toutes' ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10">
        <p className="font-semibold text-blue-600">
          BOUTIQUE
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Nos produits
        </h1>

        <p className="mt-3 text-slate-500">
          Trouvez facilement le produit que vous recherchez.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <input
          type="search"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
}