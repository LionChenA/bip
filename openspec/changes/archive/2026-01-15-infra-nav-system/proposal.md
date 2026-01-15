# Change: Infrastructure & Navigation System

## Why
To establish the global website structure, enabling users to navigate between core sections (Home, Garden, Work, About) and customize their viewing experience via themes. This builds the "container" for future business modules.

## What Changes
- **Navigation**: Implements a global Header with i18n-aware links and controls.
- **Theme System**: Adds Light/Dark/System mode switching with View Transitions.
- **Skeleton Pages**: Creates placeholder routes for Garden, Work, and About to ensure navigation viability.
- **Layout**: Enhances `BaseLayout` with theme initialization and transition support.

## Impact
- **Specs**: `navigation` (New), `ui` (Modified), `routing` (Modified)
- **Code**: `src/modules/core/`, `src/pages/`, `src/styles/`
