import { describe, expect, it } from "vitest";
import { place } from "./side";

describe("price place", () => {
  it("is inclusive of the edges", () => {
    expect(place(9n, 10n, 20n)).toBe("below");
    expect(place(10n, 10n, 20n)).toBe("inside");
    expect(place(21n, 10n, 20n)).toBe("above");
  });
});
