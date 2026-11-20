// Mock implementation for useExperience hook
import { vi } from 'vitest';
import type realUseExperience from '../useExperience';

const useExperience = vi.fn<typeof realUseExperience>(() => [
  {
    company: 'Test Company 1',
    role: 'Senior Developer',
    date: '2022 - Present',
    desc: 'Leading development efforts',
    companylogo: '/test-logo1.png',
    descBullets: ['Led team of 5', 'Deployed to production']
  },
  {
    company: 'Test Company 2',
    role: 'Developer',
    date: '2020 - 2022',
    desc: 'Contributed to key projects',
    companylogo: '/test-logo2.png',
    descBullets: ['Built frontend', 'Improved performance']
  }
]);

export default useExperience;
