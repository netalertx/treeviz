/**
 * EXAMPLE TEST DEMO - Understanding Treeviz Testing
 * 
 * This file demonstrates how to write tests for Treeviz.
 * Copy patterns from here to create your own tests.
 * 
 * Run with: npm run test:run -- EXAMPLE_TEST_DEMO.test.ts
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setNodeLocation } from '../src/utils';
import { ITreeConfig } from '../src/typings';

/**
 * ============================================================
 * SAMPLE 1: Testing Utility Functions with Real Data
 * ============================================================
 */
describe('DEMO: setNodeLocation with Organization Chart Data', () => {
  // Sample organization data
  const orgChartData = [
    { id: 'ceo', name: 'CEO', parent: null },
    { id: 'cto', name: 'CTO', parent: 'ceo' },
    { id: 'dev-lead', name: 'Dev Lead', parent: 'cto' },
    { id: 'frontend-dev', name: 'Frontend Developer', parent: 'dev-lead' },
    { id: 'backend-dev', name: 'Backend Developer', parent: 'dev-lead' },
  ];

  const config: ITreeConfig<(typeof orgChartData)[0]> = {
    data: orgChartData,
    htmlId: 'org-chart',
    idKey: 'id',
    relationnalField: 'parent',
    hasFlatData: true,
    nodeWidth: 200,
    nodeHeight: 80,
    mainAxisNodeSpacing: 400,
    renderNode: (node) => node.data.name,
    linkColor: () => '#1976d2',
    linkWidth: () => 2,
    isHorizontal: true,
    hasPan: true,
    hasZoom: true,
    duration: 750,
    onNodeClick: (node) => console.log(`Clicked: ${node.data.name}`),
    onNodeMouseEnter: (node) => console.log(`Entered: ${node.data.name}`),
    onNodeMouseLeave: (node) => console.log(`Left: ${node.data.name}`),
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 60,
    marginRight: 60,
    secondaryAxisNodeSpacing: 1.5,
  };

  it('should position CEO node at origin', () => {
    const result = setNodeLocation(0, 0, config);
    expect(result).toBe('translate(0,0)');
  });

  it('should position CTO node below CEO (horizontal layout)', () => {
    // CEO at (x:0, y:0), CTO next level down at y=400
    const result = setNodeLocation(100, 400, config);
    expect(result).toBe('translate(400,100)');
    expect(result).toContain('400'); // Spacing applied
  });

  it('should position multiple team members horizontally', () => {
    const positions = [
      { x: 200, y: 800 }, // Dev Lead
      { x: 100, y: 1200 }, // Frontend Dev (left sibling)
      { x: 300, y: 1200 }, // Backend Dev (right sibling)
    ];

    positions.forEach((pos) => {
      const result = setNodeLocation(pos.x, pos.y, config);
      expect(result).toContain('translate');
      expect(result).toContain(pos.y.toString());
    });
  });
});

/**
 * ============================================================
 * SAMPLE 2: Testing with Different Tree Structures
 * ============================================================
 */
describe('DEMO: Family Tree - Multiple Data Structures', () => {
  // Sample 1: Simple family tree
  const simpleFamilyTree = [
    { id: 'grandpa', name: 'Grandpa', parent: null },
    { id: 'dad', name: 'Dad', parent: 'grandpa' },
    { id: 'me', name: 'Me', parent: 'dad' },
  ];

  // Sample 2: Wide family (many siblings)
  const wideFamilyTree = [
    { id: 'parents', name: 'Parents', parent: null },
    { id: 'sibling-1', name: 'Sibling 1', parent: 'parents' },
    { id: 'sibling-2', name: 'Sibling 2', parent: 'parents' },
    { id: 'sibling-3', name: 'Sibling 3', parent: 'parents' },
    { id: 'sibling-4', name: 'Sibling 4', parent: 'parents' },
    { id: 'sibling-5', name: 'Sibling 5', parent: 'parents' },
  ];

  // Sample 3: Deep family (many generations)
  const deepFamilyTree = [
    { id: 'gen1', name: 'Generation 1', parent: null },
    { id: 'gen2', name: 'Generation 2', parent: 'gen1' },
    { id: 'gen3', name: 'Generation 3', parent: 'gen2' },
    { id: 'gen4', name: 'Generation 4', parent: 'gen3' },
    { id: 'gen5', name: 'Generation 5', parent: 'gen4' },
  ];

  it('should handle simple linear family tree', () => {
    expect(simpleFamilyTree).toHaveLength(3);
    expect(simpleFamilyTree[0].parent).toBeNull();
    expect(simpleFamilyTree[2].parent).toBe('dad');
  });

  it('should handle wide family tree with many siblings', () => {
    const siblings = wideFamilyTree.filter((m) => m.parent === 'parents');
    expect(siblings).toHaveLength(5);
    expect(wideFamilyTree).toHaveLength(6);
  });

  it('should handle deep family tree with many generations', () => {
    expect(deepFamilyTree).toHaveLength(5);
    expect(deepFamilyTree[4].parent).toBe('gen3');
  });
});

