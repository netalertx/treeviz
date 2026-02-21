import { describe, it, expect } from 'vitest';
import { setNodeLocation } from '../../src/utils';
import { ITreeConfig } from '../../src/typings';

describe('setNodeLocation', () => {
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

  it('should return correct translate string for horizontal layout', () => {
    const result = setNodeLocation(50, 100, mockConfig);
    expect(result).toBe('translate(100,50)');
  });

  it('should return correct translate string for vertical layout', () => {
    const verticalConfig = { ...mockConfig, isHorizontal: false };
    const result = setNodeLocation(50, 100, verticalConfig);
    expect(result).toBe('translate(50,100)');
  });

  it('should handle zero coordinates', () => {
    const result = setNodeLocation(0, 0, mockConfig);
    expect(result).toBe('translate(0,0)');
  });

  it('should handle negative coordinates', () => {
    const result = setNodeLocation(-50, -100, mockConfig);
    expect(result).toBe('translate(-100,-50)');
  });

  it('should handle large coordinates', () => {
    const result = setNodeLocation(5000, 10000, mockConfig);
    expect(result).toBe('translate(10000,5000)');
  });
});
