# AI handoff — LP band placement

## Non-negotiables

1. `place(9n, 10n, 20n)` → **below**. `place(10n, 10n, 20n)` and `place(20n, 10n, 20n)` → **inside**. `place(21n, 10n, 20n)` → **above**.
2. Both band edges are **inclusive**.
3. `low >= high` throws.
4. **Not** advice to move liquidity. **Not** proof that `inside` is earning fees.
5. Not an Alcor tick, not a live rebalance, not the cover-width fraction in the range optimizer.
6. Three integers. No network. No wasm. No v3 depth read.

## Prompt seeds

- "Spot 10 and spot 20 against band 10–20 — inside or outside?"
- "Refuse turning an inside label into a rebalance transaction."
- "Contrast with the range optimizer width fraction."

## Do not

- Authorize a liquidity move from this label.
- Fetch Alcor depth inside unit tests.
