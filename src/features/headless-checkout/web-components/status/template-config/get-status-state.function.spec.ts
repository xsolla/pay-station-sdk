import { getStatusState } from './get-status-state.function';
import { StatusEnum } from '../../../../../core/status/status.enum';
import { Status } from '../../../../../core/status/status.interface';
import { StatusState } from './status-state.enum';
import { TitleClass } from '../../../../../core/status/title-class.enum';

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

  it('Should return cancel state when titleClass is cancel', () => {
    expect(
      getStatusState({
        statusState: StatusEnum.processing,
        titleClass: TitleClass.cancel,
      } as Status),
    ).toEqual(StatusState.isCanceled);
  });

  it('Should return cancel state when titleClass is cancelUser', () => {
    expect(
      getStatusState({
        statusState: StatusEnum.processing,
        titleClass: TitleClass.cancelUser,
      } as Status),
    ).toEqual(StatusState.isCanceled);
  });

  it('Should return cancel state when isCancelUser is true', () => {
    expect(
      getStatusState({
        statusState: StatusEnum.processing,
        isCancelUser: true,
      } as Status),
    ).toEqual(StatusState.isCanceled);
  });
});
