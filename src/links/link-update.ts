import { HierarchyPointNode } from "d3-hierarchy";
import { Selection, select } from "d3-selection";
import { ITreeConfig, NodeData } from "../typings";
import { generateLinkLayout } from "./draw-links";

export const drawLinkUpdate = <T>(
  linkEnter: Selection<SVGPathElement, HierarchyPointNode<{}>, SVGGElement, {}>,
  link: Selection<SVGPathElement, HierarchyPointNode<{}>, SVGGElement, {}>,
  settings: ITreeConfig<T>
) => {
  const linkUpdate = linkEnter.merge(link);

  linkUpdate
    //@ts-ignore
    .transition()
    .duration(settings.duration)
    .attr("d", (d: any) => {
      return generateLinkLayout(d, d.parent, settings);
    })
    .attr("fill", "none")
    .attr("stroke-width", (d: any) => {
      return settings.linkWidth(d);
    })
    .attr("stroke", (d: any) => {
      return settings.linkColor(d);
    });

  // Add/update link labels if configured
  if (settings.linkLabel) {
    const labelsGroup = linkUpdate.node()?.parentNode as SVGGElement;
    const d3Selection = select(labelsGroup);

    // Bind label data to links
    const labels = d3Selection
      .selectAll("text.link-label")
      .data(linkUpdate.data(), (_d: any, i: number) => `link-label-${i}`);

    // Remove old labels
    labels.exit().remove();

    // Enter new labels
    const labelsEnter = labels
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", settings.linkLabel.color || "#000000")
      .attr("font-size", settings.linkLabel.fontSize || 12)
      .attr("pointer-events", "none");

    // Update all labels
    labelsEnter.merge(labels as any)
      .attr("x", function (d: any) {
        if (settings.isHorizontal) {
          return d.parent.y + (d.y - d.parent.y) - settings.nodeWidth / 4;
        } else {
          return d.parent.x + (d.x - d.parent.x) + settings.nodeWidth / 2;
        }
      })
      .attr("y", function (d: any) {
        // Position closer to child node (75% of the way)
        if (settings.isHorizontal) {
          return d.parent.x + (d.x - d.parent.x) + settings.nodeHeight / 2;
        } else {
          return d.parent.y + (d.y - d.parent.y)  - settings.nodeHeight / 2;
        }
      })
      .html(function (d: any) {
        // Render the label text - parent is the source, d is the child/target
        const parentNodeData: NodeData<T> = {
          ...d.parent,
          data: (d.parent as any).data,
          settings: settings,
        };
        const childNodeData: NodeData<T> = {
          ...d,
          data: d.data,
          settings: settings,
        };
        return settings.linkLabel!.render(parentNodeData, childNodeData);
      });
  }
};
