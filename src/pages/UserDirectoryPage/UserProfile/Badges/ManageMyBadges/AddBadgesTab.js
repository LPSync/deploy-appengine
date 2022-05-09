import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery, useMutation} from "@apollo/client";
import {Box, Button, Grid, makeStyles, Typography} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {GET_LPSYNC_BADGES} from "../../../../../operations/adminQueries/getLpsyncBadges";
import handleError from "../../../../../data/handleError";
import {ADD_AUTH_USER_BADGES} from "../../../../../operations/mutations/addAuthUserBadges";
import InfoBlock from "../../../../../components/InfoBlock";
import ColorBorderBox from "../../../../../components/blocks/ColorBorderBox";
import BadgeChip from "../../../../../components/badges/BadgeChip";
import SearchInput from "../../../../../components/SearchInput";
import BoxGridWrapper from "../../../../../components/grid/BoxGridWrapper";
import BadgeIconGridItem from "../../../../../components/grid/BadgeIconGridItem";
import {
  handlePageChange,
  handleSearchQuery,
} from "../../../../../data/helper/filterHelpers";
import AlertBox from "../../../../../components/AlertBox";
import BackPaginationButton from "../../../../../components/buttons/BackPaginationButton";
import NextPaginationButton from "../../../../../components/buttons/NextPaginationButton";
import SelectBadgeCategoryInput from "../../../../../components/badges/SelectBadgeCategoryInput";
import RequestBadgeDrawerContent from "./RequestBadgeDrawerContent";
import DisableBackdropDrawer from "../../../../../components/drawers/DisableBackdropDrawer";

const useStyles = makeStyles((theme) => ({
  box: {position: "relative"},
  resultsBox: {
    position: "absolute",
    zIndex: 2,
    width: "60ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "20rem",
    overflow: "auto",
  },
  alert: {
    width: "60ch",
  },
  select: {
    width: "30ch",
  },
  listItemText: {
    display: "flex",
    alignItems: "center",
  },
  chip: {
    margin: ".25rem",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem",
  },
  selectedBox: {
    height: 200,
    overflow: "auto",
    border: "1px solid #4667c8",
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
  saveBox: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const AddBadgesTab = ({userBadgeData}) => {
  const classes = useStyles();
  const history = useHistory();
  const [badgeCategory, setBadgeCategory] = useState("");
  const [badgeData, setBadgeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [isRequestDrawerOpen, setIsRequestDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });

  const [executeSearch] = useLazyQuery(GET_LPSYNC_BADGES, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      handleResult(data?.get_lpsync_badges);
    },
    onError: (error) => handleError(error)(history),
  });

  const [addBadges] = useMutation(ADD_AUTH_USER_BADGES, {
    onCompleted: () => handleComplete(),
    onError: (error) => handleError(error)(history),
  });

  const handleComplete = async () => {
    handleAlert("Badges saved!", true, "success");
    setBadgeCategory("");
    setSelectedBadges([]);

    resetComplete();
  };

  const resetComplete = () => {
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 5000);
  };

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

  const handleCategoryChange = async (event) => {
    const type = event.target.value;
    setIsAlertOpen(false);
    setBadgeCategory(type);
  };

  const handleOnSearch = (query) => {
    setIsAlertOpen(false);
    handleSearchQuery(
      query,
      currentQuery,
      setCurrentQuery,
      filters,
      setFilters,
      setIsLoading
    );
  };

  const handleClick = (selected) => {
    const isBadgeUsed = userBadgeData?.some(
      (bge) => bge.badge?.id === selected?.id
    );

    const isBadgeSelected = selectedBadges?.some(
      (bge) => bge?.id === selected?.id
    );

    if (isBadgeUsed) {
      handleAlert("Badge is already saved in your profile", true, "warning");
    } else if (isBadgeSelected) {
      handleAlert("Badge is already selected", true, "warning");
    } else {
      setSelectedBadges([...selectedBadges, selected]);
    }
  };

  const handleDelete = async (chip) => {
    setSelectedBadges((selectedBadges) =>
      selectedBadges.filter((bge) => bge.id !== chip.id)
    );
  };

  const handleSave = async () => {
    let badgeIds = [];

    selectedBadges.map((badge) => {
      badgeIds.push({badgeId: parseInt(badge.id)});
    });

    await addBadges({
      variables: {
        input: badgeIds,
      },
    });
  };

  const handleAlert = (msg, open, severity) => {
    setAlertSeverity(severity);
    setAlertMessage(msg);
    setIsAlertOpen(open);
  };

  const handleBackBtn = () => {
    const pageCount = filters.pageCount - 1;
    handlePageChange(pageCount, filters, setFilters, isLoading);
  };

  const handleNextBtn = () => {
    const pageCount = filters.pageCount + 1;
    handlePageChange(pageCount, filters, setFilters, isLoading);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsRequestDrawerOpen(open);
  };

  return (
    <Box m={2}>
      {isAlertOpen && (
        <Box mb={2}>
          <AlertBox severity={alertSeverity} message={alertMessage} />
        </Box>
      )}
      <InfoBlock>
        <Box m={2}>
          <Typography variant={"body2"}>
            Select a badge category and then search and add the badge you'd
            like. <br />
            You can remove a badge from your selection by clicking on the X.
            <br />
            Click on the <strong>SAVE</strong> button to save your badges to
            your profile.
          </Typography>
          <Typography variant={"body2"}>
            If you don't see a badge that you want, you can request one here:{" "}
            <Button
              variant={"outlined"}
              size={"small"}
              onClick={() => setIsRequestDrawerOpen(true)}
            >
              Request Badge
            </Button>
          </Typography>
        </Box>
      </InfoBlock>

      <Box m={2} mt={3}>
        <Grid item container>
          <Grid item xs={4}>
            <Typography component={"div"} variant="subtitle1">
              Select Badge Category
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <SelectBadgeCategoryInput
              value={badgeCategory}
              onChange={handleCategoryChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Box m={2}>
        {badgeCategory && badgeData && (
          <>
            <Box mt={1}>
              <SearchInput
                onSearch={handleOnSearch}
                searchQuery={filters.query}
                label={"Search Badges"}
              />
            </Box>
            <BoxGridWrapper loading={isLoading} dataLength={badgeData?.length}>
              {badgeData?.map((badge) => (
                <BadgeIconGridItem
                  key={badge?.id}
                  image={badge?.badgeIcon?.badgeIconImg}
                  name={badge?.badgeName}
                  onClick={() => handleClick(badge)}
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
          </>
        )}
      </Box>
      <Box mt={5}>
        {selectedBadges?.length > 0 && (
          <>
            <Box>
              <Typography>Selected Badges:</Typography>

              <ColorBorderBox height={200} width={"60ch"}>
                {selectedBadges?.map((bge) => (
                  <BadgeChip
                    id={bge?.id}
                    label={bge?.badgeName}
                    image={bge?.badgeIcon?.badgeIconImg}
                    onDelete={() => handleDelete(bge)}
                  />
                ))}
              </ColorBorderBox>
            </Box>
            <Box className={classes.saveBox}>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => handleSave()}
              >
                <SaveIcon className={classes.icon} />
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
      <DisableBackdropDrawer
        open={isRequestDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <RequestBadgeDrawerContent
          setIsRequestDrawerOpen={setIsRequestDrawerOpen}
        />
      </DisableBackdropDrawer>
    </Box>
  );
};

export default memo(AddBadgesTab);
