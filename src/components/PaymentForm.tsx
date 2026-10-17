
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

type PaymentMethod = "MTN_MOMO" | "ORANGE_MONEY" | "CASH_ON_DELIVERY";

interface PaymentFormProps {
  amount: number;
  onSubmit?: (data: PaymentData) => void | Promise<void>;
}

export interface PaymentData {
  paymentMethod: PaymentMethod;
  phoneNumber: string;
  amount: number;
}

export default function PaymentForm({
  amount,
  onSubmit,
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("MTN_MOMO");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Le montant de la commande est invalide.");
      return;
    }

    if (paymentMethod !== "CASH_ON_DELIVERY") {
      const normalizedPhone = phoneNumber.replace(/[\s-]/g, "");

      if (!/^(?:\+237|237)?[2368]\d{8}$/.test(normalizedPhone)) {
        toast.error("Veuillez entrer un numéro camerounais valide.");
        return;
      }
    }

    if (!onSubmit) {
      toast.error("Le service de paiement n'est pas encore configuré.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        paymentMethod,
        phoneNumber:
          paymentMethod === "CASH_ON_DELIVERY" ? "" : phoneNumber.trim(),
        amount,
      });

      toast.success("Votre demande de paiement a été envoyée.");
    } catch {
      toast.error("Impossible de traiter la demande. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-lg space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Mode de paiement
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Choisissez comment vous souhaitez régler votre commande.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Moyen de paiement
        </label>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-yellow-500">
            <input
              type="radio"
              name="paymentMethod"
              value="MTN_MOMO"
              checked={paymentMethod === "MTN_MOMO"}
              onChange={() => setPaymentMethod("MTN_MOMO")}
              className="accent-yellow-500"
            />

            <span className="font-medium text-gray-800">
              MTN Mobile Money
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-orange-500">
            <input
              type="radio"
              name="paymentMethod"
              value="ORANGE_MONEY"
              checked={paymentMethod === "ORANGE_MONEY"}
              onChange={() => setPaymentMethod("ORANGE_MONEY")}
              className="accent-orange-500"
            />

            <span className="font-medium text-gray-800">
              Orange Money
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-green-500">
            <input
              type="radio"
              name="paymentMethod"
              value="CASH_ON_DELIVERY"
              checked={paymentMethod === "CASH_ON_DELIVERY"}
              onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
              className="accent-green-600"
            />

            <span className="font-medium text-gray-800">
              Paiement à la livraison
            </span>
          </label>
        </div>
      </div>

      {paymentMethod !== "CASH_ON_DELIVERY" && (
        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Numéro de téléphone Mobile Money
          </label>

          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            autoComplete="tel"
            placeholder="+237 6XX XXX XXX"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      )}

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Montant à payer</span>

          <span className="text-xl font-bold text-gray-900">
            {new Intl.NumberFormat("fr-FR").format(amount)} FCFA
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Traitement..." : "Confirmer la commande"}
      </button>

      <p className="text-xs leading-5 text-gray-500">
        Le paiement mobile doit être confirmé par un service de paiement
        sécurisé avant que la commande soit considérée comme payée.
      </p>
    </form>
  );
}