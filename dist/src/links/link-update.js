import { generateLinkLayout } from "./draw-links";
const getLabelOffset = (linkShape, isHorizontal) => {
    // For quadraticBeziers, the curve bulges outward, so we need to offset the label
    if (linkShape === "quadraticBeziers") {
        return isHorizontal ? 0 : 20;
    }
    return 0;
};
const getScreenPosition = (svgX, svgY, svgElement, transformGroup) => {
    // Create a point in SVG coordinate space
    const pt = svgElement.createSVGPoint();
    pt.x = svgX;
    pt.y = svgY;
    // Get the cumulative transform from the main group
    const matrix = transformGroup.getScreenCTM();
    if (matrix) {
        const screenPt = pt.matrixTransform(matrix);
        return { x: screenPt.x, y: screenPt.y };
    }
    return { x: svgX, y: svgY };
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
    });
    // Add/update link labels if configured
    if (settings.linkLabel) {
        // Get the SVG and main transform group
        const svgElement = linkUpdate.node()?.ownerSVGElement;
        const mainG = linkUpdate.node()?.parentElement?.parentElement;
        if (!svgElement || !mainG)
            return;
        // Get or create labels container div
        let labelsContainer = document.querySelector(".treeviz-labels-container");
        if (!labelsContainer) {
            labelsContainer = document.createElement("div");
            labelsContainer.className = "treeviz-labels-container";
            labelsContainer.style.position = "fixed";
            labelsContainer.style.top = "0";
            labelsContainer.style.left = "0";
            labelsContainer.style.pointerEvents = "none";
            document.body.appendChild(labelsContainer);
        }
        // Data join for labels
        const labelElements = labelsContainer.querySelectorAll(".link-label");
        const data = linkUpdate.data();
        // Remove extra labels
        for (let i = data.length; i < labelElements.length; i++) {
            labelElements[i].remove();
        }
        // Update/create labels
        data.forEach((d, i) => {
            // Calculate position in SVG space
            const offset = getLabelOffset(settings.linkShape || "quadraticBeziers", settings.isHorizontal);
            let svgX, svgY;
            if (settings.isHorizontal) {
                svgX = d.parent.y + (d.y - d.parent.y) - settings.nodeWidth / 4 + offset;
                svgY = d.parent.x + (d.x - d.parent.x) + settings.nodeHeight / 2;
            }
            else {
                svgX = d.parent.x + (d.x - d.parent.x) + settings.nodeWidth / 2;
                svgY = d.parent.y + (d.y - d.parent.y) - settings.nodeHeight / 2 + offset;
            }
            // Convert to screen coordinates
            const screenPos = getScreenPosition(svgX, svgY, svgElement, mainG);
            // Get or create label element
            let labelEl = labelElements[i];
            if (!labelEl) {
                labelEl = document.createElement("div");
                labelEl.className = "link-label";
                labelEl.style.position = "absolute";
                labelEl.style.transform = "translate(-50%, -50%)";
                labelEl.style.whiteSpace = "nowrap";
                labelEl.style.pointerEvents = "none";
                labelEl.style.opacity = "0";
                labelEl.style.transition = `opacity 300ms ease-in-out`;
                labelEl.style.color = settings.linkLabel.color || "#000000";
                labelEl.style.fontSize = (settings.linkLabel.fontSize || 12) + "px";
                labelsContainer.appendChild(labelEl);
            }
            // Render label content
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
            labelEl.innerHTML = result;
            // Position and animate
            labelEl.style.left = screenPos.x + "px";
            labelEl.style.top = screenPos.y + "px";
            // Delay fade-in after link animation
            setTimeout(() => {
                labelEl.style.opacity = "1";
            }, settings.duration);
        });
    }
};
//# sourceMappingURL=link-update.js.map