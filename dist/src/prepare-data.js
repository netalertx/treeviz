import d3 from "./d3";
import { getAreaSize } from "./utils";
export const generateNestedData = (data, treeConfig) => {
    const { idKey, relationnalField, hasFlatData } = treeConfig;
    return hasFlatData
        ? d3
            .stratify()
            .id((d) => d[idKey])
            .parentId((d) => d[relationnalField])(data)
        : d3.hierarchy(data, d => d[relationnalField]);
};
export const generateBasicTreemap = (treeConfig) => {
    const { areaHeight, areaWidth } = getAreaSize(treeConfig.htmlId);
    return treeConfig.mainAxisNodeSpacing === "auto" && treeConfig.isHorizontal
        ? d3
            .tree()
            .size([
            areaHeight - treeConfig.nodeHeight,
            areaWidth - treeConfig.nodeWidth,
        ])
        : treeConfig.mainAxisNodeSpacing === "auto" && !treeConfig.isHorizontal
            ? d3
                .tree()
                .size([
                areaWidth - treeConfig.nodeWidth,
                areaHeight - treeConfig.nodeHeight,
            ])
            : treeConfig.isHorizontal === true
                ? d3
                    .tree()
                    .nodeSize([
                    treeConfig.nodeHeight * treeConfig.secondaryAxisNodeSpacing,
                    treeConfig.nodeWidth,
                ])
                : d3
                    .tree()
                    .nodeSize([
                    treeConfig.nodeWidth * treeConfig.secondaryAxisNodeSpacing,
                    treeConfig.nodeHeight,
                ]);
};
//# sourceMappingURL=prepare-data.js.map