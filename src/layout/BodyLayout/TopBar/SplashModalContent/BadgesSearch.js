import React, {memo, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import InfoTooltip from "../../../../components/tooltips/InfoTooltip";
import ColorBorderBox from "../../../../components/blocks/ColorBorderBox";
import BadgeChip from "../../../../components/badges/BadgeChip";
import CustomTextField from "../../../../components/inputs/CustomTextField";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import BadgeIcon from "../../../../components/badges/BadgeIcon";
import AddButton from "../../../../components/buttons/AddButton";
import SelectCircularProgress from "../../../../components/circularProgress/SelectCircularProgress";
import {GET_LPSYNC_BADGES} from "../../../../operations/adminQueries/getLpsyncBadges";
import {Alert} from "@material-ui/lab";
import {Help} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  box: {position: "relative"},
  resultsBox: {
    position: "absolute",
    zIndex: 2,
    width: "30ch",
    border: "1px solid " + theme.palette.secondary.main,
    maxHeight: "20rem",
    overflow: "auto",
  },
  boxContent: {
    display: "flex",
    alignItems: "flex-end",
  },
  boxIcon: {marginLeft: 10},
  listItemText: {
    display: "flex",
    alignItems: "center",
  },
}));

const BadgesSearch = ({
  selectedBadges,
  setSelectedBadges,
  deleteBadgeHandler,
  badgesType,
  title,
  tooltip,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [badgesData, setBadgesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [executeBadgeSearch, {loading: loadingBadges}] = useLazyQuery(
    GET_LPSYNC_BADGES,
    {
      onCompleted: (data) => {
        setBadgesData(data?.get_lpsync_badges);
      },
      onError: (error) => handleError(error)(history),
    }
  );

  const handleSearch = () => {
    executeBadgeSearch({
      variables: {
        filters: {
          type: badgesType,
          query: searchQuery,
          pageCount: 0,
          itemsPerPage: 50,
        },
      },
    });
    setResultsOpen(true);
  };

  useEffect(() => {
    if (searchQuery?.length) {
      handleSearch();
    } else if (!searchQuery?.length) {
      setResultsOpen(false);
      setBadgesData([]);
    }
  }, [executeBadgeSearch, searchQuery]);

  const handleAddButton = (selectedBadge) => {
    setSearchQuery("");

    const isBadgeSelected = selectedBadges?.some(
      (bge) => bge?.id === selectedBadge?.id
    );

    if (isBadgeSelected) {
      setIsAlertOpen(true);
    } else {
      setSelectedBadges([...selectedBadges, selectedBadge]);
      setResultsOpen(false);
    }
  };

  const filterBadges = (initArr, dataArr) => {
    if (initArr && dataArr)
      return initArr.filter(
        (initItem) => !dataArr.some((dataItem) => dataItem.id === initItem.id)
      );
    else return [];
  };

  const handleDelete = async (chip) => {
    deleteBadgeHandler(chip.id);
    setSelectedBadges((selectedBadges) =>
      selectedBadges.filter((bge) => bge.id !== chip.id)
    );
  };

  const searchOnChange = (query) => {
    setIsAlertOpen(false);
    setResultsOpen(true);
    setSearchQuery(query);
  };

  const handleClick = () => {
    handleSearch();
  };

  const focusInCurrentTarget = ({relatedTarget, currentTarget}) => {
    if (relatedTarget === null) return false;

    let node = relatedTarget.parentNode;

    while (node !== null) {
      if (node === currentTarget) return true;
      node = node.parentNode;
    }

    return false;
  };

  const handleBlur = (e) => {
    if (!focusInCurrentTarget(e)) {
      setResultsOpen(false);
    }
  };

  return (
    <div>
      <Typography>
        {title}
        <span>
          <InfoTooltip placement={"right-start"}>{tooltip}</InfoTooltip>
        </span>
      </Typography>

      {isAlertOpen && (
        <Alert severity="warning">Badge is already selected</Alert>
      )}

      <Box mt={2} mb={2} className={classes.box} onBlur={handleBlur}>
        <Box className={classes.boxContent}>
          <CustomTextField
            small
            id="standard-basic"
            label="Search"
            variant="standard"
            autoComplete="off"
            value={searchQuery}
            onValueChange={searchOnChange}
            onClick={handleClick}
          />
          <Tooltip
            title="If you do not see a badge you can request a new from your profile"
            className={classes.boxIcon}
          >
            <Help />
          </Tooltip>
        </Box>
        <Collapse in={resultsOpen} timeout="auto" unmountOnExit>
          <Box className={classes.resultsBox}>
            <Paper>
              {loadingBadges ? (
                <SelectCircularProgress />
              ) : badgesData?.length ? (
                <List>
                  {filterBadges(badgesData, selectedBadges).map((badge) => (
                    <React.Fragment key={badge?.id}>
                      <ListItem key={badge?.id}>
                        <ListItemText
                          primary={
                            <Box className={classes.listItemText}>
                              <Box mr={1}>
                                <AddButton
                                  onClick={() => handleAddButton(badge)}
                                />
                              </Box>
                              <Box mr={1}>
                                <BadgeIcon
                                  image={badge?.badgeIcon?.badgeIconImg}
                                />
                              </Box>
                              <Typography component={"div"} variant="subtitle1">
                                {badge?.badgeName}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {badgesData?.length > 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box m={1}>
                  <NoResultsTypography />
                </Box>
              )}
            </Paper>
          </Box>
        </Collapse>
      </Box>

      <Box>
        {selectedBadges?.length > 0 && (
          <ColorBorderBox height={"auto"}>
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
        )}
      </Box>
    </div>
  );
};

export default memo(BadgesSearch);
