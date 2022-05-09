import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {
  Box,
  makeStyles,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Toolbar,
  Button,
} from "@material-ui/core";
import TopTypography from "../../../../components/typographies/TopTypography";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import {useMutation, useLazyQuery} from "@apollo/client";
import handleError from "../../../../data/handleError";
import {GET_LPSYNC_BADGES} from "../../../../operations/adminQueries/getLpsyncBadges";
import BadgeIcon from "../../../../components/badges/BadgeIcon";
import DisableBackdropDrawer from "../../../../components/drawers/DisableBackdropDrawer";
import AddIcon from "@material-ui/icons/Add";
import AddBadgesDrawerContent from "./AddBadgesDrawerContent";
import DeleteButton from "../../../../components/buttons/DeleteButton";
import {DELETE_LPSYNC_BADGE} from "../../../../operations/adminMutations/deleteLpsyncBadge";
import BoxTableWrapper from "../../../../components/table/BoxTableWrapper";
import SearchInput from "../../../../components/SearchInput";
import {
  handlePageChange,
  handleQueryFilter,
  handleSearchQuery,
} from "../../../../data/helper/filterHelpers";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "1000px",
  },
  chip: {
    fontSize: ".75rem",
    margin: ".25rem",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
  tableBox: {overflow: "auto", height: "55vh", padding: theme.spacing(3)},
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const headCells = ["Badge Icon", "Badge Name", "Users", "Delete"];

const ManageBadgesTable = ({badgeTypeTitle, badgeType}) => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [badgeData, setBadgeData] = useState([]);
  const [dataCountStatus, setDataCountStatus] = useState(true);
  const [filters, setFilters] = useState({
    type: badgeType,
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });

  const [executeSearch] = useLazyQuery(GET_LPSYNC_BADGES, {
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      handleResult(result?.get_lpsync_badges);
    },
    onError: (error) => handleError(error)(history),
  });

  const [deleteLpsyncBadge, {loading: isDeleteLoading}] = useMutation(
    DELETE_LPSYNC_BADGE,
    {
      onCompleted: () => executeQuery(),
      onError: (error) => handleError(error)(history),
    }
  );

  const handleResult = (result) => {
    handleQueryFilter(badgeData, setBadgeData, result, filters, setIsLoading);

    if (result?.length >= filters?.itemsPerPage) {
      setDataCountStatus(true);
    } else {
      setDataCountStatus(false);
    }
  };

  const executeQuery = () => {
    setIsLoading(true);
    executeSearch({
      variables: {filters: filters},
    });
  };

  useEffect(() => {
    if (isDeleteLoading) {
      setIsLoading(true);
    }

    executeQuery();
  }, [isDeleteLoading, filters]);

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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const deleteBadge = async (badgeID) => {
    await deleteLpsyncBadge({
      variables: {
        id: badgeID,
      },
    });
  };

  return (
    <Box className={classes.box}>
      <Toolbar>
        <div>
          <TopTypography>{badgeTypeTitle}</TopTypography>
        </div>
        <Box flexGrow={1} />

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setIsDrawerOpen(true)}
        >
          <AddIcon className={classes.icon} /> Add New Badge
        </Button>
      </Toolbar>
      <Box mt={1}>
        <SearchInput
          onSearch={handleOnSearch}
          searchQuery={filters.query}
          label={`Search All ${badgeTypeTitle} Badges`}
        />
      </Box>
      <div>
        <BoxTableWrapper
          id={"manage-badges-table"}
          loading={isLoading}
          dataLength={badgeData?.length}
          hasMore={dataCountStatus}
          next={() =>
            handlePageChange &&
            handlePageChange(
              filters.pageCount + 1,
              filters,
              setFilters,
              isLoading
            )
          }
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {badgeData?.map((badge) => (
                <React.Fragment key={badge?.id}>
                  <StyledTableRow id={badge?.id} key={badge?.id}>
                    <TableCell>
                      <BadgeIcon image={badge?.badgeIcon?.badgeIconImg} />
                    </TableCell>
                    <TableCell>{badge?.badgeName}</TableCell>
                    <TableCell>{badge?.users?.length}</TableCell>
                    <TableCell>
                      {badge?.users?.length === 0 && (
                        <DeleteButton onClick={() => deleteBadge(badge?.id)} />
                      )}
                    </TableCell>
                  </StyledTableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </BoxTableWrapper>
      </div>
      <DisableBackdropDrawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <AddBadgesDrawerContent
          data={badgeData}
          badgeType={badgeType}
          badgeTypeTitle={badgeTypeTitle}
          setIsDrawerOpen={setIsDrawerOpen}
          executeQuery={executeQuery}
        />
      </DisableBackdropDrawer>
    </Box>
  );
};

export default memo(ManageBadgesTable);
