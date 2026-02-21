# Quick Start: Running Tests

## Installation Complete ✅

Vitest testing framework has been set up with jsdom environment and coverage support.

## Test Commands

```bash
# Watch mode - auto-reruns tests on changes
npm test

# Single run - runs all tests once
npm run test:run

# Generate coverage report (HTML in coverage/ folder)
npm run test:coverage

# Interactive UI dashboard
npm run test:ui
```

## Test Files Created

### Unit Tests (tests/unit/)
- ✅ **utils.test.ts** (5 tests)
  - Tests for `setNodeLocation()` with various orientations

- ✅ **core-utils.test.ts** (11 tests)
  - Tests for `getAreaSize()` (valid/invalid containers)
  - Tests for `RefreshQueue` class (async queue management)

- ✅ **node-ancestors.test.ts** (6 tests)
  - Tests for `getFirstDisplayedAncestor()` hierarchy traversal

- ✅ **prepare-data.test.ts** (6 tests)
  - Tests for configuration validation
  - Tests for data preparation options

### Integration Tests (tests/integration/)
- ✅ **treeviz-api.test.ts** (19 tests)
  - Configuration validation tests
  - Data structure variation tests
  - Layout configuration tests
  - Callback handler tests

**Total: 47 Tests**

## Key Features

✅ TypeScript support throughout
✅ jsdom for browser DOM simulation
✅ Code coverage reporting (v8)
✅ Interactive UI dashboard
✅ Fast execution (no external dependencies)
✅ Clear BDD-style test names

## Example: Run Tests

```bash
# Install if needed
npm install

# Quick verification
npm run test:run

# Full coverage report
npm run test:coverage
# Open coverage/index.html to view detailed report
```

## Next: Check Test Results

Run `npm run test:run` to see all 47 tests execute and verify the setup works correctly.
