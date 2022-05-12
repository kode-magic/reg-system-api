export const paginateData = (items: any, page = 1, pageSize = 5) => {

    const pager = paginate(items.length, page, pageSize);
    
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    return {pager, pageOfItems}
}

const paginate = (totalItems: number, currentPage: number, pageSize: number, maxPages = 10) => {
    const totalPages = Math.ceil(totalItems / pageSize);


    let startPage = currentPage - Math.floor(maxPages / 2);
    let endPage = (currentPage +  Math.floor(maxPages / 2)) - 1;

    if (startPage < 1) {
        startPage = 1;
        endPage = maxPages;
    }

    if (endPage > totalPages) {
        startPage = totalPages - (maxPages - 1);
        
        endPage = totalPages;

        if (startPage < 1) {
            startPage = 1;
        }
    }


    let pages = [];

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex: totalPages > 0 ? (currentPage * pageSize) - pageSize : 0,
        endIndex: totalPages > 0 ? (currentPage * pageSize) - 1 : 0,
        pages
    }
}