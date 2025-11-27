export interface CheckoutForm {
  method: string;
  action: string;
  params?: { [key: string]: string };
  redirect: {
    isNewWindowRequired: boolean;
    isSameWindowRequired: boolean;
  };
}
