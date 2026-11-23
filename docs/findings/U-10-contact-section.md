# U-10 — Contact section duplicates the availability message and exposes a phone number

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Done (released 2026-11-24) | ui | UI agent; Sahil (phone number) | 2026-10-26 | 2026-11-23 |

## Finding

Availability is announced twice (hero badge with a sparkle, contact card with a pulsing dot) and a third time as a 'Looking for opportunities?' card. 'Get in Touch' labels the nav button, a hero button and the section badge (three labels, one intent). The full phone number is published in plain text on a public page (spam and privacy exposure). The form only opens the visitor's mail client, which is honest but is described as 'Send a Message'.

## Evidence

`Contact.tsx`, `HeroEnhanced.tsx`, `Navigation.tsx`; `src/data/index.ts` (`contact.phone`).

## Done so far

Recorded only.

**2026-11-23:** Phone number removed from the site data and the contact section (owner: email only). The LaTeX resume still lists the phone, which is normal for a resume, but `resume.pdf` is served from the site: owner to say whether to keep it there.

**2026-11-23:** One availability line, one contact action (email) repeated in the hero, nav and close; the mail-client form removed; profiles and resume listed; phone removed.

## Next action

Owner: keep the phone on the LaTeX resume?

**Owner:** UI agent; Sahil (phone number)  
**Done when:** One availability statement; one CTA label per intent; the phone decision recorded.

---
*Single source of truth for U-10. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
