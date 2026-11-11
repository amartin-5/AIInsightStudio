# Demos

Insight Studio keeps layers separate so a new demo can mostly swap config and data:

1. **Application shell** (`src/shell`) — Windows chrome, navigation, workspace frame
2. **Reusable product components** (`src/product`) — domain-agnostic report objects
3. **App orchestration** (`src/app`) — views, overlays, session state
4. **Demo configuration / dataset** (`src/demos/<demo>/`) — labels, templates, simulated data

## Active demo

`wwc2023` — Women’s World Cup 2023 simulated analytics for the Insight Studio prototype.

Copy `_template/` to start another demo scenario.
