import { useState, useEffect } from 'react';

const usePagination = <T>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [totalNumbersToShow, setTotalNumbersToShow] = useState(5); // Default value

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const getTotalNumbersToShowFromCSS = () => {
      if (windowWidth < 600) {
        return 3; // Show fewer pages on small screens
      } else if (windowWidth < 900) {
        return 4; // Show more pages on medium screens
      } else {
        return 5; // Show most pages on larger screens
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setTotalNumbersToShow(getTotalNumbersToShowFromCSS());
    };

    // Initial setup
    handleResize();

    // Update on window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]); // Depend on windowWidth for changes

  const paginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPaginationRange = () => {
    const visiblePages = Math.floor(totalNumbersToShow / 2);
    const range: (number | string)[] = [];

    const shouldShowLeftEllipsis = currentPage > visiblePages + 2;
    const shouldShowRightEllipsis = currentPage < totalPages - visiblePages - 1;

    range.push(1);

    if (shouldShowLeftEllipsis) {
      range.push('...');
    }

    for (
      let i = Math.max(2, currentPage - visiblePages);
      i <= Math.min(totalPages - 1, currentPage + visiblePages);
      i++
    ) {
      range.push(i);
    }

    if (shouldShowRightEllipsis) {
      range.push('...');
    }

    range.push(totalPages);

    return Array.from(new Set(range));
  };

  return {
    currentPage,
    totalPages,
    paginatedItems: paginatedItems(),
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPaginationRange,
  };
};

export default usePagination;
