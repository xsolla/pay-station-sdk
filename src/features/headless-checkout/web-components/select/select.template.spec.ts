import { getSelectComponentTemplate } from './select.template';

describe('getSelectComponentTemplate', () => {
  it('should draw all blocks', () => {
    const configMock = {
      title: 'title',
      options: [
        {
          value: 'first',
          label: 'first-label',
        },
        {
          value: 'second',
          label: 'second-label',
        },
      ],
      error: 'error message',
    };

    const selectTemplate = getSelectComponentTemplate(configMock);

    expect(selectTemplate).toContain('title');
    expect(selectTemplate).toContain('first-label');
    expect(selectTemplate).toContain('error message');
  });
});
