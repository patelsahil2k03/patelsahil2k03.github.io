/**
 * Shared look of a footnoted figure (Cite, CitedTextClient, MetricList), so the three never drift apart.
 * The figure and its number are one button: the whole "500K+¹" is the tap target (critique 2026-11-24: a 7 px marker alone
 * was too small on a phone), and a dotted accent underline says it opens.
 */
export const citeButton =
  "relative inline whitespace-nowrap text-left underline decoration-ev-accent/60 decoration-dotted decoration-1 underline-offset-[5px] hover:decoration-solid before:absolute before:-inset-x-1 before:-inset-y-2 before:content-['']";

/** The note number. `ev-marker` lets tools/checks/content_inventory.mjs drop just the number when it reads the page text. */
export const citeMarker = 'ev-marker ml-0.5 align-super text-[max(0.68em,11px)] ev-num text-ev-accent';

/** Links inside an open note ("note n", "close"): tall enough to hit on a phone. */
export const noteAction = 'ev-link inline-flex min-h-[32px] items-center';
