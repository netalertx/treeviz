import { initiliazeSVG } from "./initializeSVG";
import { drawLinkEnter } from "./links/link-enter";
import { drawLinkExit } from "./links/link-exit";
import { drawLinkUpdate } from "./links/link-update";
import { drawNodeEnter } from "./nodes/node-enter";
import { drawNodeExit } from "./nodes/node-exit";
import { drawNodeUpdate } from "./nodes/node-update";
import { generateBasicTreemap, generateNestedData } from "./prepare-data";
import { RefreshQueue } from "./utils";
export const Treeviz = {
    create,
};
// Make sure Treeviz is available in vanilla JS
if (typeof window !== "undefined") {
    window.Treeviz = Treeviz;
}
export function create(userSettings) {
    const defaultSettings = {
        data: [],
        htmlId: "",
        idKey: "id",
        relationnalField: "father",
        hasFlatData: true,
        nodeWidth: 160,
        nodeHeight: 100,
        mainAxisNodeSpacing: 300,
        renderNode: () => "Node",
        linkColor: () => "#ffcc80",
        linkWidth: () => 10,
        linkShape: "quadraticBeziers",
        isHorizontal: true,
        hasPan: false,
        hasZoom: false,
        duration: 600,
        onNodeClick: () => undefined,
        onNodeMouseEnter: () => undefined,
        onNodeMouseLeave: () => undefined,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        secondaryAxisNodeSpacing: 1.25,
    };
    // @ts-ignore
    let settings = {
        ...defaultSettings,
        ...userSettings,
    };
    let oldNodes = [];
    function draw(svg, computedTree) {
        const nodes = computedTree.descendants();
        const links = computedTree.descendants().slice(1);
        const { mainAxisNodeSpacing: mainAxisNodeSpacing } = settings;
        if (mainAxisNodeSpacing !== "auto") {
            // Normalize for fixed-depth.
            nodes.forEach((d) => {
                d.y = d.depth * settings.nodeWidth * mainAxisNodeSpacing;
            });
        }
        nodes.forEach((currentNode) => {
            const currentNodeOldPosition = oldNodes.find((node) => node.id === currentNode.id);
            currentNode.x0 = currentNodeOldPosition
                ? currentNodeOldPosition.x0
                : currentNode.x;
            currentNode.y0 = currentNodeOldPosition
                ? currentNodeOldPosition.y0
                : currentNode.y;
        });
        // ****************** Nodes section ***************************
        const node = svg.selectAll("g.node").data(nodes, (d) => {
            return d[settings.idKey];
        });
        const nodeEnter = drawNodeEnter(node, settings, nodes, oldNodes);
        //@ts-ignore
        drawNodeUpdate(nodeEnter, node, settings);
        drawNodeExit(node, settings, nodes, oldNodes);
        // ****************** links section ***************************
        const link = svg.selectAll("path.link").data(links, (d) => {
            return d.id;
        });
        const linkEnter = drawLinkEnter(link, settings, nodes, oldNodes);
        // @ts-ignore
        drawLinkUpdate(linkEnter, link, settings);
        drawLinkExit(link, settings, nodes, oldNodes);
        oldNodes = [...nodes];
    }
    function refresh(data, newSettings) {
        RefreshQueue.add(settings.duration, () => {
            if (newSettings) {
                settings = { ...settings, ...newSettings };
            }
            const nestedData = generateNestedData(data, settings);
            const treemap = generateBasicTreemap(settings);
            const computedTree = treemap(nestedData); // mutation
            // @ts-ignore
            draw(svg, computedTree);
        });
    }
    function clean(keepConfig) {
        const myNode = keepConfig
            ? document.querySelector(`#${settings.htmlId} svg g`)
            : document.querySelector(`#${settings.htmlId}`);
        if (myNode) {
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }
        oldNodes = [];
    }
    const treeObject = { refresh, clean };
    const svg = initiliazeSVG(settings);
    return treeObject;
}
//# sourceMappingURL=index.js.map