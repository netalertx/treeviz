import { select } from "d3-selection";
import { generateLinkLayout } from "./draw-links";
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
    });
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
            .attr("pointer-events", "none");
        // Update all labels
        labelsEnter.merge(labels)
            .attr("x", function (d) {
            if (settings.isHorizontal) {
                return d.parent.y + (d.y - d.parent.y) - settings.nodeWidth / 4;
            }
            else {
                return d.parent.x + (d.x - d.parent.x) + settings.nodeWidth / 2;
            }
        })
            .attr("y", function (d) {
            // Position closer to child node (75% of the way)
            if (settings.isHorizontal) {
                return d.parent.x + (d.x - d.parent.x) + settings.nodeHeight / 2;
            }
            else {
                return d.parent.y + (d.y - d.parent.y) - settings.nodeHeight / 2;
            }
        })
            .html(function (d) {
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
            return settings.linkLabel.render(parentNodeData, childNodeData);
        });
    }
};
//# sourceMappingURL=link-update.js.map