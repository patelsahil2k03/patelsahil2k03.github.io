/**
 * Notes for published figures. Each entry mirrors a row of docs/CLAIMS_LEDGER.md (the source of truth):
 * what the number counts, where it comes from, and whether it is verified or rests on the owner's own material.
 * Only the figures in KEY_FIGURES carry a footnote on the site; the rest render as plain text and keep their ledger row.
 * Keep wording public-safe (no client names).
 */
export type ClaimStatus = 'verified' | 'owner-material' | 'publication';

export interface Claim {
  /** What the number counts (its grain). */
  counts: string;
  /** Where it comes from, described by kind. */
  source: string;
  status: ClaimStatus;
}

export const allClaims: Record<string, Claim> = {
  '500K+': {
    counts: 'Unique products in the marketplace search platform (not listings, not rows).',
    source: 'Project documentation, October 2026. Read from documents, not from a live database query.',
    status: 'owner-material',
  },
  '85+': {
    counts: 'Marketplace storefronts the extraction pipeline covers, in English and Arabic.',
    source: 'Project documentation, October 2026.',
    status: 'owner-material',
  },
  '6': {
    counts: 'Vector indexes behind search: English text, Arabic text, product photos, color and style intent.',
    source: 'Project documentation, October 2026.',
    status: 'owner-material',
  },
  '2M+': {
    counts: 'Users of the FinTech platform that the scraper fleet feeds.',
    source: 'The platform’s own user figure, from my earlier audit documents.',
    status: 'owner-material',
  },
  '50+': {
    counts: 'AWS Lambda scraper functions in the FinTech fleet.',
    source: 'Count of functions in the fleet’s repositories, from my audit documents.',
    status: 'owner-material',
  },
  '125K+': {
    counts: 'Customers of the meal-subscription business the AI services run for.',
    source: 'The business’s own customer figure, from my earlier audit documents.',
    status: 'owner-material',
  },
  '90%+': {
    counts: 'Accuracy of the nutrition-scanning service.',
    source: 'My earlier audit documents; no measurement file in the repositories yet.',
    status: 'owner-material',
  },
  '44,500+': {
    counts: 'Health workers on the public-health platform, across 35 states and union territories.',
    source: 'The program’s own figure, from my earlier audit documents.',
    status: 'owner-material',
  },
  '-40%': {
    counts: 'Reduction in manual steps after the content-automation pipeline.',
    source: 'My earlier audit documents.',
    status: 'owner-material',
  },
  '93.17%': {
    counts: 'Accuracy of the CNN+LSTM sales-forecasting proof of concept.',
    source: 'My project materials; the proof-of-concept script records about 96.9% for its experiments.',
    status: 'owner-material',
  },
  '98.04%': {
    counts: 'Classification accuracy of the question-paper quality model.',
    source: 'The published paper (Springer ICTIS 2024, first author); the full text sits behind the publisher’s paywall and was not re-read for this site.',
    status: 'publication',
  },
  '2,809 instances': {
    counts: 'Labeled question instances in the study’s dataset.',
    source: 'The published paper (Springer ICTIS 2024, first author); the full text sits behind the publisher’s paywall and was not re-read for this site.',
    status: 'publication',
  },
  '78.56%': {
    counts: 'Validation accuracy of the 36-class fruit and vegetable model.',
    source: 'The project’s public repository README, read 2026-10-26.',
    status: 'verified',
  },
  '93%': {
    counts: 'Training accuracy of the CNN lip-reading model.',
    source: 'My project records; the repository is not public.',
    status: 'owner-material',
  },
  '53%': {
    counts: 'Validation accuracy of the same lip-reading model.',
    source: 'My project records; the repository is not public.',
    status: 'owner-material',
  },
  '3,115 images': {
    counts: 'Images in the lip-reading dataset.',
    source: 'My project records; the repository is not public.',
    status: 'owner-material',
  },
  '4+': {
    counts: 'Forecasting models compared: the CNN+LSTM hybrid, Random Forest, ARIMA and SARIMAX.',
    source: 'My project materials.',
    status: 'owner-material',
  },
  '15+': {
    counts: 'Features in the tuition-management app.',
    source: 'My description; the repository is not public.',
    status: 'owner-material',
  },
  'Top 10/70+': {
    counts: 'Final placing among 70+ proposals at the AI-Manthan hackathon.',
    source: 'My LinkedIn post on the result (“70+ proposals”), October 2025.',
    status: 'owner-material',
  },
  '857': {
    counts: 'Teams that advanced to the Odoo Hackathon 2026 finals.',
    source: 'My LinkedIn post on the result, captured 2026-11-19.',
    status: 'owner-material',
  },
  '20,000+': {
    counts: 'Teams registered for the Odoo Hackathon 2026.',
    source: 'My LinkedIn post on the result, captured 2026-11-19.',
    status: 'owner-material',
  },
  '70+': {
    counts: 'Proposals entered at the AI-Manthan hackathon.',
    source: 'My LinkedIn post on the result (“70+ proposals”), October 2025.',
    status: 'owner-material',
  },
  '66%': {
    counts: 'Score in the NPTEL 12-week Cloud Computing course.',
    source: 'My course certificate, as I report it.',
    status: 'owner-material',
  },
  '100+': {
    counts: 'Consecutive days of LeetCode problem solving for the 100 Days badge, 2023.',
    source: 'My LeetCode profile badge, as I report it.',
    status: 'owner-material',
  },
  '9.35': {
    counts: 'Cumulative grade point average, B.Tech Computer Engineering, out of 10.',
    source: 'University record, as I report it.',
    status: 'owner-material',
  },
};

/**
 * The figures that carry the case and get a footnote (owner decision 2026-11-24, critique U-16): the scale of the production
 * systems and their headline accuracy. Footnoting every small count (a course score, a dataset size, a CGPA) diluted these;
 * the others stay in allClaims and in the ledger, and render as plain text. Add a key here to footnote a figure again.
 */
export const KEY_FIGURES = ['500K+', '85+', '2M+', '50+', '125K+', '90%+', '44,500+', '-40%', '93.17%', '98.04%'] as const;

export const claims: Record<string, Claim> = Object.fromEntries(
  Object.entries(allClaims).filter(([key]) => (KEY_FIGURES as readonly string[]).includes(key))
);

/** Text spellings of a figure that share one note (e.g. "40%" in prose and "-40%" as a metric). */
export const claimAliases: Record<string, string> = { '40%': '-40%', 'Top 10 / 70+': 'Top 10/70+' };

export const claimStatusLabel: Record<ClaimStatus, string> = {
  verified: 'Verified against a primary source',
  'owner-material': 'From my project records; no independent measurement yet',
  publication: 'From the published paper; full text not re-read for this site',
};

/** Short tag shown beside each note; the full meaning is stated once above the notes list. */
export const claimStatusTag: Record<ClaimStatus, string> = {
  verified: 'verified',
  'owner-material': 'project records',
  publication: 'published paper',
};
