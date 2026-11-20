import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CodeSnippet from './CodeSnippet';
import { tokenize } from './highlight';

describe('tokenize', () => {
  it('classifies keywords, strings, comments and function names', () => {
    const tokens = tokenize('const a = "hi"; // note\nfunction run() {}');
    const types = (t: string) => tokens.filter((x) => x.type === t).map((x) => x.text);
    expect(types('keyword')).toEqual(['const', 'function']);
    expect(types('string')).toEqual(['"hi"']);
    expect(types('comment')).toEqual(['// note']);
    expect(types('function')).toEqual(['run']);
  });

  it('round-trips the source text exactly', () => {
    const code = 'class A {\n  x = `t ${1}`;\n}';
    expect(tokenize(code).map((t) => t.text).join('')).toBe(code);
  });
});

describe('CodeSnippet', () => {
  it('renders highlighted tokens without leaking markup as text', () => {
    render(<CodeSnippet code={'const greeting = "Hello";'} language="javascript" animated={false} />);
    const code = screen.getByTestId('code-snippet').querySelector('code') as HTMLElement;
    expect(code.textContent).toBe('const greeting = "Hello";');
    expect(code.querySelector('.token-keyword')?.textContent).toBe('const');
    expect(code.querySelector('.token-string')?.textContent).toBe('"Hello"');
  });

  it('never turns supplied code into HTML elements', () => {
    const evil = '<img src=x onerror="alert(1)"><script>alert(1)</script>';
    render(<CodeSnippet code={evil} language="javascript" animated={false} />);
    const code = screen.getByTestId('code-snippet').querySelector('code') as HTMLElement;
    expect(code.querySelector('img, script')).toBeNull();
    expect(code.textContent).toBe(evil);
  });
});
