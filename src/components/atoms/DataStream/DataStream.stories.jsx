import DataStream from './DataStream';

export default {
  title: 'atoms/DataStream',
  component: DataStream,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated data stream lines with cybersecurity theming for visualizing data flow.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical'],
      description: 'Security variant theme'
    },
    delay: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Animation delay in seconds'
    },
    duration: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.1 },
      description: 'Animation duration in seconds'
    },
    intensity: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high'],
      description: 'Visual intensity level'
    },
  },
};

const Template = (args) => (
  <div className="bg-gray-900 p-8 min-h-screen">
    <div className="w-96 space-y-4">
      <DataStream {...args} />
    </div>
  </div>
);

const MultipleTemplate = (args) => (
  <div className="bg-gray-900 p-8 min-h-screen">
    <div className="w-96 space-y-2">
      <DataStream {...args} delay={0} />
      <DataStream {...args} delay={0.3} />
      <DataStream {...args} delay={0.6} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  delay: 0,
  duration: 2.5,
  intensity: 'medium',
};

export const Secure = Template.bind({});
Secure.args = {
  variant: 'secure',
  delay: 0,
  duration: 2.5,
  intensity: 'medium',
};

export const Breach = Template.bind({});
Breach.args = {
  variant: 'breach',
  delay: 0,
  duration: 2.5,
  intensity: 'high',
};

export const Critical = Template.bind({});
Critical.args = {
  variant: 'critical',
  delay: 0,
  duration: 1.5,
  intensity: 'high',
};

export const MultipleStreams = MultipleTemplate.bind({});
MultipleStreams.args = {
  variant: 'default',
  duration: 2.5,
  intensity: 'medium',
};

export const HighIntensity = Template.bind({});
HighIntensity.args = {
  variant: 'critical',
  delay: 0,
  duration: 1.8,
  intensity: 'high',
};

export const LowIntensity = Template.bind({});
LowIntensity.args = {
  variant: 'secure',
  delay: 0,
  duration: 3.5,
  intensity: 'low',
};