import { container } from 'tsyringe';
import { BaseControl } from '../base-control/base-control.abstract';
import { ControlComponentConfig } from '../control-component-config.interface';
import { FormSpy } from '../../../../core/spy/form-spy/form-spy';
import { CouponState } from '../../../../core/coupon/coupon-state.enum';
import { AppliedCoupon } from '../../../../core/coupon/applied-coupon.interface';
import { CouponTemplateContext, getCouponTemplate } from './coupon.template';
import { LocalizeService } from '../../../../core/i18n/localize.service';
import './coupon.component.scss';
import { Message } from '../../../../core/message.interface';
import { EventName } from '../../../../core/event-name.enum';
import { applyCouponHandler } from '../../post-messages-handlers/apply-coupon.handler';
import { removeCouponHandler } from '../../post-messages-handlers/remove-coupon.handler';
import { couponUpdateHandler } from '../../post-messages-handlers/coupon-update.handler';

export class CouponComponent extends BaseControl<ControlComponentConfig> {
  protected config: ControlComponentConfig | null = null;

  private readonly formSpy: FormSpy;
  private readonly localizeService: LocalizeService;

  private couponState: CouponState = CouponState.idle;
  private appliedCoupon: AppliedCoupon | null = null;
  private inputValue = '';
  private couponError: string | null = null;
  private couponChangeUnsubscribe?: () => void;

  public constructor() {
    super();
    this.formSpy = container.resolve(FormSpy);
    this.localizeService = container.resolve(LocalizeService);
  }

  protected connectedCallback(): void {
    this.controlName = 'couponCode';

    if (!this.formSpy.formWasInit) {
      this.formSpy.listenFormInit(() => this.initComponent());
      return;
    }

    this.initComponent();
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();
    this.couponChangeUnsubscribe?.();
  }

  protected getHtml(): string {
    const context: CouponTemplateContext = {
      value: this.inputValue,
      state: this.couponState,
      coupon: this.appliedCoupon,
      error: this.couponError,
      placeholder: this.localizeService.translate('coupon.placeholder'),
      applyLabel: this.localizeService.translate('coupon.apply'),
      discountLabel: this.localizeService.translate('coupon.discount'),
    };

    return getCouponTemplate(context);
  }

  private initComponent(): void {
    this.listenFieldStatusChange();

    void this.getComponentConfig(this.controlName).then((config) => {
      this.config = config;
      this.render();
      this.bindEvents();
      this.subscribeToCouponChanges();
      this.finishLoadingFormControlHandler(this.controlName);
    });
  }

  private bindEvents(): void {
    this.removeAllEventListeners();

    const input = this.querySelector<HTMLInputElement>('.coupon-input');
    const applyBtn = this.querySelector<HTMLButtonElement>('.coupon-apply-btn');
    const removeBtn =
      this.querySelector<HTMLButtonElement>('.coupon-remove-btn');

    if (input) {
      this.addEventListenerToElement(input, 'input', (event: Event) => {
        this.inputValue = (event.target as HTMLInputElement).value;
      });
      this.addEventListenerToElement(input, 'focus', () => {
        this.notifyOnFocusEvent();
      });
      this.addEventListenerToElement(input, 'blur', () => {
        this.notifyOnBlurEvent();
      });
    }

    if (applyBtn) {
      this.addEventListenerToElement(applyBtn, 'click', () => {
        void this.applyCoupon();
      });
    }

    if (removeBtn) {
      this.addEventListenerToElement(removeBtn, 'click', () => {
        this.removeCoupon();
      });
    }
  }

  private async applyCoupon(): Promise<void> {
    const code = this.inputValue.trim();
    if (!code) {
      return;
    }

    this.couponState = CouponState.loading;
    this.couponError = null;
    this.render();
    this.bindEvents();

    try {
      const result = await this.onCouponApply(code);

      if (result?.isValid) {
        this.couponState = CouponState.applied;
        this.appliedCoupon = result;
        this.couponError = null;
      } else {
        this.couponState = CouponState.error;
        this.couponError = result?.errorMessage ?? null;
      }
    } catch {
      this.couponState = CouponState.error;
    }

    this.render();
    this.bindEvents();
  }

  private removeCoupon(): void {
    this.onCouponRemove();
    this.couponState = CouponState.idle;
    this.appliedCoupon = null;
    this.inputValue = '';
    this.couponError = null;
    this.render();
    this.bindEvents();
  }

  private subscribeToCouponChanges(): void {
    this.couponChangeUnsubscribe = this.onCouponChange((coupon) => {
      if (coupon?.isValid) {
        this.couponState = CouponState.applied;
        this.appliedCoupon = coupon;
        this.couponError = null;
      } else if (coupon && !coupon.isValid) {
        this.couponState = CouponState.error;
        this.couponError = coupon.errorMessage ?? null;
      } else {
        this.couponState = CouponState.idle;
        this.appliedCoupon = null;
      }
      this.render();
      this.bindEvents();
    });
  }

  private async onCouponApply(code: string): Promise<AppliedCoupon> {
    const msg: Message = {
      name: EventName.applyCoupon,
      data: { code },
    };

    return this.postMessagesClient.send<AppliedCoupon>(
      msg,
      applyCouponHandler,
    ) as Promise<AppliedCoupon>;
  }
  private onCouponRemove(): void {
    void this.postMessagesClient.send(
      { name: EventName.removeCoupon },
      removeCouponHandler,
    );
  }
  private onCouponChange(
    callback: (coupon: AppliedCoupon | null) => void,
  ): () => void {
    return this.postMessagesClient.listen<AppliedCoupon | null>(
      EventName.couponUpdate,
      couponUpdateHandler,
      (coupon) => callback(coupon ?? null),
    );
  }
}
