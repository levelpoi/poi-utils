//
export function classifyPaste(text: string): 'text' | 'json' | 'markdown' | 'code' {
  const t = text.trim();
  if (!t) return 'text';

  // JSON
  if (/^[\[{]/.test(t)) {
    try {
      JSON.parse(t);
      return 'json';
    } catch {}
  }

  // Markdown 特征
  const hasMd = [
    /^#{1,6}\s/m,
    /^\s*[-*+]\s+/m,
    /```\w*\n/,
    /\[.*\]\(.*\)/,
    /^\s*>/
  ].some(re => re.test(t));

  if (hasMd) return 'markdown';

  // Code 特征
  const hasCode = [
    /\b(let|const|var|function|def|class|import|from|console\.log|print\()/,
    /[\{\};\[\]\(\)=<>]/,
    t.split('\n').length > 1
  ].filter(Boolean).length >= 2;

  if (hasCode) return 'code';

  return 'text';
}