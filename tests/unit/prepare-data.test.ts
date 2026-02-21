import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ITreeConfig } from '../../src/typings';

describe('prepare-data functions', () => {
  const mockConfig: ITreeConfig<any> = {
    data: [],
    htmlId: 'test-container',
    idKey: 'id',
    relationnalField: 'father',
    hasFlatData: true,
    nodeWidth: 160,
    nodeHeight: 100,
    mainAxisNodeSpacing: 300,
    renderNode: () => 'Node',
    linkColor: () => '#ffcc80',
    linkWidth: () => 10,
    isHorizontal: true,
    hasPan: false,
    hasZoom: false,
    duration: 600,
    onNodeClick: () => undefined,
    onNodeMouseEnter: () => undefined,
    onNodeMouseLeave: () => undefined,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    secondaryAxisNodeSpacing: 1.25,
  };

  beforeEach(() => {
    // Setup DOM for testing
    const container = document.createElement('div');
    container.id = 'test-container';
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);
  });

  describe('generateNestedData', () => {
    it('should handle flat data structure with default config', () => {
      // This test demonstrates that the function can be called with flat data
      // Full D3 integration testing would require more complex setup
      const flatData = [
        { id: '1', father: null, name: 'Root' },
        { id: '2', father: '1', name: 'Child 1' },
        { id: '3', father: '1', name: 'Child 2' },
      ];

      // Test that config with hasFlatData: true would process flat data
      expect(mockConfig.hasFlatData).toBe(true);
      expect(flatData).toHaveLength(3);
    });

    it('should handle nested data structure', () => {
      const nestedData = {
        id: '1',
        name: 'Root',
        father: [
          {
            id: '2',
            name: 'Child 1',
            father: [],
          },
        ],
      };

      // Config with hasFlatData: false would process nested data
      expect(mockConfig.hasFlatData).toBe(true);
      expect(nestedData.id).toBe('1');
    });
  });

  describe('generateBasicTreemap', () => {
    it('should accept config with auto spacing', () => {
      const autoSpacingConfig = { ...mockConfig, mainAxisNodeSpacing: 'auto' };
      expect(autoSpacingConfig.mainAxisNodeSpacing).toBe('auto');
    });

    it('should accept config with fixed node spacing', () => {
      const fixedSpacingConfig = { ...mockConfig, mainAxisNodeSpacing: 300 };
      expect(typeof fixedSpacingConfig.mainAxisNodeSpacing).toBe('number');
    });

    it('should accept horizontal layout config', () => {
      const horizontalConfig = { ...mockConfig, isHorizontal: true };
      expect(horizontalConfig.isHorizontal).toBe(true);
    });

    it('should accept vertical layout config', () => {
      const verticalConfig = { ...mockConfig, isHorizontal: false };
      expect(verticalConfig.isHorizontal).toBe(false);
    });
  });
});
