# Demos

Insight Studio keeps layers separate so a new demo can mostly swap config and data:

1. **Application shell** (`src/shell`) — Windows chrome, navigation, workspace frame
2. **Reusable product components** (`src/product`) — domain-agnostic UI objects
3. **Demo configuration** (`src/demos/<demo>/config.ts`) — spaces, reports, labels
4. **Demo dataset** (`src/demos/<demo>/dataset.ts`) — sample records

Copy `_template/` to start a new demo scenario.
