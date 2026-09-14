import { fn } from 'storybook/test';

export const mockAction = fn(async () => {
  return {
    success: true,
    message: 'Form Submiited',
  };
});
