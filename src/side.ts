/**
 * Where a price sits against a low and a high.
 * This is not advice to move liquidity.
 */

export function place(price: bigint, low: bigint, high: bigint): "below" | "inside" | "above" {
  if (low <= 0n || high <= 0n || price <= 0n) throw new Error("price, low, and high must be positive");
  if (low >= high) throw new Error("low must be below high");
  if (price < low) return "below";
  if (price > high) return "above";
  return "inside";
}
