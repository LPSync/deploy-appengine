import React, {memo, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_BADGE_ICONS} from "../../operations/adminQueries/getBadgeIcons";
import SearchInput from "../SearchInput";
import BadgeIcon from "./BadgeIcon";
import {Box, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import handleError from "../../data/handleError";
import {
  handlePageChange,
  handleSearchQuery,
} from "../../data/helper/filterHelpers";
import BoxGridWrapper from "../grid/BoxGridWrapper";
import BadgeIconGridItem from "../grid/BadgeIconGridItem";
import BackPaginationButton from "../buttons/BackPaginationButton";
import NextPaginationButton from "../buttons/NextPaginationButton";

const ChooseBadgeIcon = ({
  badgeIconName,
  setBadgeIconName,
  badgeImage,
  setBadgeImage,
}) => {
  const history = useHistory();
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [badgeData, setBadgeData] = useState([]);
  const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 24,
    query: "",
  });

  const [executeSearch] = useLazyQuery(GET_BADGE_ICONS, {
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      handleResult(result?.get_badge_icons);
    },
    onError: (error) => handleError(error)(history),
  });

  const handleResult = (result) => {
    setBadgeData(result);
    setIsSearchInProgress(false);

    if (result?.length >= filters?.itemsPerPage) {
      setIsNextBtnDisabled(false);
    } else {
      setIsNextBtnDisabled(true);
    }
  };

  const executeQuery = () => {
    setIsSearchInProgress(true);
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
      setIsSearchInProgress
    );
  };

  const handleClick = (img, name) => {
    setBadgeIconName(name);
    setBadgeImage(img);
  };

  const handleBackBtn = () => {
    const pageCount = filters.pageCount - 1;
    handlePageChange(pageCount, filters, setFilters, isSearchInProgress);
  };

  const handleNextBtn = () => {
    const pageCount = filters.pageCount + 1;
    handlePageChange(pageCount, filters, setFilters, isSearchInProgress);
  };

  return (
    <div>
      <Box mt={1}>
        <SearchInput
          onSearch={handleOnSearch}
          searchQuery={filters.query}
          label={"Search All Badge Icons"}
        />
      </Box>
      <BoxGridWrapper
        loading={isSearchInProgress}
        dataLength={badgeData?.length}
      >
        {badgeData?.map((badge) => (
          <BadgeIconGridItem
            key={badge?.id}
            image={badge?.badgeIconImg}
            name={badge?.badgeIconName}
            onClick={() =>
              handleClick(badge?.badgeIconImg, badge?.badgeIconName)
            }
          />
        ))}
      </BoxGridWrapper>
      <Box mt={1}>
        <BackPaginationButton
          disabled={isBackBtnDisabled}
          onClick={handleBackBtn}
        />
        <NextPaginationButton
          disabled={isNextBtnDisabled}
          onClick={handleNextBtn}
        />
      </Box>
      {badgeImage && (
        <Box mt={3}>
          <strong>Selected: </strong>

          <Typography variant={"subtitle1"}>
            {badgeIconName}
            <span>
              <BadgeIcon image={badgeImage} />
            </span>
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default memo(ChooseBadgeIcon);