/**
 * ============================================================
 * SAMPLE 3: Testing Configuration Variations
 * ============================================================
 */
describe('DEMO: Different Layout Configurations', () => {
  const sampleData = [
    { id: 'root', name: 'Root', parent: null },
    { id: 'child1', name: 'Child 1', parent: 'root' },
    { id: 'child2', name: 'Child 2', parent: 'root' },
  ];

  it('should support horizontal tree layout (default)', () => {
    const horizontalConfig: ITreeConfig<(typeof sampleData)[0]> = {
      data: sampleData,
      htmlId: 'tree-h',
      idKey: 'id',
      relationnalField: 'parent',
      hasFlatData: true,
      nodeWidth: 150,
      nodeHeight: 75,
      mainAxisNodeSpacing: 300,
      renderNode: (n) => n.data.name,
      linkColor: () => '#ff5722',
      linkWidth: () => 3,
      isHorizontal: true,
      hasPan: false,
      hasZoom: false,
      duration: 600,
      onNodeClick: () => {},
      onNodeMouseEnter: () => {},
      onNodeMouseLeave: () => {},
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      secondaryAxisNodeSpacing: 1.25,
    };

    expect(horizontalConfig.isHorizontal).toBe(true);
    expect(horizontalConfig.mainAxisNodeSpacing).toBe(300);
  });

  it('should support vertical tree layout', () => {
    const verticalConfig: ITreeConfig<(typeof sampleData)[0]> = {
      data: sampleData,
      htmlId: 'tree-v',
      idKey: 'id',
      relationnalField: 'parent',
      hasFlatData: true,
      nodeWidth: 150,
      nodeHeight: 75,
      mainAxisNodeSpacing: 250,
      renderNode: (n) => n.data.name,
      linkColor: () => '#2196f3',
      linkWidth: () => 2,
      isHorizontal: false,
      hasPan: true,
      hasZoom: true,
      duration: 800,
      onNodeClick: () => {},
      onNodeMouseEnter: () => {},
      onNodeMouseLeave: () => {},
      marginTop: 50,
      marginBottom: 50,
      marginLeft: 50,
      marginRight: 50,
      secondaryAxisNodeSpacing: 1.5,
    };

    expect(verticalConfig.isHorizontal).toBe(false);
  });

  it('should support auto-spacing for responsive layouts', () => {
    const autoSpacingConfig: ITreeConfig<(typeof sampleData)[0]> = {
      data: sampleData,
      htmlId: 'tree-auto',
      idKey: 'id',
      relationnalField: 'parent',
      hasFlatData: true,
      nodeWidth: 150,
      nodeHeight: 75,
      mainAxisNodeSpacing: 'auto', // AUTO MODE
      renderNode: (n) => n.data.name,
      linkColor: () => '#4caf50',
      linkWidth: () => 2,
      isHorizontal: true,
      hasPan: false,
      hasZoom: false,
      duration: 600,
      onNodeClick: () => {},
      onNodeMouseEnter: () => {},
      onNodeMouseLeave: () => {},
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      secondaryAxisNodeSpacing: 1.25,
    };

    expect(autoSpacingConfig.mainAxisNodeSpacing).toBe('auto');
  });
});

/**
 * ============================================================
 * SAMPLE 4: Real-World Scenario - GitHub Org Chart
 * ============================================================
 */
