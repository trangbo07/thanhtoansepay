export type PaidOrderRecord = {
  invoice: string;
  amount?: number;
  paidAt: string;
  sepayOrderId?: string;
};

type PaymentStoreGlobal = typeof globalThis & {
  sepayPaidOrders?: Map<string, PaidOrderRecord>;
};

const globalStore = globalThis as PaymentStoreGlobal;

function getStore() {
  if (!globalStore.sepayPaidOrders) {
    globalStore.sepayPaidOrders = new Map();
  }
  return globalStore.sepayPaidOrders;
}

export function markOrderPaid(record: PaidOrderRecord) {
  getStore().set(record.invoice, record);
}

export function isOrderPaid(invoice: string) {
  return getStore().has(invoice);
}

export function getPaidOrder(invoice: string) {
  return getStore().get(invoice);
}
