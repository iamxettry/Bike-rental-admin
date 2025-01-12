import { useStore } from "@/store/store";

const usePagination = (totalItems = 5) => {
  const { setOffset, currentPage, setCurrentPage } = useStore();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * itemsPerPage);
  };
  return {
    currentPage: currentPage,
    totalPages: totalPages,
    startIndex: startIndex,
    endIndex: endIndex,
    totalItems: totalItems,
    handlePageChange: handlePageChange,
    getPageNumbers: getPageNumbers,
  };
};

export default usePagination;
