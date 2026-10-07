import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';

export default function AdminProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-blue-600">
            ADMINISTRATION
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Produits
          </h1>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700">
          + Ajouter un produit
        </button>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[700px] text-left">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-6 py-4">Produit</th>
              <th className="px-6 py-4">Catégorie</th>
              <th className="px-6 py-4">Prix</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-0"
              >
                <td className="px-6 py-4 font-semibold">
                  {product.name}
                </td>

                <td className="px-6 py-4">
                  {product.category}
                </td>

                <td className="px-6 py-4">
                  {formatCurrency(product.price)}
                </td>

                <td className="px-6 py-4">
                  <button className="font-semibold text-blue-600">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}