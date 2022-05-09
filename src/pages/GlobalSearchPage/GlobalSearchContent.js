import React, {memo, useEffect, useMemo, useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_INNER_DATA } from "../../operations/queries/searchInnerData";
import handleError from "../../data/handleError";
import { setSearchQuery } from "../../data/redux/common/commonActions";
import LoadingCircle from "../../components/circularProgress/LoadingCircle";
import NoResultsTypography from "../../components/typographies/NoResultsTypography";
import GlobalSearchResults from "./GlobalSearchResults";
import PaperCardWrapper from "../../components/PaperCardWrapper";
import GlobalSearchResultsInfoBlock from "./GlobalSeachResultsInfoBox";
import { getCardData } from "./getCardData";

const useSearchData = (setSearchQuery, history) => {
  const [executeSearch, { error, loading, data }] = useLazyQuery(
    SEARCH_INNER_DATA, {
      onError: (error) => {
        setSearchQuery("");
        handleError(error, history);
      },
    },
  );
  return [executeSearch, { error, loading, data }];
};

const itemsOnPage = 15;

const GlobalSearchContent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state?.common?.get("searchQuery"));
  const [searchResults, setSearchResults] = useState([]);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [executeSearch, { loading, data }] =
    useSearchData(value => dispatch(setSearchQuery(value)), history);

  useEffect(() => {
    executeSearch({ variables: { search: searchQuery } });
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
    setSearchResults(data?.search_inner_data);
  }, [data]);

  useEffect(() => {
    if (searchResults) {
      const part = searchResults?.slice(itemsOnPage * (currentPage - 1), itemsOnPage * currentPage)?.filter(Boolean);
      const partResults = part?.map(r => getCardData(r, history))?.filter(Boolean);

      setHasMore(searchResults?.length > itemsOnPage * currentPage);

      if (currentPage > 1) {
        setResults(results => [...results, ...partResults]);
      } else {
        setResults(partResults);
      }
    }
  }, [currentPage, searchResults]);

  const allDataLength = useMemo(() => searchResults?.length, [searchResults]);

  return (
    <PaperCardWrapper style={{overflow: "visible"}}>
      {(searchQuery?.length > 2 && loading) || (allDataLength && !results?.length) ? (
        <LoadingCircle text={"searching..."} />
      ) : results?.length > 0 ? (
          <>
            <GlobalSearchResultsInfoBlock
              allDataLength={allDataLength}
              searchQuery={searchQuery}
            />

            <GlobalSearchResults
              hasMore={hasMore}
              results={results}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) :
        <NoResultsTypography />
      }
    </PaperCardWrapper>
  );
};

export default memo(GlobalSearchContent);