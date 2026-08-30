import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getAreaSize, RefreshQueue } from '../../src/utils';

describe('getAreaSize', () => {
  beforeEach(() => {
    // Clear DOM before each test
    document.body.innerHTML = '';
  });

  it('should return correct dimensions for valid container', () => {
    const container = document.createElement('div');
    container.id = 'test-container';
    // jsdom doesn't run layout, so clientWidth/clientHeight never reflect
    // CSS width/height; stub them directly instead.
    Object.defineProperty(container, 'clientWidth', { value: 800, configurable: true });
    Object.defineProperty(container, 'clientHeight', { value: 600, configurable: true });
    document.body.appendChild(container);

    const result = getAreaSize('test-container');

    expect(result).toEqual({
      areaWidth: 800,
      areaHeight: 600,
    });
  });

  it('should throw error when container element is not found', () => {
    expect(() => getAreaSize('non-existent-id')).toThrow(
      'Cannot find dom element with id:non-existent-id'
    );
  });

  it('should throw error when container has zero width', () => {
    const container = document.createElement('div');
    container.id = 'zero-width-container';
    container.style.width = '0px';
    container.style.height = '600px';
    document.body.appendChild(container);

    expect(() => getAreaSize('zero-width-container')).toThrow(
      "The tree can't be display because the svg height or width of the container is null"
    );
  });

  it('should throw error when container has zero height', () => {
    const container = document.createElement('div');
    container.id = 'zero-height-container';
    container.style.width = '800px';
    container.style.height = '0px';
    document.body.appendChild(container);

    expect(() => getAreaSize('zero-height-container')).toThrow(
      "The tree can't be display because the svg height or width of the container is null"
    );
  });

  it('should throw error when container has both zero dimensions', () => {
    const container = document.createElement('div');
    container.id = 'zero-both-container';
    container.style.width = '0px';
    container.style.height = '0px';
    document.body.appendChild(container);

    expect(() => getAreaSize('zero-both-container')).toThrow();
  });
});

describe('RefreshQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // RefreshQueue keeps its queue/runner as static state shared across every
    // test; a leftover interval from a previous test becomes a dead ID once
    // useRealTimers() swaps the clock out, which silently blocks future
    // add() calls. Reset it directly so each test starts from a clean queue.
    (RefreshQueue as any).queue = [];
    (RefreshQueue as any).runner = 0;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should add a callback to the queue', () => {
    const callback = vi.fn();
    RefreshQueue.add(100, callback);

    // Fast-forward time to trigger immediate execution
    vi.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalled();
  });

  it('should execute callbacks in sequence', () => {
    const callOrder: string[] = [];

    RefreshQueue.add(100, () => {
      callOrder.push('first');
    });
    RefreshQueue.add(100, () => {
      callOrder.push('second');
    });

    vi.advanceTimersByTime(600);

    expect(callOrder).toContain('first');
    expect(callOrder).toContain('second');
  });

  it('should delay callback execution by specified duration', () => {
    // RefreshQueue runs the first callback of an idle queue immediately;
    // only callbacks queued behind a running task are actually delayed.
    // Prime the queue so it's busy before adding the callback under test.
    RefreshQueue.add(50, () => {});

    const callback = vi.fn();
    RefreshQueue.add(300, callback);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(150);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalled();
  });

  it('should handle multiple queued tasks', () => {
    const callbacks = [vi.fn(), vi.fn(), vi.fn()];

    callbacks.forEach((cb) => RefreshQueue.add(50, cb));

    vi.advanceTimersByTime(1000);

    callbacks.forEach((cb) => {
      expect(cb).toHaveBeenCalled();
    });
  });

  it('should handle callback errors gracefully', () => {
    const errorCallback = vi.fn(() => {
      throw new Error('Test error');
    });
    const normalCallback = vi.fn();

    RefreshQueue.add(50, errorCallback);
    RefreshQueue.add(50, normalCallback);

    // Should not throw and should continue to next callback
    expect(() => {
      vi.advanceTimersByTime(500);
    }).not.toThrow();

    expect(normalCallback).toHaveBeenCalled();
  });

  it('should not execute callback more than once', () => {
    const callback = vi.fn();

    RefreshQueue.add(50, callback);

    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
