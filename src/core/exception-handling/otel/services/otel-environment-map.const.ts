import { EnvironmentService } from '../../../environment/environment.service';
import { OtelEnvironmentTag } from './otel-environments-tags.type';
import { container } from 'tsyringe';

export const otelEnvironmentsTagMap = new Map<string, OtelEnvironmentTag>([
  ['production', 'prod'],
  ['staging', 'stage'],
  ['development', 'dev'],
]);

export const getOtelEnvironmentName = (): string => {
  const environmentService = container.resolve(EnvironmentService);

  return otelEnvironmentsTagMap.get(environmentService.environment) ?? '';
};
