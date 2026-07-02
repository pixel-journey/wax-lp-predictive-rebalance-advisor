# wax-lp-predictive-rebalance-advisor — Predictive LP Rebalance Advisor

> **Status:** 🔒 Private (In Development) | Target Public Release: July 2026  
> **Category:** Alcor v2 DeFi Analytics & Predictive Tooling (Expansion from existing liquidity tools)  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** An intelligent client-side predictive rebalance advisor for Alcor v2 concentrated liquidity that runs Monte-Carlo-style simulations of future impermanent loss and fee accrual scenarios for any proposed range adjustment and recommends optimal timing windows and target ranges on WAX.

---

## 1. Overview & Goal

This blueprint delivers a sophisticated yet delightful advisor that helps liquidity providers answer the critical question: *"If I rebalance my range now (or in X hours/days), what will my expected IL and fee income look like over the next 7–30 days compared to staying put or choosing different bounds?"*

It combines historical volatility profiles, current pool depth, live tick math, and lightweight probabilistic simulation entirely in the browser to give clear, actionable recommendations with confidence bands.

**Why it matters for WAX/Antelope:**
- Concentrated liquidity is powerful but timing rebalances is non-trivial and emotionally driven today.
- Existing tools show current efficiency or historical backtests but lack forward-looking scenario simulation.
- Pure public infrastructure (Alcor endpoints + Hyperion history) — no oracles or custom contracts needed.
- Bridges the gap between advanced DeFi users and more conservative LPs who want data-driven guidance.

**Target users:**
- Active Alcor v2 LPs seeking to optimize returns
- Portfolio managers and yield aggregators
- Educational content creators explaining IL dynamics
- DAO treasuries managing protocol-owned liquidity

**Success metrics:**
- Run a full 30-day Monte-Carlo simulation for a proposed rebalance in < 3 seconds on mid-range hardware
- Clear, visual confidence intervals and break-even analysis
- 95+ Lighthouse scores
- High user trust in recommendations (measured via future feedback loops)

---

## 2. Concepts & Inspiration

### Core Blockchain Concepts
- **Alcor v2 tick math & sqrt price**: Precise calculation of current price, range bounds, and liquidity density using public pool state.
- **Historical volatility & volume profiles**: Derived from Hyperion swap and liquidity action history to model realistic future price paths.
- **Impermanent loss formulas**: Closed-form and simulation-based IL for concentrated positions under different price trajectories.
- **Fee accrual modeling**: Based on current depth, fee tier, and expected volume (extrapolated from recent history).

### User Pain Points Addressed
- Rebalancing decisions are currently based on gut feel or simple current-efficiency views.
- No easy way to compare "rebalance now vs wait" or "this range vs that range" with forward risk/reward.
- Advanced LPs want probabilistic forecasts; casual LPs need simple, trustworthy guidance.

### Inspirations
- Traditional: Options pricing models, portfolio rebalancing advisors in TradFi apps, Monte-Carlo retirement planners.
- Web3: Existing IL calculators and backtesters (we add the predictive layer), DeFi dashboard scenario tools.
- Design: Calm, data-rich interfaces like Linear or Notion analytics views combined with clear call-to-action recommendations.

**Related Blueprints (synergy):**
- Direct companion and evolution of `wax-alcor-v2-range-efficiency-backtester`, `wax-lp-impermanent-loss-heat-map`, `wax-alcor-v2-range-optimizer`, `wax-lp-behavioral-profiler`, and `wax-alcor-v2-liquidity-density-heatmap`.
- Pairs with `wax-defi-loyalty-health-scorecard` for longer-term LP health views.

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- **Overall layout**: Clean two-column dashboard. Left: Current position + proposed rebalance controls (range sliders, timing horizon selector). Right: Simulation results with beautiful charts (expected IL curve, fee income projection, confidence bands, break-even timeline).
- **Color palette**: Pixel Journey DS — deep indigo for current, emerald for recommended, amber for caution zones, clean neutrals.
- **Micro-interactions**: Smooth range slider updates that instantly re-run lightweight simulation previews, animated confidence bands, satisfying "Apply Recommendation" button with WharfKit preview.
- **Responsive**: Excellent on desktop for detailed analysis; mobile-optimized summary cards + simplified controls.

