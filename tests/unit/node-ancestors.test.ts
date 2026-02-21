import { describe, it, expect } from 'vitest';
import { getFirstDisplayedAncestor } from '../../src/utils';
import { ExtendedHierarchyPointNode } from '../../src/typings';

// Mock D3 hierarchy nodes
function createMockNode(
  id: string,
  ancestorIds: string[] = []
): ExtendedHierarchyPointNode {
  const node = {
    id,
    x0: 0,
    y0: 0,
    // Mock the ancestors() method
    ancestors: () => {
      // Return nodes in order: self, immediate parent, grandparent, etc.
      const ancestors: any[] = [node];
      for (const ancestorId of ancestorIds) {
        ancestors.push(
          createMockNode(ancestorId, ancestorIds.slice(ancestorIds.indexOf(ancestorId) + 1))
        );
      }
      return ancestors;
    },
  } as any as ExtendedHierarchyPointNode;

  return node;
}

describe('getFirstDisplayedAncestor', () => {
  it('should return parent node when it is in viewableNodes', () => {
    const parentNode = createMockNode('2', ['root']);
    const currentNode = createMockNode('3', ['2', 'root']);

    const ghostNodes = [parentNode, currentNode];
    const viewableNodes = [parentNode];

    const result = getFirstDisplayedAncestor(ghostNodes, viewableNodes, '3');

    expect(result.id).toBe('2');
  });

  it('should return the node itself if found in ghostNodes on error', () => {
    const node = createMockNode('1');

    const result = getFirstDisplayedAncestor([node], [], '1');

    expect(result.id).toBe('1');
  });

  it('should find node in ghostNodes array', () => {
    const node1 = createMockNode('1');
    const node2 = createMockNode('2', ['1']);

    const ghostNodes = [node1, node2];

    const result = getFirstDisplayedAncestor(ghostNodes, [], '2');

    expect(result).toBeDefined();
  });

  it('should handle multiple nodes in arrays', () => {
    const parentNode = createMockNode('2', ['root']);
    const currentNode = createMockNode('3', ['2', 'root']);
    const otherNode = createMockNode('4', ['root']);

    const ghostNodes = [parentNode, currentNode, otherNode];
    const viewableNodes = [parentNode, otherNode];

    const result = getFirstDisplayedAncestor(ghostNodes, viewableNodes, '3');

    expect(result.id).toBe('2');
  });

  it('should return the node if it cannot find ancestors', () => {
    const node = createMockNode('orphan');
    const ghostNodes = [node];

    const result = getFirstDisplayedAncestor(ghostNodes, [], 'orphan');

    expect(result.id).toBe('orphan');
  });
});
