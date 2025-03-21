export function list2Tree(items, parentId = null) {
    return items
        .filter(item => item.parentId === parentId)
        .map((item) => {
        const children = list2Tree(items, item.id);
        return {
            ...item,
            ...(children.length ? { children } : null),
        };
    });
}
/**
 * 过滤树，返回列表数据
 * @param treeData
 * @param key 用于过滤的字段
 * @param value 用于过滤的值
 */
export function filterTree2List(treeData, key, value) {
    const filterChildrenTree = (resTree, treeItem) => {
        if (treeItem[key].includes(value)) {
            resTree.push(treeItem);
            return resTree;
        }
        if (Array.isArray(treeItem.children)) {
            const children = treeItem.children.reduce(filterChildrenTree, []);
            const data = { ...treeItem, children };
            if (children.length)
                resTree.push({ ...data });
        }
        return resTree;
    };
    return treeData.reduce(filterChildrenTree, []);
}
/**
 * 过滤树，并保留原有的结构
 * @param treeData
 * @param predicate
 */
export function filterTree(treeData, predicate) {
    function filter(treeData) {
        if (!treeData?.length)
            return treeData;
        return treeData.filter((data) => {
            if (!predicate(data))
                return false;
            data.children = filter(data.children);
            return true;
        });
    }
    return filter(treeData) || [];
}
export function deleteEmptyChildren(arr) {
    arr?.forEach((node) => {
        if (node.children?.length === 0)
            delete node.children;
        else
            deleteEmptyChildren(node.children);
    });
}
//# sourceMappingURL=list2tree.util.js.map