# Sources

| Source | Use |
| --- | --- |
| [range optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer) | Cover-width fraction (different product) |
| [docs.alcor.exchange/api](https://docs.alcor.exchange/api) | v3 market/depth if a host later reads books. This lab does not. |
| [SECURITY.md](SECURITY.md) | Locked placements |

## Product facts locked by tests

| Call | Label |
| --- | --- |
| `place(9n, 10n, 20n)` | **below** |
| `place(10n, 10n, 20n)` | **inside** |
| `place(20n, 10n, 20n)` | **inside** |
| `place(21n, 10n, 20n)` | **above** |
| `low >= high` | throws |

Both band edges are **inclusive** (inside).

## What this is not

- Not advice to move liquidity.
- Not proof that an `inside` position is earning fees.
- Not an Alcor tick or a live rebalance.
- Not the width fraction from the range optimizer.

Three integers. No network. No wasm.
