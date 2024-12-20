import { Repository, } from 'typeorm';
import { createPaginationObject } from './create-pagination';
import { PaginationTypeEnum } from './interface';
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
function resolveOptions(options) {
    const { page, pageSize, paginationType } = options;
    return [
        page || DEFAULT_PAGE,
        pageSize || DEFAULT_LIMIT,
        paginationType || PaginationTypeEnum.TAKE_AND_SKIP,
    ];
}
async function paginateRepository(repository, options, searchOptions) {
    const [page, limit] = resolveOptions(options);
    const promises = [
        repository.find({
            skip: limit * (page - 1),
            take: limit,
            ...searchOptions,
        }),
        repository.count(searchOptions),
    ];
    const [items, total] = await Promise.all(promises);
    return createPaginationObject({
        items,
        totalItems: total,
        currentPage: page,
        limit,
    });
}
async function paginateQueryBuilder(queryBuilder, options) {
    const [page, limit, paginationType] = resolveOptions(options);
    if (paginationType === PaginationTypeEnum.TAKE_AND_SKIP)
        queryBuilder.take(limit).skip((page - 1) * limit);
    else
        queryBuilder.limit(limit).offset((page - 1) * limit);
    const [items, total] = await queryBuilder.getManyAndCount();
    return createPaginationObject({
        items,
        totalItems: total,
        currentPage: page,
        limit,
    });
}
export async function paginateRaw(queryBuilder, options) {
    const [page, limit, paginationType] = resolveOptions(options);
    const promises = [
        (paginationType === PaginationTypeEnum.LIMIT_AND_OFFSET
            ? queryBuilder.limit(limit).offset((page - 1) * limit)
            : queryBuilder.take(limit).skip((page - 1) * limit)).getRawMany(),
        queryBuilder.getCount(),
    ];
    const [items, total] = await Promise.all(promises);
    return createPaginationObject({
        items,
        totalItems: total,
        currentPage: page,
        limit,
    });
}
export async function paginateRawAndEntities(queryBuilder, options) {
    const [page, limit, paginationType] = resolveOptions(options);
    const promises = [
        (paginationType === PaginationTypeEnum.LIMIT_AND_OFFSET
            ? queryBuilder.limit(limit).offset((page - 1) * limit)
            : queryBuilder.take(limit).skip((page - 1) * limit)).getRawAndEntities(),
        queryBuilder.getCount(),
    ];
    const [itemObject, total] = await Promise.all(promises);
    return [
        createPaginationObject({
            items: itemObject.entities,
            totalItems: total,
            currentPage: page,
            limit,
        }),
        itemObject.raw,
    ];
}
export async function paginate(repositoryOrQueryBuilder, options, searchOptions) {
    return repositoryOrQueryBuilder instanceof Repository
        ? paginateRepository(repositoryOrQueryBuilder, options, searchOptions)
        : paginateQueryBuilder(repositoryOrQueryBuilder, options);
}
//# sourceMappingURL=index.js.map