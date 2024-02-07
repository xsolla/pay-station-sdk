import { StatusComponentConfig } from './template-config/status.component.config.interface';

export const getStatusComponentTemplate = (
  statusConfig: StatusComponentConfig
): string => {
  return `
  <div class="status">
    ${
      statusConfig.image
        ? `
    <div class="image-container">
      <img class="image" src="${statusConfig.image}" alt="${statusConfig.title}" />
    </div>`
        : ''
    }

    <div class="title">
      <h2 class="title-text">${statusConfig.title}</h2>
    </div>

    ${
      statusConfig.showDescription
        ? `<p class="description">${statusConfig.description}</p>`
        : ''
    }
  </div>
  `;
};