### 3.2 Key Views / Components
- `CurrentPositionCard.tsx` — Live position stats, current efficiency, accrued fees/IL.
- `RebalanceControls.tsx` — Interactive range sliders + timing horizon + "What if I wait?" toggles.
- `SimulationResults.tsx` — Main viz area with IL projection chart, fee projection, risk/reward summary cards, and recommendation callout.
- `ScenarioComparison.tsx` — Side-by-side or tabbed comparison of "Stay", "Rebalance Now", "Rebalance in 24h", custom scenarios.
- `ConfidenceBandChart.tsx` — Custom or Recharts area chart with probabilistic bands.

### 3.3 Accessibility (A11y) & Inclusive Design
- WCAG 2.2 AA: Full keyboard control of sliders and scenarios, high-contrast recommendation cards, clear aria-live updates for simulation results.
- Screen reader: Announcements of key metrics and recommendation rationale in plain language.
- Reduced motion & cognitive load: Toggle for simpler numeric summary view instead of animated charts.
- Colorblind safe: Patterns, icons, and text labels alongside color.

### 3.4 Performance & Optimization Targets
- Lighthouse 95+ Performance (Web Workers for heavier Monte-Carlo runs if needed)
- Instant preview simulations on slider drag (throttled lightweight model)
- Full high-fidelity simulation on demand in < 3s
- Bundle optimized, heavy math off main thread where possible

---

## 4. Technical Architecture

### 4.1 Core Tech Stack (Standardized)
- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui + framer-motion (subtle)
- **State & Data:** @tanstack/react-query + zod + Jotai
- **Wallet & Signing:** @wharfkit/session (for optional saving scenarios or attesting recommendations)
- **Blockchain Data:** Alcor public endpoints for pool state + tick data; Hyperion for historical volume/volatility profiles
- **Simulation Engine:** Custom lightweight Monte-Carlo or parametric models in Web Worker (or WASM if performance demands)
- **Visualization:** Recharts or custom Canvas/SVG for projection charts with confidence bands
- **Utilities:** date-fns, lucide-react, sonner

### 4.2 Data Flow Diagram
```
User adjusts proposed range or timing
    ↓
Fetch current pool state + historical profiles (cached)
    ↓
Run client-side simulation (Web Worker)
    ↓
Compare scenarios (Stay vs Rebalance options)
    ↓
Render beautiful charts + clear recommendation
    ↓
Optional WharfKit save/attest of chosen scenario
```

### 4.3 Folder Structure
```
app/
├── (advisor)/
│   └── page.tsx                 # Main predictive advisor
├── components/
│   ├── advisor/
│   │   ├── CurrentPositionCard.tsx
│   │   ├── RebalanceControls.tsx
│   │   ├── SimulationResults.tsx
│   │   └── ScenarioComparison.tsx
├── hooks/
│   ├── usePoolState.ts
│   ├── useHistoricalProfiles.ts
│   └── useSimulation.ts          # Core predictive engine
├── lib/
│   ├── wax/
│   │   ├── alcor-tick-math.ts
│   │   ├── simulation-engine.ts
│   │   └── volatility-model.ts
│   └── utils.ts
├── types/
│   └── simulation.ts
public/
└── mock-data/                   # Sample pool histories for demo mode
```

### 4.4 Security & Privacy Notes
- All simulation is client-side
- Optional signed scenario exports via WharfKit
- Clear disclaimers on probabilistic nature of forecasts

---

## 5. Implementation Examples & Code Snippets

