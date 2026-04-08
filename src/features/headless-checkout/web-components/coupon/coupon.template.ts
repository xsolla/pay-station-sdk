import { CouponState } from '../../../../core/coupon/coupon-state.enum';
import { AppliedCoupon } from '../../../../core/coupon/applied-coupon.interface';

export interface CouponTemplateContext {
  value: string;
  state: CouponState;
  coupon: AppliedCoupon | null;
  error: string | null;
  placeholder: string;
  applyLabel: string;
  discountLabel: string;
}

const getDiscountPercent = (
  currentAmount: number,
  totalAmount: number,
): string => {
  const totalPercent = 100;
  return ((currentAmount * totalPercent) / totalAmount).toFixed(0);
};

const getIdleTemplate = (context: CouponTemplateContext): string => {
  return `
    <div class='coupon-input-wrapper idle'>
      <input
        type='text'
        class='coupon-input'
        name='couponCode'
        placeholder='${context.placeholder}'
        value='${context.value}'
      />
      <button class='coupon-apply-btn' type='button'>${
        context.applyLabel
      }</button>
    </div>
    ${context.error ? `<div class='field-error'>${context.error}</div>` : ''}
  `;
};

const getLoadingTemplate = (context: CouponTemplateContext): string => {
  return `
    <div class='coupon-input-wrapper loading'>
      <input
        type='text'
        class='coupon-input'
        name='couponCode'
        placeholder='${context.placeholder}'
        value='${context.value}'
        disabled
      />
      <button class='coupon-apply-btn coupon-apply-btn--loading' type='button' disabled>${context.applyLabel}</button>
    </div>
  `;
};

const getAppliedTemplate = (context: CouponTemplateContext): string => {
  const hasDiscount = Boolean(
    context.coupon?.discount && context.coupon?.subTotal,
  );

  const discount = hasDiscount
    ? `<span class='coupon-discount'>${context.discountLabel.replace(
        '{{value}}',
        getDiscountPercent(
          context.coupon?.discount?.amount as unknown as number,
          context.coupon?.subTotal?.payment_amount as unknown as number,
        ),
      )}</span>`
    : '';

  return `
    <div class='coupon-applied'>
      <div class='coupon-tag'>
        ${context.coupon?.code ?? context.value ?? ''}
        <button class='coupon-remove-btn' type='button'>&times;</button>
      </div>
      ${discount}
    </div>
  `;
};

const getErrorTemplate = (context: CouponTemplateContext): string => {
  return `
    <div class='coupon-input-wrapper error'>
     ${getAppliedTemplate(context)}
    </div>
    ${context.error ? `<div class='field-error'>${context.error}</div>` : ''}
  `;
};

export const getCouponTemplate = (context: CouponTemplateContext): string => {
  switch (context.state) {
    case CouponState.loading:
      return getLoadingTemplate(context);
    case CouponState.applied:
      return getAppliedTemplate(context);
    case CouponState.error:
      return getErrorTemplate(context);
    case CouponState.idle:
    default:
      return getIdleTemplate(context);
  }
};
