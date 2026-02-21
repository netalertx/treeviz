# Running Example Tests - Quick Guide

## 📋 What's in the Example Test?

The `EXAMPLE_TEST_DEMO.test.ts` file contains real-world examples organized in 5 sections:

### 1. **Organization Chart** 
Real data: CEO → CTO → Dev Lead → Frontend/Backend Devs
- Tests coordinate positioning
- Shows horizontal layout configuration

### 2. **Family Trees**
Three different data structures:
- Simple linear (3 generations)
- Wide tree (1 parent, 5 siblings)
- Deep tree (5 generations)

### 3. **Layout Configurations**
- Horizontal layout
- Vertical layout  
- Auto-spacing for responsive design

### 4. **GitHub Repository Structure**
Real-world: treeviz → src/ → nodes/, links/ + tests/ → unit/, integration/
- Tests directory structure mapping
- Tree traversal validation

### 5. **Event Callbacks**
- Click tracking
- Mouse enter/leave events

### 6. **DOM Container Setup**
- SVG element creation
- Container dimension testing

---

## 🚀 How to Run

### Option 1: Run Only the Example Tests
```bash
npm run test:run -- adhoc_docs_scripts/EXAMPLE_TEST_DEMO.test.ts
```

### Option 2: Run All Tests Including Examples
```bash
npm run test:run
```

### Option 3: Watch Mode (Auto-rerun on changes)
```bash
npm test -- adhoc_docs_scripts/EXAMPLE_TEST_DEMO.test.ts
```

### Option 4: Interactive UI Dashboard
```bash
npm run test:ui
```
Then open browser at `http://localhost:51204`

---

## 📊 Expected Output

When you run: `npm run test:run`

You'll see output like:
```
✓ adhoc_docs_scripts/EXAMPLE_TEST_DEMO.test.ts (37 tests)

✓ DEMO: setNodeLocation with Organization Chart Data
  ✓ should position CEO node at origin
  ✓ should position CTO node below CEO (horizontal layout)
  ✓ should position multiple team members horizontally

✓ DEMO: Family Tree - Multiple Data Structures
  ✓ should handle simple linear family tree
  ✓ should handle wide family tree with many siblings
  ✓ should handle deep family tree with many generations

✓ DEMO: Different Layout Configurations
  ✓ should support horizontal tree layout (default)
  ✓ should support vertical tree layout
  ✓ should support auto-spacing for responsive layouts

✓ DEMO: GitHub Repository Organization
  ✓ should map directory structure correctly
  ✓ should identify top-level folders
  ✓ should trace source tree path
  ✓ should match nested test structure

✓ DEMO: Rendering Context Setup
  ✓ should have proper container for tree rendering
  ✓ should accept SVG elements in container

✓ DEMO: Event Callbacks
  ✓ should track click events
  ✓ should track mouse enter/leave events

Test Files  6 passed (6)
Tests     47 passed (47)
Duration  1.2s
```

---

## 🎯 Copy Patterns From Examples

Use these patterns in your own tests:

**1. Organization/Hierarchy Data**
```typescript
const data = [
  { id: 'root', name: 'Root', parent: null },
  { id: 'child', name: 'Child', parent: 'root' },
];
```

**2. Configuration with All Options**
```typescript
const config: ITreeConfig<DataType> = {
  data: myData,
  htmlId: 'container-id',
  idKey: 'id',
  relationnalField: 'parent',
  hasFlatData: true,
  nodeWidth: 150,
  nodeHeight: 75,
  mainAxisNodeSpacing: 300,
  renderNode: (node) => node.data.name,
  linkColor: () => '#1976d2',
  linkWidth: () => 2,
  isHorizontal: true,
  hasPan: true,
  hasZoom: true,
  duration: 750,
  onNodeClick: (node) => {},
  onNodeMouseEnter: (node) => {},
  onNodeMouseLeave: (node) => {},
  marginTop: 40,
  marginBottom: 40,
  marginLeft: 60,
  marginRight: 60,
  secondaryAxisNodeSpacing: 1.5,
};
```

**3. Testing Positioning**
```typescript
it('should position nodes correctly', () => {
  const result = setNodeLocation(100, 400, config);
  expect(result).toContain('translate');
});
```

**4. Testing Data Validation**
```typescript
it('should handle tree structure', () => {
  expect(data).toHaveLength(3);
  expect(data[0].parent).toBeNull();
});
```

---

## 💡 Real Data Examples Included

The example test uses these real datasets:

### Organization Chart
```
    CEO
     ↓
    CTO
     ↓
  Dev Lead
   ↙    ↘
Frontend Backend
Developer Developer
```

### Family Tree (Wide)
```
   Parents
   ↙ ↓ ↓ ↓ ↘
Sibling1-5
```

### GitHub Repo Structure
```
treeviz/
├── src/
│   ├── nodes/
│   └── links/
└── tests/
    ├── unit/
    └── integration/
```

---

## 🔍 Visualization

To see visually what the tests are validating:

1. Run: `npm run test:ui`
2. Click on a test
3. See the test code, assertions, and results
4. Watch outputs in real-time as you edit

---

## 📝 Next Steps

1. **Run the examples**: `npm run test:run`
2. **View in UI**: `npm run test:ui`
3. **Create your own tests** based on the patterns
4. **Copy example data structures** for your use cases
5. **Add coverage**: `npm run test:coverage`

---

## ⚡ Command Reference

| Command | What it does |
|---------|------------|
| `npm test` | Watch mode - reruns on file change |
| `npm run test:run` | Single run of all tests |
| `npm run test:run -- pattern` | Run tests matching pattern |
| `npm run test:coverage` | Generate HTML coverage report |
| `npm run test:ui` | Interactive test dashboard |

---

## 🎓 Learning Paths

**Path 1: Understand the Setup**
1. Read this file
2. Run: `npm run test:ui`
3. Click on each DEMO test section
4. See what data is being tested

**Path 2: Hands-On**
1. Open `EXAMPLE_TEST_DEMO.test.ts`
2. Modify the sample data
3. Run: `npm run test:run`
4. See tests pass/fail based on your changes

**Path 3: Write Your Tests**
1. Study the patterns in examples
2. Create new test file in `tests/unit/` or `tests/integration/`
3. Run: `npm run test:run`
4. Copy assertions that work for you
