import { getFirstDisplayedAncestor } from "../utils";
import { generateLinkLayout } from "./draw-links";
export const drawLinkExit = (link, settings, // Specify the generic argument <T>
nodes, oldNodes) => {
    link
        .exit()
        //@ts-ignore
        .transition()
        .duration(settings.duration)
        .style("opacity", 0)
        .attr("d", (d) => {
        const firstDisplayedParentNode = getFirstDisplayedAncestor(oldNodes, nodes, d.id);
        const o = {
            x: firstDisplayedParentNode.x0,
            y: firstDisplayedParentNode.y0,
        };
        return generateLinkLayout(o, o, settings);
    })
        .remove();
};
//# sourceMappingURL=link-exit.js.map