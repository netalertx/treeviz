import { LinkStyle } from "../typings";

// Returns an SVG stroke-dasharray value scaled to the link's stroke width,
// or null for a solid line (no dasharray attribute needed).
export const getLinkDashArray = (
  style: LinkStyle | undefined,
  linkWidth: number
): string | null => {
  switch (style) {
    case "dashed":
      return `${linkWidth * 2},${linkWidth * 1.2}`;
    case "dotted":
      return `${linkWidth * 0.1},${linkWidth * 1.5}`;
    case "dashdot":
      return `${linkWidth * 2},${linkWidth * 1.2},${linkWidth * 0.1},${linkWidth * 1.2}`;
    case "solid":
    default:
      return null;
  }
};

export const getLinkCap = (style: LinkStyle | undefined): string =>
  style === "dotted" || style === "dashdot" ? "round" : "butt";
