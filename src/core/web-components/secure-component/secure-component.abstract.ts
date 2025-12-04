import { container } from 'tsyringe';
import { WebComponentAbstract } from '../web-component.abstract';
import { EnvironmentService } from '../../environment/environment.service';

export abstract class SecureComponentAbstract extends WebComponentAbstract {
  protected componentName: string | null = null;
  protected environmentService: EnvironmentService;

  protected constructor() {
    super();
    this.environmentService = container.resolve(EnvironmentService);
  }

  protected getSecureHtml(): string {
    if (!this.componentName) {
      throw new Error('Component name is required');
    }

    const appUrl = this.environmentService.getHeadlessCheckoutAppUrl();
    return `<iframe src='${appUrl}/secure-components/${this.componentName}'></iframe>`;
  }
}
