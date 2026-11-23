import { splitFigures, noteNumber } from '@/lib/notes';
import { CitedTextClient } from './CitedTextClient';

/**
 * Running text with every footnoted figure marked (the figures come from src/data/claims.ts). The matching and numbering
 * run here on the server; only the resulting parts reach the browser, so the data modules stay out of the client bundle.
 */
export function CitedText({ text, order }: { text: string; order?: string[] }) {
  const parts = splitFigures(text).map((p) => ({ text: p.text, n: p.figure ? noteNumber(p.text, order) : undefined }));
  if (!parts.some((p) => p.n)) return <>{text}</>;
  return <CitedTextClient parts={parts} />;
}
