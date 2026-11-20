import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@atoms/Button';
import Card from '@atoms/Card';
import TechBadge from '@atoms/TechBadge';
import DateChip from '@atoms/DateChip';
import SecurityBadge from '@atoms/SecurityBadge';
import SecurityClassification from '@atoms/SecurityClassification';
import SkillChip from '@molecules/SkillChip';
import SocialLinks from '@molecules/SocialLinks';
import { Group, Page, foundationParameters } from './kit';

const meta: Meta = {
  title: 'Foundations/Components at a glance',
  parameters: foundationParameters,
};
export default meta;

const rowStyle: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' };

export const ComponentsAtAGlance: StoryObj = {
  name: 'Components at a glance',
  render: () => (
    <Page
      title="Components at a glance"
      lead="The controls, containers and chips that everything else is built from, side by side. They share one radius per role, one set of surfaces, JetBrains Mono for labels and one focus ring."
    >
      <Group title="Buttons" note="Primary is solid cyan, secondary is outlined, ghost is low emphasis. Two heights: 2.5rem and 2rem. Press Tab to see the focus ring.">
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={rowStyle}>
            <Button variant="primary" icon="mdi:download" iconPosition="right">Download resume</Button>
            <Button variant="secondary" icon="mdi:github">Code</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <SocialLinks links={{ github: 'https://github.com/DapperDivers', linkedin: 'https://www.linkedin.com/in/dmackley/' }} animated={false} />
          </div>
          <div style={rowStyle}>
            <Button size="sm" variant="primary">Small primary</Button>
            <Button size="sm" variant="secondary">Small secondary</Button>
            <Button size="sm" variant="ghost">Small ghost</Button>
          </div>
        </div>
      </Group>

      <Group title="Card" note="--surface-card fill, 1px --surface-border, --radius-card, --shadow-card. Hoverable cards lift.">
        <div style={{ maxWidth: 420 }}>
          <Card
            title="Cluster status"
            subtitle="ChelonianLabs homelab"
            hoverable
            animated={false}
            footer={
              <div style={rowStyle}>
                <Button size="sm" variant="primary">Open</Button>
                <Button size="sm" variant="ghost">Dismiss</Button>
              </div>
            }
          >
            <p>Three control-plane nodes and four workers, reconciled from Git by Flux.</p>
            <div style={rowStyle}>
              <TechBadge label="Talos Linux" size="sm" animate={false} />
              <TechBadge label="Flux CD" size="sm" animate={false} />
            </div>
          </Card>
        </div>
      </Group>

      <Group title="Chips" note="TechBadge, SecurityBadge, DateChip, SkillChip and SecurityClassification: --radius-chip, --surface-inset, mono xs text. Colour is only a tone; red is for alarming levels.">
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={rowStyle}>
            <TechBadge label="Kubernetes" animate={false} />
            <TechBadge label="OIDC" variant="security" animate={false} />
            <TechBadge label="Exposed admin port" variant="security" level="critical" animate={false} />
            <SecurityBadge text="Security Engineer" animate={false} />
            <DateChip date="2020 - Present" animated={false} />
            <DateChip date="Incident 2024" variant="breach" animated={false} />
          </div>
          <div style={rowStyle}>
            <SkillChip name="Kubernetes" iconName="logos:kubernetes" animated={false} />
            <SkillChip name="Threat Modeling" selected animated={false} />
          </div>
          <div style={{ maxWidth: 480, padding: '0 2rem' }}>
            <SecurityClassification label="DECLASSIFIED" expanded animated={false} />
          </div>
        </div>
      </Group>
    </Page>
  ),
};
