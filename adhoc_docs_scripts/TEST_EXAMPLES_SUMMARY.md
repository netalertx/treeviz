# ✨ Testing Setup Complete - Quick Start

## Run Tests with Sample Data

```bash
# View all examples with sample data
npm run test:run

# Watch mode - see tests update as you edit
npm test

# Interactive UI dashboard (recommended for learning)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

---

## 📊 What You'll See

**37 Sample Tests** covering real-world scenarios:

✅ **Organization Chart Example**
- CEO → CTO → Dev Lead → Team Members
- Tests coordinate positioning and hierarchies

✅ **Family Tree Examples**
- Simple linear trees (3 generations)
- Wide trees (1 parent, 5 siblings)
- Deep trees (5 generations)

✅ **Layout Configurations**
- Horizontal layout
- Vertical layout
- Auto-spacing (responsive)

✅ **GitHub Repository Structure**
- Real directory tree mapping
- Tests folder organization
- Source code hierarchy

✅ **Event Callbacks**
- Click event tracking
- Mouse enter/leave handling

✅ **DOM Setup**
- SVG container validation
- Element creation tests

---

## 📂 Files Created

- `adhoc_docs_scripts/EXAMPLE_TEST_DEMO.test.ts` - 37 tests with sample data
- `adhoc_docs_scripts/RUNNING_EXAMPLES.md` - Detailed guide
- `adhoc_docs_scripts/QUICK_TEST_GUIDE.md` - Quick reference

---

## 🎯 Try This Now

### 1. Run All Tests (47 total)
```bash
npm run test:run
```

**Expected output:**
```
✓ tests/unit/utils.test.ts (5 tests)
✓ tests/unit/core-utils.test.ts (11 tests)
✓ tests/unit/node-ancestors.test.ts (6 tests)
✓ tests/unit/prepare-data.test.ts (6 tests)
✓ tests/integration/treeviz-api.test.ts (19 tests)
✓ adhoc_docs_scripts/EXAMPLE_TEST_DEMO.test.ts (37 tests)

All tests passed! ✅
```

### 2. Open Interactive Dashboard
```bash
npm run test:ui
```
Then visit: `http://localhost:51204`

### 3. Watch Mode (Auto-rerun)
```bash
npm test
```

---

## 📖 Real Data Examples in Tests

### Organization Chart
```typescript
const orgChartData = [
  { id: 'ceo', name: 'CEO', parent: null },
  { id: 'cto', name: 'CTO', parent: 'ceo' },
  { id: 'dev-lead', name: 'Dev Lead', parent: 'cto' },
  { id: 'frontend-dev', name: 'Frontend Developer', parent: 'dev-lead' },
  { id: 'backend-dev', name: 'Backend Developer', parent: 'dev-lead' },
];
```

### GitHub Repository Structure
```typescript
const repoOrgData = [
  { id: 'treeviz', name: 'treeviz (root)', parent: null },
  { id: 'src', name: 'src/', parent: 'treeviz' },
  { id: 'tests', name: 'tests/', parent: 'treeviz' },
  { id: 'nodes', name: 'nodes/', parent: 'src' },
  { id: 'unit', name: 'unit/', parent: 'tests' },
];
```

### Family Tree (Deep)
```typescript
const deepFamilyTree = [
  { id: 'gen1', name: 'Generation 1', parent: null },
  { id: 'gen2', name: 'Generation 2', parent: 'gen1' },
  { id: 'gen3', name: 'Generation 3', parent: 'gen2' },
  { id: 'gen4', name: 'Generation 4', parent: 'gen3' },
  { id: 'gen5', name: 'Generation 5', parent: 'gen4' },
];
```

---

## 🚀 Key Features Demonstrated

| Test Section | Tests | What it Shows |
|---|---|---|
| Organization Chart | 4 | Coordinate positioning with real data |
| Family Trees | 3 | Different tree structures |
| Layout Configs | 3 | Horizontal, vertical, auto-spacing |
| Repo Structure | 4 | Real-world file tree mapping |
| DOM Setup | 2 | Container and SVG creation |
| Event Callbacks | 2 | Click and mouse events |

**Plus 20 more configuration and edge-case tests!**

---

## 💡 Copy These Patterns

All test files in `tests/` use these exact patterns. Copy them for your own tests:

```typescript
describe('My Tests', () => {
  const sampleData = [
    { id: 'root', name: 'Root', parent: null },
    { id: 'child', name: 'Child', parent: 'root' },
  ];

  it('should work with my data', () => {
    expect(sampleData).toHaveLength(2);
    expect(sampleData[0].parent).toBeNull();
  });
});
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [INSTRUCTIONS.md](../docs-internal/INSTRUCTIONS.md) | Core guidelines |
| [TESTING_SETUP.md](../docs-internal/TESTING_SETUP.md) | Setup details |
| [QUICK_TEST_GUIDE.md](./QUICK_TEST_GUIDE.md) | Quick reference |
| [RUNNING_EXAMPLES.md](./RUNNING_EXAMPLES.md) | How to run examples |
| [README.md](../README.md) | Main project README |

---

## ✅ Next Steps

1. **Run tests**: `npm run test:run`
2. **View dashboard**: `npm run test:ui`
3. **Check coverage**: `npm run test:coverage`
4. **Write your tests** using the patterns in examples
5. **Add to docs-internal** if you discover new patterns

---

## 🎓 Learning Resources

- Read `EXAMPLE_TEST_DEMO.test.ts` for real code examples
- Examine existing test files in `tests/unit/` and `tests/integration/`
- Use UI dashboard to see test pass/fail in real-time
- Copy patterns and modify for your use cases

---

**All 47 tests ready to run! 🚀**
