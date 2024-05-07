import i18next from 'i18next';

export const getInstructionTemplate = (
  paymentMethodName: string,
  projectName?: string,
): string => {
  return `<div class='instruction-wrapper'>
<h3 class="title">${i18next.t('xsolla-number.instruction.how-to')}</h3>
<ul class="instruction">
  <li class="paragraph">${i18next.t('xsolla-number.instruction.paragraph-one', {
    paymentMethodName,
  })}</li>
  <li class="paragraph">
    ${i18next.t('xsolla-number.instruction.paragraph-two', { projectName })}
  </li>
  <li class="paragraph">
    ${i18next.t('xsolla-number.instruction.paragraph-three')}
  </li>
  <li class="paragraph">
    ${i18next.t('xsolla-number.instruction.paragraph-four')}
  </li>
</ul>

<p class='notifier'>
    ${i18next.t('xsolla-number.instruction.notification')}
</p>
</div>`;
};
