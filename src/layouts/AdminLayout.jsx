import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 bg-slate-950 p-6 text-white md:block">
          <Link
            to="/"
            className="text-xl font-black"
          >
            Mon E-commerce
          </Link>

          <p className="mt-2 text-sm text-slate-400">
            Administration
          </p>

          <nav className="mt-10 space-y-2">
            <Link
              to="/admin"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              📊 Dashboard
            </Link>

            <Link
              to="/admin/products"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              📦 Produits
            </Link>

            <Link
              to="/admin/orders"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              🛒 Commandes
            </Link>

            <Link
              to="/"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800"
            >
              ← Boutique
            </Link>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="border-b bg-white px-4 py-4 md:hidden">
            <Link
              to="/"
              className="font-bold text-blue-600"
            >
              ← Retour à la boutique
            </Link>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}