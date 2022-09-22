export const getPageAmount = (count, pageSize) => Math.ceil(count / pageSize) || 1;
