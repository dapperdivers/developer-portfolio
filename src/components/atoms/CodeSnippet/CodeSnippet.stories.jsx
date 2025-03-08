import React from 'react';
import CodeSnippet from './CodeSnippet';

const meta = {
  title: 'Atoms/CodeSnippet',
  component: CodeSnippet,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Syntax-highlighted code display with cyberpunk themes',
    docs: {
      description: {
        component: 'The CodeSnippet component displays code with syntax highlighting and cyberpunk-inspired visual effects. It features multiple themes, security variants, and decorative modes with matrix-like animations. The component supports accessibility features, responsive design, and reduced motion preferences.'
      }
    }
  },
  argTypes: {
    code: {
      control: 'text',
      description: 'Code content to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    language: {
      control: 'select',
      options: ['javascript', 'typescript', ''],
      description: 'Programming language for syntax highlighting',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: 'Color theme for the snippet',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"dark"' },
      }
    },
    isDecorative: {
      control: 'boolean',
      description: 'Whether this is a decorative element with matrix effects',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    style: {
      description: 'Additional inline styles',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    ariaDescription: {
      control: 'text',
      description: 'Custom description for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    }
  }
};

export default meta;

// Container for consistent display
const SnippetContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0',
    maxWidth: '800px'
  }}>
    {children}
  </div>
);

// Default code snippet
export const Default = {
  args: {
    code: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    language: 'javascript',
    theme: 'dark'
  },
  render: (args) => (
    <SnippetContainer>
      <CodeSnippet {...args} />
    </SnippetContainer>
  )
};

// Language Examples
export const LanguageExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>JavaScript</h4>
        <SnippetContainer>
          <CodeSnippet
            code={`// Function to calculate fibonacci sequence
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result); // 55`}
            language="javascript"
          />
        </SnippetContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>TypeScript</h4>
        <SnippetContainer>
          <CodeSnippet
            code={`interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json());
}`}
            language="typescript"
          />
        </SnippetContainer>
      </div>
    </div>
  )
};

// Visual Variants
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Default</h4>
        <SnippetContainer>
          <CodeSnippet
            code="console.log('Default variant');"
            language="javascript"
          />
        </SnippetContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security</h4>
        <SnippetContainer>
          <CodeSnippet
            code={`function encryptData(data) {
  const key = generateSecureKey();
  return encrypt(data, key);
}`}
            language="javascript"
            variant="security"
          />
        </SnippetContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Terminal</h4>
        <SnippetContainer>
          <CodeSnippet
            code="$ npm install @security/encryption\n> Installing security modules..."
            variant="terminal"
          />
        </SnippetContainer>
      </div>
    </div>
  )
};

// Theme Examples
export const Themes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Dark Theme</h4>
        <SnippetContainer>
          <CodeSnippet
            code={`import { darkTheme } from './themes';
export default darkTheme;`}
            language="javascript"
            theme="dark"
          />
        </SnippetContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Light Theme</h4>
        <SnippetContainer background="var(--color-background-light)">
          <CodeSnippet
            code={`import { lightTheme } from './themes';
export default lightTheme;`}
            language="javascript"
            theme="light"
          />
        </SnippetContainer>
      </div>
    </div>
  )
};

// Decorative Examples
export const DecorativeSnippets = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Matrix Style</h4>
        <SnippetContainer>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <CodeSnippet
              code="01001100\n10101010\n01001100"
              isDecorative={true}
              variant="security"
            />
            <CodeSnippet
              code="function hack() {\n  return 'access';\n}"
              isDecorative={true}
              variant="security"
              language="javascript"
            />
          </div>
        </SnippetContainer>
      </div>
    </div>
  )
};

// Long Code Example
export const LongCode = {
  render: () => (
    <SnippetContainer>
      <CodeSnippet
        code={`// Complex security module implementation
import { encrypt, decrypt } from '@security/crypto';
import type { SecurityConfig, EncryptionKey } from './types';

class SecurityModule {
  private config: SecurityConfig;
  private key: EncryptionKey;

  constructor(config: SecurityConfig) {
    this.config = config;
    this.key = this.generateKey();
  }

  private generateKey(): EncryptionKey {
    // Key generation logic
    return crypto.getRandomValues(new Uint8Array(32));
  }

  public async encryptData(data: string): Promise<string> {
    try {
      const encrypted = await encrypt(data, this.key);
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  public async decryptData(encrypted: string): Promise<string> {
    try {
      const decrypted = await decrypt(encrypted, this.key);
      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }
}`}
        language="typescript"
        variant="security"
      />
    </SnippetContainer>
  )
};

// Responsive Example
export const Responsive = {
  render: () => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop View</h3>
        <SnippetContainer>
          <CodeSnippet
            code={`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
            language="javascript"
          />
        </SnippetContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile View</h3>
        <SnippetContainer>
          <div style={{ maxWidth: '320px' }}>
            <CodeSnippet
              code={`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
              language="javascript"
            />
          </div>
        </SnippetContainer>
      </div>
    </div>
  )
};

// Accessibility Example
export const Accessibility = {
  render: () => (
    <SnippetContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With ARIA Description</h4>
          <CodeSnippet
            code="function validateAccess() { /* ... */ }"
            language="javascript"
            ariaDescription="JavaScript function for validating user access"
          />
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Decorative (Hidden from Screen Readers)</h4>
          <CodeSnippet
            code="01001100\n10101010"
            isDecorative={true}
            variant="security"
          />
        </div>
      </div>
    </SnippetContainer>
  )
};
