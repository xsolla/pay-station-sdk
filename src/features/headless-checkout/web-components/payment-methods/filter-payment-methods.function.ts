import { PaymentMethod } from '../../../../core/payment-method.interface';

export const filterPaymentMethods = (
  paymentMethods: PaymentMethod[] | undefined,
  searchValue: string,
): PaymentMethod[] | undefined => {
  return paymentMethods?.filter((paymentMethod: PaymentMethod) =>
    paymentMethod.name
      .toLowerCase()
      .includes(String(searchValue).toLowerCase()),
  );
};
