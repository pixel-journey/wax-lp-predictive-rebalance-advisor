"use client";

import { place } from "./side";

export function Demo() {
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>Below, inside, or above</h1>
      <p className="lede">A price of 10 sits inside 10 to 20. 9 is below. 21 is above. This is not advice to move liquidity.</p>
      <ul className="plain">
        <li>9 is {place(9n, 10n, 20n)}</li>
        <li>10 is {place(10n, 10n, 20n)}</li>
        <li>21 is {place(21n, 10n, 20n)}</li>
      </ul>
    </main>
  );
}
