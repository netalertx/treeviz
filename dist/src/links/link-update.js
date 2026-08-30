import { select } from "d3-selection";
import { generateLinkLayout } from "./draw-links";
import { getLinkCap, getLinkDashArray } from "./link-style";
const getLabelOffset = (linkShape, isHorizontal) => {
    // For quadraticBeziers, the curve bulges outward, so we need to offset the label
    // to position it closer to where the actual curve is
    if (linkShape === "quadraticBeziers") {
        // For horizontal layout, offset on perpendicular axis
        // For vertical layout, offset on perpendicular axis
        return isHorizontal ? 0 : 20; // Adjust label position perpendicular to main axis
    }
    return 0;
};
export const drawLinkUpdate = (linkEnter, link, settings) => {
    const linkUpdate = linkEnter.merge(link);
    linkUpdate
        //@ts-ignore
        .transition()
        .duration(settings.duration)
        .attr("d", (d) => {
        return generateLinkLayout(d, d.parent, settings);
    })
        .attr("fill", "none")
        .attr("stroke-width", (d) => {
        return settings.linkWidth(d);
    })
        .attr("stroke", (d) => {
        return settings.linkColor(d);
    })
        .attr("stroke-dasharray", (d) => getLinkDashArray(settings.linkStyle?.(d), settings.linkWidth(d)))
        .attr("stroke-linecap", (d) => getLinkCap(settings.linkStyle?.(d)));
    // Add/update link labels if configured
    if (settings.linkLabel) {
        const labelsGroup = linkUpdate.node()?.parentNode;
        const d3Selection = select(labelsGroup);
        // Bind label data to links
        const labels = d3Selection
            .selectAll("text.link-label")
            .data(linkUpdate.data(), (_d, i) => `link-label-${i}`);
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
            .attr("opacity", 0); // Start invisible for fade-in
        // Update all labels
        labelsEnter.merge(labels)
            .attr("x", function (d) {
            const offset = getLabelOffset(settings.linkShape || "quadraticBeziers", settings.isHorizontal);
            if (settings.isHorizontal) {
                // For horizontal, adjust x to center on the curve
                return d.parent.y + (d.y - d.parent.y) - settings.nodeWidth / 4 + offset;
            }
            else {
                return d.parent.x + (d.x - d.parent.x) + settings.nodeWidth / 2;
            }
        })
            .attr("y", function (d) {
            // Position closer to child node (75% of the way)
            const offset = getLabelOffset(settings.linkShape || "quadraticBeziers", settings.isHorizontal);
            if (settings.isHorizontal) {
                return d.parent.x + (d.x - d.parent.x) + settings.nodeHeight / 2;
            }
            else {
                // For vertical, adjust y to center on the curve
                return d.parent.y + (d.y - d.parent.y) - settings.nodeHeight / 2 + offset;
            }
        })
            .text("") // Clear existing content
            .each(function (d) {
            // Render the label text - parent is the source, d is the child/target
            const parentNodeData = {
                ...d.parent,
                data: d.parent.data,
                settings: settings,
            };
            const childNodeData = {
                ...d,
                data: d.data,
                settings: settings,
            };
            const result = settings.linkLabel.render(parentNodeData, childNodeData);
            // Set plain text label
            select(this).text(result);
        })
            //@ts-ignore
            .transition()
            .delay(settings.duration) // Wait for link animation to finish
            .duration(300) // Fade-in duration
            .attr("opacity", 1); // Fade in to visible
    }
};
//# sourceMappingURL=link-update.js.map