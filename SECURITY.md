# Security — price vs band placement

## Closed in tests

| Issue | Behavior |
| --- | --- |
| `place(9n, 10n, 20n)` | `below` |
| `place(10n, 10n, 20n)` | `inside` |
| `place(20n, 10n, 20n)` | `inside` |
| `place(21n, 10n, 20n)` | `above` |
| `low >= high` | throws |

Both edges are **inside** (inclusive).

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Rebalance advice | **Not** advice to move liquidity |
| Fee earnings | `inside` ≠ fee claim |
| Live pool | Arguments only |
| Concentrated ticks | Integer band only |

## Attack angles

1. Auto-rebalancing when label is `below` / `above`.  
2. Treating `inside` as proof the position is earning.  
3. Claiming a live Alcor position was advised.  
4. Mixing with [range optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer) width without noting different products.

## Honesty limits

Three integers. No network. No wasm. Not advice.

| Sibling | Distinction |
| --- | --- |
| [range optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer) | Cover-width fraction |
| [IL heat map](https://github.com/pixel-journey/wax-lp-impermanent-loss-heat-map) | Full-range IL after leaving |
| [concentrated ROI](https://github.com/pixel-journey/wax-concentrated-liquidity-roi-matrix) | Fee minus that IL |

[docs.wax.io](https://docs.wax.io/).
