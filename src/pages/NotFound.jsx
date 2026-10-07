import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-7xl font-black text-blue-600">
        404
      </p>

      <h1 className="mt-5 text-3xl font-black">
        Page introuvable
      </h1>

      <p className="mt-3 text-slate-500">
        La page que vous recherchez n'existe pas.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
      >
        Retour à l'accueil
      </Link>
    </section>
  );
}