const orders = [
  {
    id: '#CMD-001',
    customer: 'Client 1',
    total: '185 000 FCFA',
    status: 'Confirmée'
  },
  {
    id: '#CMD-002',
    customer: 'Client 2',
    total: '450 000 FCFA',
    status: 'En attente'
  },
  {
    id: '#CMD-003',
    customer: 'Client 3',
    total: '75 000 FCFA',
    status: 'Livrée'
  }
];

export default function AdminOrders() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <p className="font-semibold text-blue-600">
        ADMINISTRATION
      </p>

      <h1 className="mt-2 text-4xl font-black">
        Commandes
      </h1>

      <div className="mt-10 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[700px] text-left">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-6 py-4">Commande</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Statut</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-0"
              >
                <td className="px-6 py-4 font-semibold">
                  {order.id}
                </td>

                <td className="px-6 py-4">
                  {order.customer}
                </td>

                <td className="px-6 py-4">
                  {order.total}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}