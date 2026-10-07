import { Link, NavLink } from 'react-router-dom';

import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const linkClass = ({ isActive }) =>
    `font-medium ${
      isActive
        ? 'text-blue-600'
        : 'text-slate-700 hover:text-blue-600'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <Link
          to="/"
          className="text-2xl font-black text-blue-600"
        >
          Mon E-commerce
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>
            Accueil
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Produits
          </NavLink>

          <NavLink to="/categories" className={linkClass}>
            Catégories
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-xl hover:bg-slate-100"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="hidden rounded-lg bg-slate-100 px-4 py-2 font-medium hover:bg-slate-200 sm:block"
            >
              {user.name}
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}