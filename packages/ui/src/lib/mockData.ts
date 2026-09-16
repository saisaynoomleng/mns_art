import { fn } from 'storybook/test';

export const mockAction = fn(async () => {
  return {
    success: true,
    message: 'Form Submiited',
  };
});

export const mockCarePlan = {
  excerpt: 'Keep it running, and keep it growing',
  inclusives: [
    {
      _key: 'ccd80b41d81e',
      title: '3 content updates/month',
    },
    {
      _key: '9e27ed0fb248',
      title: '2 new sections or components per month',
    },
    {
      _key: '1a8ed5d880fc',
      title: '1 landing page every 2 months',
    },
    {
      _key: '60eeb7a0f43e',
      title: 'Advanced Analytics',
    },
    {
      _key: '998243f378cb',
      title: 'Priority Support',
    },
    {
      _key: 'fbf07a30cdef',
      title: 'Monthly Strategy Call',
    },
    {
      _key: '859bfda24c72',
      title: 'Advanced Bug Fixes',
    },
  ],
  name: 'Growth',
  price: 80,
  exclusives: [
    'Custom-designed pages/sections outside the existing template and component library',
    'Redesigns',
    'Anything exceeding the monthly incident/update caps above',
  ],
};
