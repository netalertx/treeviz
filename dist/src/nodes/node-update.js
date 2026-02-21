export const drawNodeUpdate = (nodeEnter, node, settings) => {
    const nodeUpdate = nodeEnter.merge(node);
    nodeUpdate
        //@ts-ignore
        .transition()
        .duration(settings.duration)
        //@ts-ignore
        .attr("transform", (d) => {
        return settings.isHorizontal
            ? "translate(" + d.y + "," + d.x + ")"
            : "translate(" + d.x + "," + d.y + ")";
    });
    nodeUpdate
        .select("foreignObject")
        .attr("width", settings.nodeWidth)
        .attr("height", settings.nodeHeight)
        .style("overflow", "visible")
        .on("click", (_, d) => settings.onNodeClick({ ...d, settings }))
        .on("mouseenter", (_, d) => settings.onNodeMouseEnter({ ...d, settings }))
        .on("mouseleave", (_, d) => settings.onNodeMouseLeave({ ...d, settings }))
        .html((d) => settings.renderNode({ ...d, settings }));
};
//# sourceMappingURL=node-update.js.map