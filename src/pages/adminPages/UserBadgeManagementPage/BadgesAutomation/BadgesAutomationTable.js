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
  Typography,
} from "@material-ui/core";
import TopTypography from "../../../../components/typographies/TopTypography";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import {useMutation, useLazyQuery} from "@apollo/client";
import handleError from "../../../../data/handleError";
import DisableBackdropDrawer from "../../../../components/drawers/DisableBackdropDrawer";
import AddIcon from "@material-ui/icons/Add";
import DeleteButton from "../../../../components/buttons/DeleteButton";
import AddEditDrawerContent from "./AddEditDrawerContent";
import {GET_BADGE_RULES} from "../../../../operations/adminQueries/getBadgeRules";
import {
  handlePageChange,
  handleQueryFilter,
  handleSearchQuery,
} from "../../../../data/helper/filterHelpers";
import SearchInput from "../../../../components/SearchInput";
import BoxTableWrapper from "../../../../components/table/BoxTableWrapper";
import {DELETE_BADGE_RULE} from "../../../../operations/adminMutations/deleteBadgeRule";
import EditButton from "../../../../components/buttons/EditButton";
import BadgeChip from "../../../../components/badges/BadgeChip";

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

const headCells = ["Rule Name", "Rule Criteria", "Edit", "Delete"];

const BadgesAutomationTable = () => {
  const classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [badgeRuleData, setBadgeRuleData] = useState([]);
  const [dataCountStatus, setDataCountStatus] = useState(true);
  const [isEditRule, setIsEditRule] = useState(false);
  const [editRule, setEditRule] = useState();
  const [ruleBadges, setRuleBadges] = useState([]);
  const [filters, setFilters] = useState({
    pageCount: 0,
    itemsPerPage: 25,
    query: "",
  });

  const [executeSearch] = useLazyQuery(GET_BADGE_RULES, {
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      handleResult(result?.get_badge_rules);
    },
    onError: (error) => handleError(error)(history),
  });

  const [deleteBadgeRule, {loading: isDeleteLoading}] = useMutation(
    DELETE_BADGE_RULE,
    {
      onCompleted: () => executeQuery(),
      onError: (error) => handleError(error)(history),
    }
  );

  const handleResult = (result) => {
    handleQueryFilter(
      badgeRuleData,
      setBadgeRuleData,
      result,
      filters,
      setIsLoading
    );

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
  }, [filters, isDeleteLoading]);

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

  const handleDeleteRule = async (id) => {
    await deleteBadgeRule({
      variables: {
        id: id,
      },
    });
  };

  const handleEditRule = (rule) => {
    const badges = rule?.badges?.map((bge) => bge?.badge);

    setRuleBadges(badges);
    setIsEditRule(true);
    setEditRule(rule);

    setIsDrawerOpen(true);
  };

  return (
    <Box className={classes.box}>
      <Toolbar>
        <div>
          <TopTypography>Badges Automation</TopTypography>
        </div>
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setIsDrawerOpen(true)}
        >
          <AddIcon className={classes.icon} /> Add New Rule
        </Button>
      </Toolbar>
      <Box mt={1}>
        <SearchInput
          onSearch={handleOnSearch}
          searchQuery={filters.query}
          label={"Search"}
          helperText={"Search for rule name or rule criteria input"}
        />
      </Box>
      <div>
        <BoxTableWrapper
          id={"manage-badges-table"}
          loading={isLoading}
          dataLength={badgeRuleData?.length}
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
                  <TableCell>{cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {badgeRuleData?.map((rule) => (
                <React.Fragment key={rule?.id}>
                  <StyledTableRow id={rule?.id} key={rule?.id}>
                    <TableCell>{rule?.ruleName}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant={"body2"}>
                          If{" "}
                          <strong>
                            {rule?.criteriaFieldValue} {rule?.criteriaFilter}{" "}
                            {rule?.criteriaInputValue}
                          </strong>{" "}
                          then assign these badges:
                        </Typography>
                        {rule?.badges.map((bge) => (
                          <BadgeChip
                            id={bge?.badge?.id}
                            label={bge?.badge?.badgeName}
                            image={bge?.badge?.badgeIcon?.badgeIconImg}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <EditButton onClick={() => handleEditRule(rule)} />
                    </TableCell>
                    <TableCell>
                      <DeleteButton
                        onClick={() => handleDeleteRule(rule?.id)}
                      />
                    </TableCell>
                  </StyledTableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </BoxTableWrapper>
      </div>
      <DisableBackdropDrawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <AddEditDrawerContent
          executeQuery={executeQuery}
          setIsDrawerOpen={setIsDrawerOpen}
          setIsEditRule={setIsEditRule}
          isEditRule={isEditRule}
          editRule={editRule}
          ruleBadges={ruleBadges}
        />
      </DisableBackdropDrawer>
    </Box>
  );
};

export default memo(BadgesAutomationTable);
