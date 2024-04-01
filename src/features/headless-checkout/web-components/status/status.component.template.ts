import { StatusComponentConfig } from './template-config/status.component.config.interface';
import i18next from 'i18next';

export const getStatusComponentTemplate = (
  statusConfig: StatusComponentConfig,
): string => {
  const autoCancellationMessage = !statusConfig.autoCancellation
    ? `<div class='message'>${i18next.t(
        'status.message.auto-cancellation',
      )}</div>`
    : '';

  return `
  <div class='status'>
    <div class='title'>
      <h2 class='title-text'>${statusConfig.title}</h2>
    </div>
    
    

    ${
      statusConfig.showDescription
        ? `<p class='description'>${statusConfig.description}</p>`
        : ''
    }
    ${
      statusConfig.status === 'processing' || statusConfig.status === 'awaiting'
        ? `${autoCancellationMessage}<div class='loader'></div>`
        : ''
    }
  </div>
  `;
};
