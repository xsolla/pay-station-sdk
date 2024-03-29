export const enum EventName {
  isReady = 'isReady',
  error = 'error',
  initPayment = 'initPayment',
  initForm = 'initForm',
  submitForm = 'submitForm',
  getPaymentMethodsList = 'getPaymentMethodsList',
  getPaymentQuickMethods = 'getPaymentQuickMethods',
  getCombinedPaymentMethods = 'getCombinedPaymentMethods',
  getSavedMethods = 'getSavedMethods',
  getUserBalance = 'getUserBalance',
  getUserBalanceValue = 'getUserBalanceValue',
  getLegalComponentConfig = 'getLegalComponentConfig',
  getPaymentStatus = 'getPaymentStatus',
  legalComponentPing = 'legalComponentPing',
  legalComponentPong = 'legalComponentPong',
  financeDetails = 'financeDetails',
  nextAction = 'nextAction',
  warning = 'warning',
  getControlComponentConfig = 'getControlComponentConfig',
  setSecureComponentStyles = 'setSecureComponentStyles',
  formFieldsStatusChanged = 'formFieldsStatusChanged',
  updateCreditCardType = 'updateCreditCardType',
  publicControlChangeState = 'publicControlChangeState',
  publicControlOnValueChanges = 'publicControlOnValueChanges',
  formMessagesChanged = 'formMessagesChanged',
  savedMethodSelected = 'savedMethodSelected',
  deleteSavedMethod = 'deleteSavedMethod',
  deletedSavedMethodStatus = 'deletedSavedMethodStatus',
  finishLoadComponent = 'finishLoadComponent',
  getFormStatus = 'getFormStatus',
  applePayError = 'applePayError',
  openApplePayPage = 'openApplePayPage',
  submitApplePayForm = 'submitApplePayForm',
}
