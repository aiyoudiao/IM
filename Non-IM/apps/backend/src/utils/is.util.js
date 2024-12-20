/** 判断是否外链 */
export function isExternal(path) {
    return /^(?:https?:|mailto:|tel:)/.test(path);
}
//# sourceMappingURL=is.util.js.map