import { getFirstDisplayedAncestor } from "../utils";
import { generateLinkLayout } from "./draw-links";
export const drawLinkEnter = (link, settings, nodes, oldNodes) => link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("d", (d) => {
    const firstDisplayedParentNode = getFirstDisplayedAncestor(nodes, oldNodes, d.id);
    const o = {
        x: firstDisplayedParentNode.x0,
        y: firstDisplayedParentNode.y0,
    };
    return generateLinkLayout(o, o, settings);
})
    .attr("fill", "none")
    .attr("stroke-width", (d) => settings.linkWidth(d) // Pass the correct `d` object to linkWidth
)
    .attr("stroke", (d) => settings.linkColor(d) // Pass the correct `d` object to linkColor
);
//# sourceMappingURL=link-enter.js.map