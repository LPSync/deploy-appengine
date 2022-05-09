import React, {memo, useCallback, useMemo} from "react";
import {Box, makeStyles, Paper} from "@material-ui/core";
import CustomTypography from "./GlobalSearchTypography";
import CustomInfiniteScroll from "../../components/table/CustomInfiniteScroll";

const useStyles = makeStyles((theme) => ({
  resultsBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paper: {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1.25),
    cursor: "pointer",
    background: theme.palette.primary.main,
    border: "1px solid rgba(255, 255, 255, 0.7)",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
    "&:hover": {
      background: theme.palette.secondary.light,
    },
  },
  title: {
    fontSize: "1rem",
    lineHeight: 2,
    fontWeight: "bold",
  },
  itemsWrapper: {
    padding: "8px 12px",
    maxHeight: "calc(95vh - 275px)",
    overflowY: "auto",
  },
}));

const GlobalSearchResults = ({
  results,
  hasMore,
  setCurrentPage,
  currentPage,
}) => {
  const classes = useStyles();

  const dataLength = useMemo(() => results?.length, [results]);

  const handlePageChange = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  return (
    <Box className={classes.itemsWrapper} id={"global-search"}>
      <CustomInfiniteScroll
        scrollableTarget="global-search"
        dataLength={dataLength}
        next={handlePageChange}
        hasMore={hasMore}
      >
        {results?.map(({title, info, description, icon, onClick}, index) => (
          <Paper
            hover
            key={index}
            elevation={3}
            className={classes.paper}
            onClick={() => onClick && onClick()}
          >
            {/*<Tooltip title={"open"} placement="top-start">*/}
            <Box>
              <Box className={classes.resultsBlock}>
                <CustomTypography title>{title}</CustomTypography>

                <CustomTypography>{info}</CustomTypography>
              </Box>

              <Box className={classes.resultsBlock}>
                <CustomTypography> {description} </CustomTypography>
                {icon}
              </Box>
            </Box>
            {/*</Tooltip>*/}
          </Paper>
        ))}
      </CustomInfiniteScroll>
    </Box>
  );
};

export default memo(GlobalSearchResults);
