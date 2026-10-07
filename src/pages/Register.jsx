import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthStore } from '../store/authStore';

export default function Register() {
  const navigate = useNavigate();
  const registerUser = useAuthStore(
    (state) => state.register
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => {
    registerUser(data.name, data.email);

    toast.success('Compte créé avec succès');

    navigate('/');
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">
          Créer un compte
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">
              Nom
            </label>

            <input
              {...register('name', {
                required: 'Nom obligatoire'
              })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Votre nom"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              {...register('email', {
                required: 'Email obligatoire'
              })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="vous@example.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Mot de passe
            </label>

            <input
              type="password"
              {...register('password', {
                required: 'Mot de passe obligatoire',
                minLength: {
                  value: 6,
                  message:
                    'Le mot de passe doit avoir au moins 6 caractères'
                }
              })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Confirmation
            </label>

            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Confirmation obligatoire',
                validate: (value) =>
                  value === password ||
                  'Les mots de passe ne correspondent pas'
              })}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            Créer mon compte
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Déjà inscrit ?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
}