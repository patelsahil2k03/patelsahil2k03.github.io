# F-28 — Project-card figures contradicted the public repository or were illustrative

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P1 | Done on the site; lip-reading figures remain owner-material | content | Sahil | 2026-10-26 | 2026-10-26 |

## Finding

The fruit-detection card claimed 88% accuracy; the linked public repository documents 97.76% training and 78.56% validation accuracy on 3,581 images (36 classes, MobileNetV2, TensorFlow Lite). A marketplace case study also quoted an illustrative '80% automated / 20%' split that read as a measured result.

## Evidence

Repository README fetched from GitHub on 2026-10-26 (public, last pushed 2026-04-05). The lip-reading repository is no longer public, so its 93% training / 53% validation / 3,115-image figures have no public source.

## Done so far

Fruit card now shows 78.56% validation accuracy with the on-device stack; the illustrative percentages are removed from the case-study text.

## Next action

Owner confirms the lip-reading figures and which dataset the 3,115 count describes; the fruit repository README also contains an unrelated '98%+ accuracy in production models' line that should be corrected (profile and repository README pass, F-16).

**Owner:** Sahil  
**Done when:** Every number on the project cards matches its public source or is labelled `owner-material` in the ledger.

---
*Single source of truth for F-28. Update this file in place; `docs/PENDING_TASKS.md` only indexes it.*
