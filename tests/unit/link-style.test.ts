import { describe, it, expect } from 'vitest';
import { getLinkCap, getLinkDashArray } from '../../src/links/link-style';

describe('getLinkDashArray', () => {
  it('returns null for solid links', () => {
    expect(getLinkDashArray('solid', 10)).toBeNull();
  });

  it('returns null when no style is provided', () => {
    expect(getLinkDashArray(undefined, 10)).toBeNull();
  });

  it('scales the dashed pattern with link width', () => {
    expect(getLinkDashArray('dashed', 10)).toBe('20,12');
    expect(getLinkDashArray('dashed', 5)).toBe('10,6');
  });

  it('scales the dotted pattern with link width', () => {
    expect(getLinkDashArray('dotted', 10)).toBe('1,15');
  });

  it('scales the dashdot pattern with link width', () => {
    expect(getLinkDashArray('dashdot', 10)).toBe('20,12,1,12');
  });
});

describe('getLinkCap', () => {
  it('is round for dotted and dashdot links', () => {
    expect(getLinkCap('dotted')).toBe('round');
    expect(getLinkCap('dashdot')).toBe('round');
  });

  it('is butt for solid and dashed links', () => {
    expect(getLinkCap('solid')).toBe('butt');
    expect(getLinkCap('dashed')).toBe('butt');
    expect(getLinkCap(undefined)).toBe('butt');
  });
});
