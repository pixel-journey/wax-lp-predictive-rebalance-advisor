import { HISTORY_ORIGIN, historyActions } from "./api";
import { place } from "./side";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const inside = place(10n, 10n, 20n);

export const USE_CASES: UseCase[] = [
  {
    title: "Markets are not this range",
    detail: `10 against 10 to 20 is ${inside}. 9 is below. 21 is above. GET /api/markets is not parsed and is not advice.`,
    request: { method: "GET", url: "https://wax.alcor.exchange/api/markets", executed: false },
    transaction: null,
  },
  {
    title: "No liquidity is moved",
    detail: "A label of below does not build a swap or a position change.",
    request: historyActions(HISTORY_ORIGIN, "swap.alcor", "eosio.token:transfer", 20),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (inside !== "inside" || place(21n, 10n, 20n) !== "above") throw new Error("place");
}
