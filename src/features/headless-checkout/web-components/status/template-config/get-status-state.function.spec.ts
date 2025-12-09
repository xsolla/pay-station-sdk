import { getStatusState } from './get-status-state.function';
import { StatusEnum } from '../../../../../core/status/status.enum';
import { Status } from '../../../../../core/status/status.interface';
import { StatusState } from './status-state.enum';

describe('getStatusState', () => {
  it('Should return processing state', () => {
    expect(
      getStatusState({ statusState: StatusEnum.processing } as Status),
    ).toEqual(StatusState.isProcessing);
  });
  it('Should return cancel state', () => {
    expect(
      getStatusState({ statusState: StatusEnum.canceled } as Status),
    ).toEqual(StatusState.isCanceled);
  });
  it('Should return error state', () => {
    expect(getStatusState({ statusState: StatusEnum.error } as Status)).toEqual(
      StatusState.isError,
    );
  });
  it('Should return success state', () => {
    expect(getStatusState({ statusState: StatusEnum.done } as Status)).toEqual(
      StatusState.isSuccess,
    );
  });
});
