const statistics = [
  {
    title: 'Produits',
    value: '128',
    icon: '📦'
  },
  {
    title: 'Commandes',
    value: '356',
    icon: '🛒'
  },
  {
    title: 'Clients',
    value: '842',
    icon: '👥'
  },
  {
    title: 'Revenus',
    value: '12.5M',
    icon: '💰'
  }
];

export default function AdminDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div>
        <p className="font-semibold text-blue-600">
          ADMINISTRATION
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Dashboard
        </h1>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((statistic) => (
          <div
            key={statistic.title}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="text-3xl">
              {statistic.icon}
            </div>

            <p className="mt-5 text-sm text-slate-500">
              {statistic.title}
            </p>

            <p className="mt-1 text-3xl font-black">
              {statistic.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Activité récente
        </h2>

        <p className="mt-3 text-slate-500">
          Les données réelles pourront être récupérées depuis
          ton backend avec Axios.
        </p>
      </div>
    </section>
  );
}