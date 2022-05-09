export const handleQueryFilter = (
  data,
  setData,
  resultData,
  filters,
  setIsLoading
) => {
  if (filters.pageCount > 0) {
    const combinedData = [...data, ...resultData];
    setData(combinedData);
  } else {
    setData(resultData);
  }
  setIsLoading(false);
};

export const handlePageChange = (pageCount, filters, setFilters, isLoading) => {
  if (!isLoading) {
    setFilters({...filters, pageCount});
  }
};

export const handleSearchQuery = (
  query,
  currentQuery,
  setCurrentQuery,
  filters,
  setFilters,
  setIsLoading
) => {
  let pageCount = filters.pageCount;
  if (filters.query && query !== currentQuery) {
    pageCount = 0;
  }
  setCurrentQuery(query);
  setIsLoading(true);
  setFilters({
    ...filters,
    query,
    pageCount,
  });
};
