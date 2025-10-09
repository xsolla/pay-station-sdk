import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';

export class ReturnComponent extends WebComponentAbstract {
  protected readonly window: Window;

  public constructor() {
    super();
    this.window = container.resolve(Window);
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    this.handleReturnLogic();
  }

  protected getHtml(): string {
    return ``;
  }

  private handleReturnLogic(): void {
    const opener = this.window.opener as Window | null;

    if (opener) {
      opener.postMessage(
        {
          type: 'statusUrl',
          searchParams: this.window.location.search,
        },
        '*',
      );
    } else {
      throw new Error('No parent window found.');
    }
  }
}
