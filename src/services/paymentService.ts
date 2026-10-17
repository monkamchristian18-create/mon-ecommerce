import api from "./api";

export type PaymentMethod =
  | "MTN_MOMO"
  | "ORANGE_MONEY"
  | "CASH_ON_DELIVERY";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED";

export interface CreatePaymentData {
  orderId: number;
  paymentMethod: PaymentMethod;
  phoneNumber?: string;
}

export interface PaymentResponse {
  id: number;
  orderId: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  transactionReference?: string;
  createdAt: string;
}

export const paymentService = {
  async create(data: CreatePaymentData): Promise<PaymentResponse> {
    const response = await api.post<PaymentResponse>(
      "/payments",
      data,
    );

    return response.data;
  },

  async getStatus(paymentId: number): Promise<PaymentResponse> {
    const response = await api.get<PaymentResponse>(
      `/payments/${paymentId}`,
    );

    return response.data;
  },
};

export default paymentService;