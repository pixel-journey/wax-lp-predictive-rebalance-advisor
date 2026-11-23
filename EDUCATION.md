# Education — below, inside, or above

> **Rung:** `npm test` passes. Three integers. This does **not** tell you to move liquidity.  
> **The test is the rule.** Wider side of a band: [wax-alcor-v2-range-optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer). Full-range IL: [wax-lp-impermanent-loss-heat-map](https://github.com/pixel-journey/wax-lp-impermanent-loss-heat-map).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Label price as below, inside, or above the band |
| Intermediate | Keep both edges inclusive |
| Masterclass | Refuse to treat the label as a rebalance order |

---

## Beginner — one scene

Both edges are **inside**. `price < low` is below. `price > high` is above.

| Call | Locked result |
| --- | --- |
| `place(9n, 10n, 20n)` | `below` |
| `place(10n, 10n, 20n)` | `inside` |
| `place(20n, 10n, 20n)` | `inside` |
| `place(21n, 10n, 20n)` | `above` |

`low >= high` throws. A label of `inside` is not a fee.

```bash
npm test
```

---

## Intermediate

| Rule | Detail |
| --- | --- |
| Inclusive edges | low and high both count as inside |
| Band validity | low must be strictly less than high |

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Half-open band excluding high | not this lab |
| Invert low/high | throws |
| Treat label as trade advice | docs forbid |

### Exercises

1. Price equals low — place? (**inside**.)  
2. Price equals high — place? (**inside**.)  
3. Is this a rebalance order? (**No**.)

---

## Masterclass

Concentrated liquidity products need more than a three-way label (depth, fees, IL). This file only classifies a price relative to two integers you supplied.

---

## What this course will not teach

- When to move a position
- Live Alcor tick math
- Financial advice
