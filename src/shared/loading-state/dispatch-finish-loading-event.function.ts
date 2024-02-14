import { EventName } from '../../core/event-name.enum';

export function createFinishLoadingEvent(componentName: string): CustomEvent {
  const eventOptions = {
    bubbles: true,
    composed: true,
    detail: {
      componentName,
    },
  };

  return new CustomEvent(EventName.finishLoadComponent, eventOptions);
}
