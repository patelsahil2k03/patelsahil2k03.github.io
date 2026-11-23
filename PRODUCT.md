# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and technical recruiters filling **AI/ML and applied-AI engineer roles** (confirmed by the owner, 2026-11-23), for whom full-stack delivery is a multiplier. They arrive from LinkedIn, a resume link or a referral, usually on a laptop between other candidates, sometimes on a phone. Their job: decide within about a minute whether this engineer has shipped real AI systems, at what scale and in what role, then either go deeper (a case study, a paper) or make contact.

Secondary: engineers on an interview loop who read one case study in depth and check whether the claims hold.

## Product Purpose

Make one case quickly and survive a skeptical deeper read: Sahil Patel is an AI/ML and full-stack engineer who ships production systems, with evidence for every claim. Success is a recruiter or hiring manager who reaches the selected work in the first scroll, understands three or four systems with role and scale, and contacts him by email.

## Positioning

Every figure and role on the site is traceable to a source (git authorship, publisher records, dated project documents), recorded in `docs/CLAIMS_LEDGER.md` and labelled when it rests on the owner's own material. Roles are stated exactly as the evidence supports: neither inflated nor undersold. A neighbouring portfolio can claim scale; it cannot truthfully copy footnoted evidence.

## Operating Context

- Static Next.js 14 export on GitHub Pages; content lives in `src/data/*.ts`; `/case-studies/` holds long-form write-ups.
- Current roles (2026-11): SDE II on a Digiflux client engagement (a creator-commerce marketplace platform) since November 2025, alongside Associate Software Engineer at Digiflux Technologies (since July 2024; AI/ML intern from January 2024).
- Work spans e-commerce search, FinTech data pipelines, FoodTech and HealthTech AI services; two peer-reviewed papers (Springer ICTIS 2024 first author; AIP ICRAIC co-author, 2025); hackathons (AI-Manthan Top 10, Odoo Hackathon 2026 finalist).
- The repository is public: clients and internal systems are described by industry, never named.

## Capabilities and Constraints

- Sections: hero, selected work (case studies), experience, research and recognition, skills, about, contact; case-study listing and article pages; dark mode.
- Contact is **email only** (owner, 2026-11-23); the contact form opens the visitor's mail client.
- No server: no forms backend, no CMS. Analytics via Microsoft Clarity.
- The 3D avatar companion exists but is off (`AVATAR_ENABLED = false`).
- Undecided: football wording (`OWNER_INPUTS.md` C4); skill self-ratings (C3, default drop).

## Brand Commitments

- Name: Sahil Patel. Tone: professional, outcome-led, American spelling, no adjectives that need proof, no dramatic phrasing (`nextprompt.md` §6).
- The owner asked for an identity that feels exquisite and engaging yet understandable, with typography that has the presence of a concert poster, and less content per page.

## Evidence on Hand

- Ten case studies (`src/data/caseStudies.ts`), one with an architecture diagram; experience, projects, achievements, skills in `src/data/`.
- Claims ledger with grain, source and status for every figure (`docs/CLAIMS_LEDGER.md`); several key figures are `owner-material` and must be shown as such.
- Profile photo (`public/images/hero/profile.jpg`); no project screenshots, logos or award photos yet (`docs/OWNER_INPUTS.md` B1-B7). Do not fabricate screenshots, testimonials, client logos or metrics.

## Product Principles

1. Evidence before decoration: a number appears with its unit and a traceable source, or not at all.
2. One minute to the case: who, what he ships, the strongest proof, how to reach him, all within the first scroll.
3. Depth on demand: case studies and papers carry the detail; the homepage carries the argument.
4. Exact credit: role wording follows the evidence ladder, in both directions.
5. Public by default: nothing that names a client or exposes private data.

## Accessibility & Inclusion

WCAG 2.1 AA: semantic landmarks and heading order, visible focus, keyboard reachability, contrast AA in both themes, reduced motion honoured, touch targets of 44 px, no hover-only information.
