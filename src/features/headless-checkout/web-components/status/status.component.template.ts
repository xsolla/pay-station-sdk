import { StatusComponentConfig } from './template-config/status.component.config.interface';

export const getStatusComponentTemplate = (
  statusConfig: StatusComponentConfig,
): string => {
  return `
  <div class="status">
    <div class="title">
      <h2 class="title-text">${statusConfig.title}</h2>
    </div>

    ${
      statusConfig.showDescription
        ? `<p class="description">${statusConfig.description}</p>`
        : ''
    }
    ${
      statusConfig.status === 'processing' || statusConfig.status === 'awaiting'
        ? '<div class="loader"></div>'
        : ''
    }
  </div>
  `;
};
