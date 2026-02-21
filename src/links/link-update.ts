import { HierarchyPointNode } from "d3-hierarchy";
import { Selection, select } from "d3-selection";
import { ITreeConfig, NodeData } from "../typings";
import { generateLinkLayout } from "./draw-links";

const processLabelNode = (node: any, textElement: any) => {
  if (node.nodeType === 3) {  // Text node
    const text = node.textContent?.trim();
    if (text) {
      textElement.append("tspan").text(text);
    }
  } else if (node.nodeType === 1) {  // Element node
    if (node.tagName === "TSPAN" || node.tagName === "tspan") {
      const tspan = textElement.append("tspan").text(node.textContent?.trim() || "");
      if (node.getAttribute("dy")) {
        tspan.attr("dy", node.getAttribute("dy"));
      }
    } else if (node.tagName === "STRONG" || node.tagName === "strong") {
      textElement.append("tspan").attr("font-weight", "bold").text(node.textContent?.trim() || "");
    } else if (node.tagName === "I" || node.tagName === "i") {
      textElement.append("tspan").attr("font-style", "italic").text(node.textContent?.trim() || "");
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        processLabelNode(node.childNodes[i], textElement);
      }
    }
  }
};

const getLabelOffset = (linkShape: string, isHorizontal: boolean) => {
  // For quadraticBeziers, the curve bulges outward, so we need to offset the label
  // to position it closer to where the actual curve is
  if (linkShape === "quadraticBeziers") {
    // For horizontal layout, offset on perpendicular axis
    // For vertical layout, offset on perpendicular axis
    return isHorizontal ? 0 : 20;  // Adjust label position perpendicular to main axis
  }
  return 0;
};

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
      .attr("pointer-events", "none")
      .attr("opacity", 0);  // Start invisible for fade-in

    // Update all labels
    labelsEnter.merge(labels as any)
      .attr("x", function (d: any) {
        const offset = getLabelOffset(settings.linkShape || "quadraticBeziers", settings.isHorizontal);
        if (settings.isHorizontal) {
          // For horizontal, adjust x to center on the curve
          return d.parent.y + (d.y - d.parent.y) - settings.nodeWidth / 4 + offset;
        } else {
          return d.parent.x + (d.x - d.parent.x) + settings.nodeWidth / 2;
        }
      })
      .attr("y", function (d: any) {
        // Position closer to child node (75% of the way)
        const offset = getLabelOffset(settings.linkShape || "quadraticBeziers", settings.isHorizontal);
        if (settings.isHorizontal) {
          return d.parent.x + (d.x - d.parent.x) + settings.nodeHeight / 2;
        } else {
          // For vertical, adjust y to center on the curve
          return d.parent.y + (d.y - d.parent.y) - settings.nodeHeight / 2 + offset;
        }
      })
      .text("")  // Clear existing content
      .each(function (d: any) {
        // Clear any existing tspans
        select(this).selectAll("tspan").remove();
        
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
        const result = settings.linkLabel!.render(parentNodeData, childNodeData);
        
        // Get the text element
        const textElement = select(this);
        
        // Check if result contains HTML/tspan markup
        if (result.includes("<tspan") || result.includes("<strong") || result.includes("<i>")) {
          // Parse HTML-like content and create tspan elements
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(`<root>${result}</root>`, "text/xml");
          processLabelNode(xmlDoc.documentElement, textElement);
        } else {
          // Plain text - just add it directly
          textElement.text(result);
        }
      })
      //@ts-ignore
      .transition()
      .delay(settings.duration)  // Wait for link animation to finish
      .duration(300)  // Fade-in duration
      .attr("opacity", 1);  // Fade in to visible
  }
};
