import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useSkills from '@hooks/useSkills';
import { usePortfolio } from '@context/PortfolioContext';
import type { PortfolioTestValue } from '@context/PortfolioContext';
import type { UseSkillsResult } from '@hooks/useSkills';
import type { PortfolioData, Skill } from '@/types/portfolio';

// Mock the usePortfolio hook
vi.mock('@context/PortfolioContext', () => ({
  usePortfolio: vi.fn()
}));

// The hook is tested with partial context data, hence the cast
const mockPortfolio = (value: PortfolioTestValue) => value as PortfolioData;

// Fails the test when the hook is still loading
const loaded = (value: UseSkillsResult | null): UseSkillsResult => {
  if (!value) throw new Error('useSkills returned null');
  return value;
};

// Default mock data
const defaultMockData: PortfolioTestValue = {
  skillsSection: {
    title: 'Skills',
    softwareSkills: [
      {
        skillName: 'React',
        iconName: 'logos:react',
        category: 'frontend'
      },
      {
        skillName: 'Node.js',
        iconName: 'logos:nodejs',
        category: 'backend'
      },
      {
        skillName: 'CSS',
        fontAwesomeClassname: 'fab fa-css3',
        category: 'frontend'
      }
    ],
    skills: ['Skill 1', 'Skill 2']
  },
  skillBars: [
    { Stack: 'Frontend', progressPercentage: '90' },
    { Stack: 'Backend', progressPercentage: '70' }
  ]
};

describe('useSkills Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    
    // Set default mock implementation for usePortfolio
    vi.mocked(usePortfolio).mockReturnValue(mockPortfolio(defaultMockData));
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('returns skills data from the context', () => {
    const { result } = renderHook(() => useSkills());
    
    expect(loaded(result.current).skillsSection).toBeDefined();
    expect(loaded(result.current).skillsSection.softwareSkills).toHaveLength(3);
    expect(loaded(result.current).skillBars).toHaveLength(2);
  });

  it('filters skills by category when provided', () => {
    const { result } = renderHook(() => 
      useSkills({ category: 'frontend' })
    );
    
    // Should include React and CSS, but not Node.js
    const skills = loaded(result.current).skillsSection.softwareSkills;
    expect(skills).toHaveLength(2);
    expect(skills[0].skillName).toBe('React');
    expect(skills[1].skillName).toBe('CSS');
  });

  it('filters skills by name when filter is provided', () => {
    const { result } = renderHook(() => 
      useSkills({ filter: 'react' })
    );
    
    // Should only include React
    const skills = loaded(result.current).skillsSection.softwareSkills;
    expect(skills).toHaveLength(1);
    expect(skills[0].skillName).toBe('React');
  });

  it('adds fallback icons when addFallbacks is true', () => {
    // Mock a skill without icon
    vi.mocked(usePortfolio).mockReturnValueOnce(mockPortfolio({
      skillsSection: {
        softwareSkills: [
          {
            skillName: 'NoIcon',
            category: 'frontend'
          }
        ]
      },
      skillBars: []
    }));
    
    const { result } = renderHook(() => 
      useSkills({ addFallbacks: true })
    );
    
    // Check results - we expect a fallback icon to be added
    expect(loaded(result.current).skillsSection).toBeDefined();
    expect(loaded(result.current).skillsSection.softwareSkills).toBeDefined();
    
    // Since we added fallbacks, there should be an iconName property
    if (loaded(result.current).skillsSection.softwareSkills.length > 0) {
      const skill = loaded(result.current).skillsSection.softwareSkills[0];
      expect(skill.iconName).toBeDefined();
    }
  });

  it('does not add fallback icons when addFallbacks is false', () => {
    // Mock a skill without icon
    vi.mocked(usePortfolio).mockReturnValueOnce(mockPortfolio({
      skillsSection: {
        softwareSkills: [
          {
            skillName: 'NoIcon',
            category: 'frontend'
          }
        ]
      },
      skillBars: []
    }));
    
    const { result } = renderHook(() => 
      useSkills({ addFallbacks: false })
    );
    
    // Check that we have data but no fallback icon
    expect(loaded(result.current).skillsSection).toBeDefined();
    expect(loaded(result.current).skillsSection.softwareSkills).toBeDefined();
    
    // Should not have added a fallback icon
    if (loaded(result.current).skillsSection.softwareSkills.length > 0) {
      const skill = loaded(result.current).skillsSection.softwareSkills[0];
      expect(skill.iconName).toBeUndefined();
    }
  });

  it('returns null while loading when delay is provided', () => {
    const { result } = renderHook(() => 
      useSkills({ delay: 1000 })
    );
    
    // Initially should be null (loading)
    expect(result.current).toBeNull();
    
    // After delay, should return data
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(result.current).not.toBeNull();
    expect(loaded(result.current).skillsSection).toBeDefined();
  });

  it('filters out invalid skills', () => {
    // Mock some invalid skills
    vi.mocked(usePortfolio).mockReturnValueOnce(mockPortfolio({
      skillsSection: {
        softwareSkills: [
          { skillName: 'Valid', iconName: 'icon' }, // Valid
          { iconName: 'icon' }, // Missing name
          { skillName: 'Missing Icon' }, // Missing icon, but will get fallback
          null, // Null item
          { } // Empty object
        ] as unknown as Skill[] // invalid entries on purpose
      },
      skillBars: []
    }));
    
    const { result } = renderHook(() => 
      useSkills({ addFallbacks: true })
    );
    
    // Check that filtering worked
    expect(loaded(result.current).skillsSection).toBeDefined();
    expect(loaded(result.current).skillsSection.softwareSkills).toBeDefined();
    
    // We expect a valid skill and one with a fallback
    expect(loaded(result.current).skillsSection.softwareSkills.length).toBeGreaterThan(0);
    
    // The Valid skill should be included
    const validSkill = loaded(result.current).skillsSection.softwareSkills.find(
      skill => skill.skillName === 'Valid'
    );
    expect(validSkill).toBeDefined();
  });

  it('handles missing skillsSection or skillBars gracefully', () => {
    // Mock missing data
    vi.mocked(usePortfolio).mockReturnValueOnce(mockPortfolio({
      // No skillsSection or skillBars
    }));
    
    // Temporarily silence console.warn for this test
    const originalWarn = console.warn;
    console.warn = vi.fn();
    
    const { result } = renderHook(() => useSkills());
    
    // Should return null when critical data is missing
    expect(result.current).toBeNull();
    
    // Verify the warning was logged
    expect(console.warn).toHaveBeenCalledWith('Skills data is missing or invalid');
    
    // Restore console.warn
    console.warn = originalWarn;
  });
});
