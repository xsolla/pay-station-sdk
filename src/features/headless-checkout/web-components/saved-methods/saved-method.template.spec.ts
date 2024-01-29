import { getSavedMethodTemplate } from './saved-method.template';
import { SavedMethod } from '../../../../core/saved-method.interface';

const mockQiwi = {
  name: '4476 24** **** 9527',
  psName: 'Mastercard',
  iconName: 'mastercard.svg',
  id: 112233,
} as SavedMethod;

describe('getSavedMethodTemplate', () => {
  it('Should draw template', () => {
    expect(getSavedMethodTemplate(mockQiwi)).toContain('img');
    expect(getSavedMethodTemplate(mockQiwi)).toContain(mockQiwi.name);
  });
});
