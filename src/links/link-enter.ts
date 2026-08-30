import { HierarchyPointNode } from "d3-hierarchy";
import { BaseType, Selection } from "d3-selection";
import { ExtendedHierarchyPointNode, ITreeConfig } from "../typings";
import { getFirstDisplayedAncestor } from "../utils";
import { generateLinkLayout } from "./draw-links";
import { getLinkCap, getLinkDashArray } from "./link-style";

export const drawLinkEnter = <T>(
  link: Selection<BaseType, HierarchyPointNode<{}>, SVGGElement, {}>,
  settings: ITreeConfig<T>,
  nodes: ExtendedHierarchyPointNode[],
  oldNodes: ExtendedHierarchyPointNode[]
) =>
  link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("d", (d: any) => {
      const firstDisplayedParentNode = getFirstDisplayedAncestor(
        nodes,
        oldNodes,
        d.id
      );
      const o = {
        x: firstDisplayedParentNode.x0,
        y: firstDisplayedParentNode.y0,
      };
      return generateLinkLayout(o, o, settings);
    })
    .attr("fill", "none")
    .attr("stroke-width", (d: any) => 
      settings.linkWidth(d) // Pass the correct `d` object to linkWidth
    )
    .attr("stroke", (d: any) =>
      settings.linkColor(d) // Pass the correct `d` object to linkColor
    )
    .attr("stroke-dasharray", (d: any) =>
      getLinkDashArray(settings.linkStyle?.(d), settings.linkWidth(d))
    )
    .attr("stroke-linecap", (d: any) => getLinkCap(settings.linkStyle?.(d)));
