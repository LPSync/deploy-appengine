import React, {memo, useCallback, useEffect, useState} from "react";
import {Box, makeStyles} from "@material-ui/core";
import CustomModal from "../../../../components/modals/CustomModal";
import BadgeChip from "../../../../components/badges/BadgeChip";
import ColorBorderBox from "../../../../components/blocks/ColorBorderBox";
import SearchInput from "../../../../components/SearchInput";
import {useLazyQuery} from "@apollo/client";
import {GET_LPSYNC_BADGES} from "../../../../operations/adminQueries/getLpsyncBadges";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {handlePageChange, handleSearchQuery} from "../../../../data/helper/filterHelpers";
import AlertBox from "../../../../components/AlertBox";
import ModalTopBar from "../../../../components/modals/ModalTopBar";
import CustomFormSelect from "../../../../components/inputs/CustomFormSelect";
import BadgesSelectGrid from "./BadgesSelectGrid";
import UserBadgesModalBlock from "./UserBadgesModalBlock";
import BadgeCriteriaOptions, {BadgeCriteriaOptionsObj} from "../../../../data/constants/BadgeCriteriaOptions";
import {SEARCH_USERS_BY_BADGES_QUERY} from "../../../../operations/queries/searchUsersByBadgesQuery";
import {useDispatch} from "react-redux";
import {setUsersData} from "../../../../data/redux/userDirectory/userDirectoryActions";
import BadgesModalActionBlock from "./BadgesModalActionBlock";
import BadgeFormSelect from "./BadgeFormSelect";

const useStyles = makeStyles(() => ({
  alert: {
    width: "60ch",
  },
  select: {
    width: "30ch",
    padding: "10.5px 7px",
  },
  badgeSearchBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const UserBadgesSearchModal = ({open, handleClose, setOpen}) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [badgeCategory, setBadgeCategory] = useState("");
  const [badgeCriteria, setBadgeCriteria] = useState(BadgeCriteriaOptions.ANY);
  const [badgeData, setBadgeData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("warning");
  const [currentQuery, setCurrentQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 14,
    query: "",
  });

  const [executeSearch] = useLazyQuery(GET_LPSYNC_BADGES, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      handleResult(data?.get_lpsync_badges);
    },
    onError: (error) => handleError(error)(history),
  });

  const [executeUserSearch] = useLazyQuery(SEARCH_USERS_BY_BADGES_QUERY, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setOpen(true);
      dispatch(setUsersData(data?.search_users_by_badges));
      handleClose();
      setSubmitting(false);
    },
    onError: (error) => handleError(error)(history),
  });

  const handleResult = (result) => {
    setBadgeData(result);
    setIsLoading(false);

    if (result?.length > filters?.itemsPerPage) {
      setIsNextBtnDisabled(false);
    } else {
      setIsNextBtnDisabled(true);
    }
  };

  const executeQuery = () => {
    setIsLoading(true);
    executeSearch({
      variables: {filters: {...filters, type: badgeCategory}},
    });
  };

  useEffect(() => {
    if (filters.pageCount === 0) {
      setIsBackBtnDisabled(true);
    } else {
      setIsBackBtnDisabled(false);
    }

    executeQuery();
  }, [filters, badgeCategory]);

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage("");
      }, 15 * 1000);
    }
  }, [alertMessage]);

  const handleDelete = (chip) => {
    setSelectedBadges(selectedBadges?.filter((bge) => bge.id !== chip.id));
  };

  const handleOnSearch = (query) => {
    handleSearchQuery(
      query,
      currentQuery,
      setCurrentQuery,
      filters,
      setFilters,
      setIsLoading,
    );
  };

  const handleAlert = (msg, severity) => {
    setAlertSeverity(severity);
    setAlertMessage(msg);
  };

  const handleClick = (selected) => {
    const isBadgeSelected = selectedBadges?.some((bge) =>
      bge?.id === selected?.id);

    if (isBadgeSelected) {
      handleAlert("Badge is already selected", "warning");
    } else {
      setSelectedBadges([...selectedBadges, selected]);
    }
  };

  const handleBackBtn = () => {
    const pageCount = filters.pageCount - 1;
    handlePageChange(pageCount, filters, setFilters, isLoading);
  };

  const handleNextBtn = () => {
    const pageCount = filters.pageCount + 1;
    handlePageChange(pageCount, filters, setFilters, isLoading);
  };

  const handleSearch = useCallback(() => {
    setSubmitting(true);
    executeUserSearch({
      variables: {
        search: {
          type: badgeCriteria,
          badges: selectedBadges?.map(badge => ({badgeId: badge.id})),
        },
      },
    });
  }, [setSubmitting, selectedBadges, badgeCriteria]);

  return (
    <CustomModal
      width={900}
      height={"auto"}
      open={open}
      onClose={handleClose}
      middlePosition
      aria-labelledby="request-form-alert"
      aria-describedby="request-form-description"
    >
      <ModalTopBar title="Skill/Interest Search" handleClose={handleClose} />

      <Box m={2}>
        <UserBadgesModalBlock title="Select a skill/interest to add to search criteria">
          <Box mt={2} mx={2} className={classes.badgeSearchBlock}>
            <BadgeFormSelect
              selectClasses={classes.select}
              value={badgeCategory}
              onValueChange={setBadgeCategory}
            />
            <SearchInput
              onSearch={handleOnSearch}
              searchQuery={filters.query}
              label={"Search Badges"}
            />
          </Box>

          <Box m={2}>
            {badgeCategory && badgeData && (
              <BadgesSelectGrid
                loading={isLoading}
                badges={badgeData}
                isBackBtnDisabled={isBackBtnDisabled}
                handleBackBtn={handleBackBtn}
                isNextBtnDisabled={isNextBtnDisabled}
                handleNextBtn={handleNextBtn}
                handleClick={handleClick}
              />
            )}
          </Box>
        </UserBadgesModalBlock>

        <UserBadgesModalBlock title="Search Criteria">
          <ColorBorderBox height={100}>
            {selectedBadges?.map((bge) => (
              <BadgeChip
                key={bge?.id}
                id={bge?.id}
                label={bge?.badgeName}
                image={bge?.badgeIcon?.badgeIconImg}
                onDelete={() => handleDelete(bge)}
              />
            ))}
          </ColorBorderBox>

          <Box m={2}>
            <CustomFormSelect
              id="badge-criteria"
              value={badgeCriteria}
              onValueChange={setBadgeCriteria}
              options={BadgeCriteriaOptionsObj}
              withoutEmptyOption
              selectClasses={classes.select}
            />
          </Box>
        </UserBadgesModalBlock>
      </Box>

      {alertMessage && (
        <Box mb={2}>
          <AlertBox severity={alertSeverity} message={alertMessage} />
        </Box>
      )}
      <BadgesModalActionBlock
        handleSearch={handleSearch}
        disabled={!selectedBadges?.length}
        submitting={submitting}
      />
    </CustomModal>
  );
};

export default memo(UserBadgesSearchModal);