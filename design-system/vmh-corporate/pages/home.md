# VMH Corporate Page Override

This override replaces the generic blue and orange recommendation in `MASTER.md` with tokens extracted from the existing VMH website and its investor-relations content.

## Design read

Preserve-first redesign for a Hong Kong listed company. The audience is investors, business partners and members of the public who need institutional trust, bilingual clarity and fast access to filings.

Design dials: variance 5, motion 3, density 5.

## Tokens

- VMH Blue: `#2A5CAA`
- Deep Ink: `#101B2D`
- Steel: `#526174`
- Cloud: `#F2F5F9`
- Paper: `#FBFCFE`
- Rule: `#D8E0EA`

The VMH blue is the only accent. Light and dark modes use the same hue at different luminance. Cards use a consistent 14px radius; buttons may use the same radius and are never pill-shaped.

## Typography

- Display and English utility: Outfit via `next/font`
- Traditional Chinese body and headings: Noto Sans TC via `next/font`
- Filing dates and stock code: Outfit with tabular numerals

## Layout

```text
+---------------- navigation / stock code ----------------+
| corporate thesis                     | office image       |
| one primary investor action          | restrained crop    |
+---------------- latest filing strip --------------------+
| company narrative              | operating principles   |
+----------------------------------------------------------+
| capabilities, staggered rows rather than equal cards     |
+----------------------------------------------------------+
| latest news                  | investor filing ledger    |
+----------------------------------------------------------+
```

## Signature

The filing ledger is the signature element. Dates, document classes and download actions form a calm, precise information surface that makes the listed-company identity tangible.

## Motion and interaction

No automatic page choreography. Use 180-240ms hover, focus and disclosure transitions only. Respect reduced motion. All controls are at least 44px high and maintain visible keyboard focus.

