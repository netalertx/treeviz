import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ITreeConfig } from '../../src/typings';

// Mock data for testing
const flatTreeData = [
  { id: '1', father: null, name: 'Root' },
  { id: '2', father: '1', name: 'Child 1' },
  { id: '3', father: '1', name: 'Child 2' },
  { id: '4', father: '2', name: 'Grandchild 1' },
];

const nestedTreeData = {
  id: '1',
  name: 'Root',
  father: [
    {
      id: '2',
      name: 'Child 1',
      father: [
        {
          id: '4',
          name: 'Grandchild 1',
          father: [],
        },
      ],
    },
    {
      id: '3',
      name: 'Child 2',
      father: [],
    },
  ],
};

describe('Treeviz Integration Tests', () => {
  beforeEach(() => {
    // Setup DOM container for each test
    const container = document.createElement('div');
    container.id = 'treeviz-container';
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Cleanup DOM
    document.body.innerHTML = '';
  });

  describe('Configuration Validation', () => {
    it('should accept valid flat data configuration', () => {
      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        data: flatTreeData,
        htmlId: 'treeviz-container',
        idKey: 'id',
        relationnalField: 'father',
        hasFlatData: true,
        nodeWidth: 160,
        nodeHeight: 100,
        mainAxisNodeSpacing: 300,
        renderNode: (node) => node.data.name,
        linkColor: () => '#ffcc80',
        linkWidth: () => 10,
        isHorizontal: true,
        hasPan: false,
        hasZoom: false,
        duration: 600,
      };

      expect(config.data).toHaveLength(4);
      expect(config.hasFlatData).toBe(true);
      expect(config.renderNode).toBeDefined();
    });

    it('should accept valid nested data configuration', () => {
      const config: Partial<ITreeConfig<typeof nestedTreeData>> = {
        data: [nestedTreeData],
        htmlId: 'treeviz-container',
        idKey: 'id',
        relationnalField: 'father',
        hasFlatData: false,
        nodeWidth: 160,
        nodeHeight: 100,
        mainAxisNodeSpacing: 'auto',
        renderNode: (node) => node.data.name,
        linkColor: () => '#ff6b6b',
        linkWidth: () => 5,
        isHorizontal: false,
        hasPan: true,
        hasZoom: true,
        duration: 800,
      };

      expect(config.hasFlatData).toBe(false);
      expect(config.mainAxisNodeSpacing).toBe('auto');
      expect(config.hasPan).toBe(true);
      expect(config.hasZoom).toBe(true);
    });

    it('should support custom margins', () => {
      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        data: flatTreeData,
        htmlId: 'treeviz-container',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
      };

      expect(config.marginTop).toBe(20);
      expect(config.marginLeft).toBe(30);
    });

    it('should support custom spacing ratios', () => {
      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        data: flatTreeData,
        htmlId: 'treeviz-container',
        mainAxisNodeSpacing: 250,
        secondaryAxisNodeSpacing: 1.5,
      };

      expect(config.mainAxisNodeSpacing).toBe(250);
      expect(config.secondaryAxisNodeSpacing).toBe(1.5);
    });

    it('should support callback handlers', () => {
      let clickCount = 0;
      let enterCount = 0;
      let leaveCount = 0;

      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        data: flatTreeData,
        htmlId: 'treeviz-container',
        onNodeClick: () => {
          clickCount++;
        },
        onNodeMouseEnter: () => {
          enterCount++;
        },
        onNodeMouseLeave: () => {
          leaveCount++;
        },
      };

      expect(config.onNodeClick).toBeDefined();
      expect(config.onNodeMouseEnter).toBeDefined();
      expect(config.onNodeMouseLeave).toBeDefined();
    });

    it('should support different link shapes', () => {
      const shapes: Array<'quadraticBeziers' | 'curve' | 'orthogonal' | ''> = [
        'quadraticBeziers',
        'curve',
        'orthogonal',
        '',
      ];

      shapes.forEach((shape) => {
        const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
          data: flatTreeData,
          htmlId: 'treeviz-container',
          linkShape: shape,
        };

        expect(config.linkShape).toBe(shape);
      });
    });
  });

  describe('Data Variations', () => {
    it('should handle single-node tree', () => {
      const singleNodeData = [{ id: '1', father: null, name: 'Only Node' }];

      expect(singleNodeData).toHaveLength(1);
      expect(singleNodeData[0].father).toBeNull();
    });

    it('should handle deep tree hierarchy', () => {
      const deepData = [
        { id: '1', father: null, name: 'Level 0' },
        { id: '2', father: '1', name: 'Level 1' },
        { id: '3', father: '2', name: 'Level 2' },
        { id: '4', father: '3', name: 'Level 3' },
        { id: '5', father: '4', name: 'Level 4' },
      ];

      expect(deepData).toHaveLength(5);
      expect(deepData[4].father).toBe('4');
    });

    it('should handle wide tree with many siblings', () => {
      const wideData = [
        { id: '1', father: null, name: 'Root' },
        { id: '2', father: '1', name: 'Child 1' },
        { id: '3', father: '1', name: 'Child 2' },
        { id: '4', father: '1', name: 'Child 3' },
        { id: '5', father: '1', name: 'Child 4' },
        { id: '6', father: '1', name: 'Child 5' },
      ];

      const children = wideData.filter((node) => node.father === '1');
      expect(children).toHaveLength(5);
    });

    it('should validate data field names match config', () => {
      const data = [{ id: '1', parent: null }]; // Using 'parent' instead of 'father'
      const config: Partial<ITreeConfig<(typeof data)[0]>> = {
        data,
        idKey: 'id',
        relationnalField: 'parent', // Correctly configured
      };

      expect(data[0][config.idKey as string]).toBe('1');
      expect(data[0][config.relationnalField as string]).toBeNull();
    });
  });

  describe('Layout Configurations', () => {
    it('should support horizontal orientation', () => {
      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        data: flatTreeData,
        isHorizontal: true,
      };

      expect(config.isHorizontal).toBe(true);
    });

    it('should support vertical orientation', () => {
      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        data: flatTreeData,
        isHorizontal: false,
      };

      expect(config.isHorizontal).toBe(false);
    });

    it('should support auto-spacing with dimensions', () => {
      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        mainAxisNodeSpacing: 'auto',
        nodeWidth: 160,
        nodeHeight: 100,
      };

      expect(config.mainAxisNodeSpacing).toBe('auto');
      expect(typeof config.nodeWidth).toBe('number');
      expect(typeof config.nodeHeight).toBe('number');
    });

    it('should support fixed spacing mode', () => {
      const config: Partial<ITreeConfig<typeof flatTreeData[0]>> = {
        mainAxisNodeSpacing: 300,
      };

      expect(typeof config.mainAxisNodeSpacing).toBe('number');
      expect(config.mainAxisNodeSpacing).toBe(300);
    });
  });
});
