import { Pagination } from './pagination';
export function createPaginationObject({ items, totalItems, currentPage, limit, }) {
    const totalPages = totalItems !== undefined ? Math.ceil(totalItems / limit) : undefined;
    const meta = {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage,
    };
    return new Pagination(items, meta);
}
//# sourceMappingURL=create-pagination.js.map