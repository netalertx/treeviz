import { getFirstDisplayedAncestor, setNodeLocation } from "../utils";
export const drawNodeEnter = (node, settings, // Add the generic argument <T>
nodes, oldNodes) => {
    const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        // @ts-ignore
        .attr("id", (d) => d?.id)
        .attr("transform", (d) => {
        const firstDisplayedParentNode = getFirstDisplayedAncestor(nodes, oldNodes, d.id);
        return setNodeLocation(firstDisplayedParentNode.x0, firstDisplayedParentNode.y0, settings);
    });
    nodeEnter
        .append("foreignObject")
        .attr("width", settings.nodeWidth)
        .attr("height", settings.nodeHeight);
    return nodeEnter;
};
//# sourceMappingURL=node-enter.js.map