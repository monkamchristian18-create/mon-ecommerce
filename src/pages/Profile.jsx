import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/authStore';

export default function Profile() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (!user) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black">
          Vous n'êtes pas connecté
        </h1>

        <button
          onClick={() => navigate('/login')}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white"
        >
          Se connecter
        </button>
      </section>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-black text-blue-600">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1 className="mt-6 text-3xl font-black">
          Mon profil
        </h1>

        <div className="mt-8 space-y-4">
          <div>
            <p className="text-sm text-slate-500">
              Nom
            </p>

            <p className="font-semibold">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="font-semibold">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Type de compte
            </p>

            <p className="font-semibold capitalize">
              {user.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
        >
          Se déconnecter
        </button>
      </div>
    </section>
  );
}