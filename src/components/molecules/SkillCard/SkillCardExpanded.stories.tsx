import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import SkillCard from './SkillCard';
import SkillCardExpanded from './SkillCardExpanded';
import type { SkillCardExpandedProps } from './SkillCardExpanded';

// Renders the card that opens the modal, with the modal open by default.
// The modal is portalled to document.body, so the card is what stays in the
// story root; clicking it reopens the modal after it has been closed.
type ExpandedDemoProps = Pick<SkillCardExpandedProps, 'skill' | 'isVisible'> & { onClose?: () => void };

const ExpandedDemo = ({ skill, isVisible = true, onClose }: ExpandedDemoProps) => {
  const [open, setOpen] = useState(isVisible);

  // Follow the control when it is changed from the Storybook panel
  useEffect(() => setOpen(isVisible), [isVisible]);

  return (
    <>
      <SkillCard skill={skill} onClick={() => setOpen(true)} />
      <SkillCardExpanded
        skill={skill}
        isVisible={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
      />
    </>
  );
};

const meta = {
  title: 'Molecules/SkillCardExpanded',
  component: SkillCardExpanded,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal with the full detail of a skill: icon, name, description, proficiency dots and security domain badge. ' +
          'Each story renders the SkillCard that opens it, with the modal already open. Close it and click the card to reopen.',
      },
      // The modal covers the viewport, so each docs story gets its own iframe
      story: { inline: false, height: '520px' },
    },
  },
  argTypes: {
    skill: {
      control: 'object',
      description: 'Skill data object containing details about the skill',
    },
    isVisible: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'closed',
      description: 'Function called when the expanded view is closed',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the modal and its content',
    },
  },
  args: {
    isVisible: true,
  },
  render: (args) => <ExpandedDemo {...args} />,
} satisfies Meta<typeof SkillCardExpanded>;
export default meta;

// onClose comes from the argTypes action, so the stories do not pass it
type Story = StoryObj<typeof SkillCardExpanded>;

/**
 * A skill with a description and a proficiency level
 */
export const Default: Story = {
  args: {
    skill: {
      skillName: 'Secure Code Review',
      iconName: 'mdi:code-braces',
      description: 'Reviewing application code for injection, broken access control and unsafe deserialization before it ships.',
      level: 4,
    },
  },
};

/**
 * A skill with a security domain, which adds the domain badge
 */
export const SecuritySkill: Story = {
  args: {
    skill: {
      skillName: 'Penetration Testing',
      iconName: 'carbon:security',
      description: 'Scoped testing of web applications, APIs and internal networks, with findings written up for the teams that fix them.',
      securityDomain: 'Application Security',
      level: 5,
    },
  },
};

/**
 * The lowest proficiency level: one active dot out of five
 */
export const MinimumLevel: Story = {
  args: {
    skill: {
      skillName: 'Firmware Analysis',
      iconName: 'mdi:chip',
      description: 'Extracting and inspecting firmware images for hardcoded credentials and outdated components. Early days.',
      level: 1,
    },
  },
};

/**
 * A skill without a level: the proficiency row is not rendered
 */
export const NoLevel: Story = {
  args: {
    skill: {
      skillName: 'Security Documentation',
      iconName: 'mdi:file-document',
      description: 'Runbooks, threat models and incident write-ups that engineers outside the security team can follow.',
    },
  },
};

/**
 * A long description, to check wrapping inside the modal
 */
export const LongDescription: Story = {
  args: {
    skill: {
      skillName: 'Cloud Security Architecture',
      iconName: 'mdi:cloud-lock',
      description:
        'Designing cloud environments where the secure path is the default one: identity built on short-lived credentials and least privilege, ' +
        'network segmentation between workloads, encryption of data at rest and in transit, and guardrails enforced as policy in the deployment pipeline. ' +
        'Includes centralised audit logging with alerting on the events that matter, regular review of exposed services, ' +
        'and working with platform teams so that controls are adopted without slowing delivery.',
      securityDomain: 'Cloud Security',
      level: 4,
    },
  },
};