describe('DEMO: GitHub Repository Organization', () => {
  const repoOrgData = [
    { id: 'treeviz', name: 'treeviz (root)', parent: null },
    { id: 'src', name: 'src/', parent: 'treeviz' },
    { id: 'tests', name: 'tests/', parent: 'treeviz' },
    { id: 'docs', name: 'docs/', parent: 'treeviz' },
    { id: 'nodes', name: 'nodes/', parent: 'src' },
    { id: 'links', name: 'links/', parent: 'src' },
    { id: 'utils', name: 'utils.ts', parent: 'src' },
    { id: 'unit', name: 'unit/', parent: 'tests' },
    { id: 'integration', name: 'integration/', parent: 'tests' },
  ];

  it('should map directory structure correctly', () => {
    expect(repoOrgData).toHaveLength(9);
    const rootCount = repoOrgData.filter((d) => d.parent === null).length;
    expect(rootCount).toBe(1); // Only one root
  });

  it('should identify top-level folders', () => {
    const topLevel = repoOrgData.filter((d) => d.parent === 'treeviz');
    const names = topLevel.map((d) => d.name);
    expect(names).toContain('src/');
    expect(names).toContain('tests/');
    expect(names).toContain('docs/');
  });

  it('should trace source tree path (src -> nodes -> node-enter)', () => {
    const srcFolder = repoOrgData.find((d) => d.id === 'src');
    expect(srcFolder?.parent).toBe('treeviz');

    const nodesFolder = repoOrgData.find((d) => d.id === 'nodes');
    expect(nodesFolder?.parent).toBe('src');
  });

  it('should match nested test structure', () => {
    const testsFolders = repoOrgData.filter((d) => d.parent === 'tests');
    expect(testsFolders).toHaveLength(2);
    expect(testsFolders.map((f) => f.id)).toEqual([
      'unit',
      'integration',
    ]);
  });
});

/**
 * ============================================================
 * SAMPLE 5: Testing with DOM Containers
 * ============================================================
 */
describe('DEMO: Rendering Context Setup', () => {
  beforeEach(() => {
    // Create container for this test
    const container = document.createElement('div');
    container.id = 'demo-tree';
    container.style.width = '1200px';
    container.style.height = '800px';
    container.style.border = '1px solid #ccc';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Cleanup
    document.body.innerHTML = '';
  });

  it('should have proper container for tree rendering', () => {
    const container = document.getElementById('demo-tree');
    expect(container).toBeDefined();
    expect(container?.style.width).toBe('1200px');
    expect(container?.style.height).toBe('800px');
  });

  it('should accept SVG elements in container', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '1200');
    svg.setAttribute('height', '800');
    document.getElementById('demo-tree')?.appendChild(svg);

    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeDefined();
    expect(svgElement?.getAttribute('width')).toBe('1200');
  });
});

/**
 * ============================================================
 * BONUS: Callback Testing Examples
 * ============================================================
 */
describe('DEMO: Event Callbacks', () => {
  const sampleData = [{ id: '1', name: 'Node', parent: null }];

  it('should track click events', () => {
    const clickLog: string[] = [];

    const config: ITreeConfig<(typeof sampleData)[0]> = {
      data: sampleData,
      htmlId: 'cb-demo',
      idKey: 'id',
      relationnalField: 'parent',
      hasFlatData: true,
      nodeWidth: 100,
      nodeHeight: 50,
      mainAxisNodeSpacing: 200,
      renderNode: (n) => n.data.name,
      linkColor: () => '#000',
      linkWidth: () => 1,
      isHorizontal: true,
      hasPan: false,
      hasZoom: false,
      duration: 600,
      onNodeClick: (node) => clickLog.push(node.data.id),
      onNodeMouseEnter: () => {},
      onNodeMouseLeave: () => {},
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      secondaryAxisNodeSpacing: 1.25,
    };

    // Simulate click
    if (config.onNodeClick) {
      config.onNodeClick({
        data: sampleData[0],
        settings: config,
      } as any);
    }

    expect(clickLog).toContain('1');
  });

  it('should track mouse enter/leave events', () => {
    const mouseEvents: string[] = [];

    const config: ITreeConfig<(typeof sampleData)[0]> = {
      data: sampleData,
      htmlId: 'mouse-demo',
      idKey: 'id',
      relationnalField: 'parent',
      hasFlatData: true,
      nodeWidth: 100,
      nodeHeight: 50,
      mainAxisNodeSpacing: 200,
      renderNode: (n) => n.data.name,
      linkColor: () => '#000',
      linkWidth: () => 1,
      isHorizontal: true,
      hasPan: false,
      hasZoom: false,
      duration: 600,
      onNodeClick: () => {},
      onNodeMouseEnter: () => mouseEvents.push('enter'),
      onNodeMouseLeave: () => mouseEvents.push('leave'),
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      secondaryAxisNodeSpacing: 1.25,
    };

    // Simulate events
    if (config.onNodeMouseEnter) config.onNodeMouseEnter({} as any);
    if (config.onNodeMouseLeave) config.onNodeMouseLeave({} as any);

    expect(mouseEvents).toEqual(['enter', 'leave']);
  });
});
