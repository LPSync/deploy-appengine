import React, {memo, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_LPSYNC_BADGES} from "../../../../operations/adminQueries/getLpsyncBadges";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {
  handlePageChange,
  handleSearchQuery,
} from "../../../../data/helper/filterHelpers";
import BoxGridWrapper from "../../../../components/grid/BoxGridWrapper";
import SearchInput from "../../../../components/SearchInput";
import {Box, Button, Typography} from "@material-ui/core";
import BadgeIconGridItem from "../../../../components/grid/BadgeIconGridItem";

const SelectBadgesBox = ({handleAlert, selectedBadges, setSelectedBadges}) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [badgeData, setBadgeData] = useState([]);
  const [filters, setFilters] = useState({
    type: "system-owner",
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });

  const [executeSearch] = useLazyQuery(GET_LPSYNC_BADGES, {
    onCompleted: (data) => handleResult(data?.get_lpsync_badges),
    onError: (error) => handleError(error)(history),
  });

  const handleResult = (result) => {
    setBadgeData(result);
    setIsLoading(false);

    if (result?.length >= filters?.itemsPerPage) {
      setIsNextBtnDisabled(false);
    } else {
      setIsNextBtnDisabled(true);
    }
  };

  const executeQuery = () => {
    setIsLoading(true);
    executeSearch({
      variables: {filters: filters},
    });
  };

  useEffect(() => {
    if (filters.pageCount === 0) {
      setIsBackBtnDisabled(true);
    } else {
      setIsBackBtnDisabled(false);
    }

    executeQuery();
  }, [filters]);

  const handleOnSearch = (query) => {
    handleSearchQuery(
      query,
      currentQuery,
      setCurrentQuery,
      filters,
      setFilters,
      setIsLoading
    );
  };

  const handleBackBtn = () => {
    const pageCount = filters.pageCount - 1;
    handlePageChange(pageCount, filters, setFilters, isLoading);
  };

  const handleNextBtn = () => {
    const pageCount = filters.pageCount + 1;
    handlePageChange(pageCount, filters, setFilters, isLoading);
  };

  const handleAddBadge = (selected) => {
    const isBadgeSelected = selectedBadges?.some(
      (bge) => bge?.id === selected?.id
    );

    if (isBadgeSelected) {
      handleAlert("Badge is already selected", true, "warning");
    } else {
      setSelectedBadges([...selectedBadges, selected]);
    }
  };

  return (
    <Box mt={2}>
      <Typography>
        <strong>Select Badges:</strong>
      </Typography>

      <Box ml={2}>
        <SearchInput
          onSearch={handleOnSearch}
          searchQuery={filters.query}
          label={"Search All System Owner Badges"}
        />
      </Box>
      <Box m={2}>
        <BoxGridWrapper loading={isLoading} dataLength={badgeData?.length}>
          {badgeData?.map((badge) => (
            <BadgeIconGridItem
              key={badge?.id}
              image={badge?.badgeIcon?.badgeIconImg}
              name={badge?.badgeName}
              onClick={() => handleAddBadge(badge)} />
          ))}
        </BoxGridWrapper>
        <Box mt={1}>
          <Button
            size={"small"}
            variant={"outlined"}
            disabled={isBackBtnDisabled}
            onClick={handleBackBtn}
          >
            back
          </Button>{" "}
          <Button
            size={"small"}
            variant={"outlined"}
            disabled={isNextBtnDisabled}
            onClick={handleNextBtn}
          >
            next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SelectBadgesBox);
