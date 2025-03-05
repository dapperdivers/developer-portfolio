import { renderHook, act } from '@testing-library/react';
import useSkills from '../useSkills';

// Mock context
jest.mock('../../context/PortfolioContext', () => ({
  __esModule: true,
  usePortfolio: jest.fn(() => ({
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
      { Stack: 'Frontend', progressPercentage: 90 },
      { Stack: 'Backend', progressPercentage: 70 }
    ]
  }))
}));

describe('useSkills Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('returns skills data from the context', () => {
    const { result } = renderHook(() => useSkills());
    
    expect(result.current.skillsSection).toBeDefined();
    expect(result.current.skillsSection.softwareSkills).toHaveLength(3);
    expect(result.current.skillBars).toHaveLength(2);
  });

  it('filters skills by category when provided', () => {
    const { result } = renderHook(() => 
      useSkills({ category: 'frontend' })
    );
    
    // Should include React and CSS, but not Node.js
    const skills = result.current.skillsSection.softwareSkills;
    expect(skills).toHaveLength(2);
    expect(skills[0].skillName).toBe('React');
    expect(skills[1].skillName).toBe('CSS');
  });

  it('filters skills by name when filter is provided', () => {
    const { result } = renderHook(() => 
      useSkills({ filter: 'react' })
    );
    
    // Should only include React
    const skills = result.current.skillsSection.softwareSkills;
    expect(skills).toHaveLength(1);
    expect(skills[0].skillName).toBe('React');
  });

  it('adds fallback icons when addFallbacks is true', () => {
    // Mock a skill without icon
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
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
    
    // Should have added a fallback icon
    const skill = result.current.skillsSection.softwareSkills[0];
    expect(skill.iconName).toBeDefined();
  });

  it('does not add fallback icons when addFallbacks is false', () => {
    // Mock a skill without icon
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
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
    
    // Should not have added a fallback icon
    const skill = result.current.skillsSection.softwareSkills[0];
    expect(skill.iconName).toBeUndefined();
  });

  it('returns null while loading when delay is provided', () => {
    const { result } = renderHook(() => 
      useSkills({ delay: 1000 })
    );
    
    // Initially should be null (loading)
    expect(result.current).toBeNull();
    
    // After delay, should return data
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(result.current).not.toBeNull();
    expect(result.current.skillsSection).toBeDefined();
  });

  it('filters out invalid skills', () => {
    // Mock some invalid skills
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
      skillsSection: {
        softwareSkills: [
          { skillName: 'Valid', iconName: 'icon' }, // Valid
          { iconName: 'icon' }, // Missing name
          { skillName: 'Missing Icon' }, // Missing icon, but will get fallback
          null, // Null item
          { } // Empty object
        ]
      },
      skillBars: []
    }));
    
    const { result } = renderHook(() => 
      useSkills({ addFallbacks: true })
    );
    
    // Should have only the valid skills and the one that gets a fallback
    expect(result.current.skillsSection.softwareSkills).toHaveLength(2);
    expect(result.current.skillsSection.softwareSkills[0].skillName).toBe('Valid');
    expect(result.current.skillsSection.softwareSkills[1].skillName).toBe('Missing Icon');
  });

  it('handles missing skillsSection or skillBars gracefully', () => {
    // Mock missing data
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
      // No skillsSection or skillBars
    }));
    
    const { result } = renderHook(() => useSkills());
    
    // Should return null when critical data is missing
    expect(result.current).toBeNull();
  });
});