// useContentManager.ts
import { useMemo, useState } from 'react';
import { Content } from '../contexts/ContentContext';

interface SortConfig {
  key: keyof Content | null;
  direction: 'ascending' | 'descending';
}

interface ContentManagerResult {
  processedData: Content[];
  totalItems: number;
  currentView: 'main' | 'search' | 'filtered';
  dataTransformers: {
    handleSort: (key: keyof Content) => void;
    handleFilter: (filter: string) => void;
    handleSearch: (searchTerm: string) => void;
  };
  sortConfig: SortConfig;
}

export const useContentManager = (
  content: Content[],
  searchResults: Content[],
  itemsPerPage: number,
  currentPage: number
): ContentManagerResult => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Step 1: Determine base dataset
  const baseData = useMemo(() => {
    return searchTerm ? searchResults : content;
  }, [content, searchResults, searchTerm]);

  // Step 2: Apply sorting to full dataset
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return baseData;

    return [...baseData].sort((a, b) => {
      const aValue = (a[sortConfig.key as keyof Content] as string) ?? '';
      const bValue = (b[sortConfig.key as keyof Content] as string) ?? '';

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [baseData, sortConfig]);

  // Step 3: Apply filtering
  const filteredData = useMemo(() => {
    if (!activeFilter) return sortedData;

    return sortedData.filter(
      (item) => item.uploadStatus?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [sortedData, activeFilter]);

  // Step 4: Apply pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // Handlers
  const handleSort = (key: keyof Content) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Determine current view for UI state
  const currentView = useMemo(() => {
    if (activeFilter) return 'filtered';
    if (searchTerm) return 'search';
    return 'main';
  }, [activeFilter, searchTerm]);

  return {
    processedData: paginatedData,
    totalItems: filteredData.length,
    currentView,
    dataTransformers: {
      handleSort,
      handleFilter,
      handleSearch,
    },
    sortConfig,
  };
};
