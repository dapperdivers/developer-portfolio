export type TokenType = 'keyword' | 'string' | 'comment' | 'function' | 'plain';

export interface Token {
  type: TokenType;
  text: string;
}

const KEYWORDS = new Set([
  'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'class', 'new',
  'import', 'export', 'from', 'true', 'false', 'null', 'undefined', 'default', 'async', 'await',
  'interface', 'type', 'extends', 'public', 'private', 'try', 'catch', 'throw',
]);

// One pass over the source: comments, strings (incl. template), then words.
const TOKEN_PATTERN = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|([A-Za-z_$][\w$]*)/g;

/**
 * Split code into typed tokens. Pure text in, text out: the caller renders
 * each token as a React text node, so nothing is ever parsed as HTML.
 */
export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  let afterFunctionKeyword = false;

  const push = (type: TokenType, text: string) => {
    if (!text) return;
    const prev = tokens[tokens.length - 1];
    if (prev && prev.type === type && type === 'plain') prev.text += text;
    else tokens.push({ type, text });
  };

  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    const between = code.slice(last, index);
    push('plain', between);
    if (between.trim()) afterFunctionKeyword = false;
    const [text, comment, string, word] = match;

    if (comment) push('comment', text);
    else if (string) push('string', text);
    else if (word) {
      if (KEYWORDS.has(word)) {
        push('keyword', word);
        afterFunctionKeyword = word === 'function';
        last = index + text.length;
        continue;
      }
      push(afterFunctionKeyword ? 'function' : 'plain', word);
    }
    afterFunctionKeyword = false;
    last = index + text.length;
  }
  push('plain', code.slice(last));
  return tokens;
}
