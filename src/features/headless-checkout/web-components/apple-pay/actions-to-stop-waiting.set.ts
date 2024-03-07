import { NextAction } from '../../../../core/actions/next-action.interface';

export const actionsToStopWaiting: Set<NextAction['type']> = new Set([
  'show_fields',
  'status_updated',
  'show_errors',
]);