### 1. Core simulation hook (simplified)
```ts
// hooks/useSimulation.ts
export function useSimulation(currentRange, proposedRange, horizonDays) {
  return useQuery({
    queryKey: ['rebalance-sim', currentRange, proposedRange, horizonDays],
    queryFn: () => runPredictiveSimulation(currentRange, proposedRange, horizonDays),
    staleTime: 30 * 1000,
  });
}

// Web Worker or main-thread lightweight Monte-Carlo
async function runPredictiveSimulation(...) {
  // Sample future price paths based on historical vol
  // Calculate IL and fee accrual for each path
  // Return expected values + confidence bands
}
```

### 2. Recommendation logic example
```ts
// Simple rule + scoring layer
if (expectedILReduction > feeOpportunityCost * 1.5 && confidence > 0.7) {
  return { recommendation: 'Rebalance now', confidence: 0.82, rationale: '...' };
}
```

---

## 6. Demo & Testing Strategy

- **Live Demo Toggle:** Mock pool data ↔ Live Alcor + Hyperion data
- **Storybook** for all cards and charts
- **Playwright** e2e: adjust range → run sim → compare scenarios → save scenario
- **Vitest** for simulation engine accuracy against known IL formulas
- Vercel previews

---

## 7. Roadmap & Development Phases

**Phase 0 — Scaffold (1–2 days)**
- Next.js + Tailwind + shadcn + simulation skeleton + Alcor client

**Phase 1 — Simulation Engine (4–5 days)**
- Historical profile builder, lightweight Monte-Carlo or parametric model, comparison logic

**Phase 2 — Core UI (4 days)**
- Controls, beautiful projection charts with bands, recommendation engine, scenario comparison

**Phase 3 — Polish (2–3 days)**
- a11y, performance (Web Workers), responsive, loading/empty states, disclaimers

**Phase 4 — Documentation & Release (2 days)**
- Full README, GIFs/screenshots, AI prompt pack, make public, catalog update

**Future Enhancements**
- Multi-position portfolio optimization across several pools
- Integration with existing LP behavioral profiler for personalized risk tolerance
- On-chain attestation of simulation assumptions at decision time
- Community-shared scenario templates

---

## 8. Visual References & Mockups

**Key Screen:**
Clean dashboard. Left side shows current LP position with key metrics. Center/right has proposed range sliders and timing selector. Large central area shows elegant line/area charts: expected cumulative IL and fee lines for different scenarios with shaded confidence bands. Clear recommendation banner at top or bottom with rationale and one-click "View detailed comparison".

> *Feels like a premium TradFi portfolio rebalancer meets calm Web3 DeFi dashboard — data-rich but not overwhelming.*

**ASCII Sketch:**
```
[ Current Position Summary ]          [ Proposed Rebalance Controls ]

Simulation Results (30-day horizon)
Expected IL: -2.3% (±1.1%)     vs Stay: -4.8%
Expected Fees: +3.1%           vs Stay: +2.4%
Net Advantage: +1.4%           Confidence: 78%

[ Rebalance Now (Recommended) ]  [ Wait 24h ]  [ Custom Scenario ]
```

---

## 9. Related Blueprints & Ecosystem Fit

- `wax-alcor-v2-range-efficiency-backtester` & `wax-lp-impermanent-loss-heat-map` — Historical foundation this builds predictive layer on top of
- `wax-alcor-v2-range-optimizer` & `wax-lp-behavioral-profiler` — Natural companions for range suggestion + behavioral context
- `wax-defi-retention-metric-suite` — Longer-term LP health context

---

## 10. License, Contributing & Credits

- MIT License
- Built with ❤️ for WAX liquidity providers
- Powered exclusively by public Alcor and Hyperion infrastructure
- Pixel Journey Design System for consistent, calm, data-rich theming
- Special thanks to the gkniftyheads-tracker quality bar and the Phase 1 audit that highlighted this expansion opportunity

**This blueprint turns reactive rebalancing into confident, data-driven decisions.**

*Pixel Journey — Beautiful interfaces for public blockchain data.*

---

*Last updated: July 02, 2026*