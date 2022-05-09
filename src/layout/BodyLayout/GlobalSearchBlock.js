import React, {memo, useContext, useEffect, useMemo, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, IconButton, makeStyles} from "@material-ui/core";
import {setSearchQuery} from "../../data/redux/common/commonActions";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import SearchBlock from "../../components/blocks/SearchBlock";
import {AuthUserContext} from "../../AuthUserContextProvider";
import SearchIcon from "@material-ui/icons/Search";
import {CSSTransition} from "react-transition-group";
import useDebouncedChangeHandler from "../../hooks/useDebouncedChangeHandler";

const useStyles = makeStyles(() => ({
  globalSearchTextField: {
    width: "50ch",
    "& .MuiInputLabel-filled.MuiInputLabel-shrink.MuiInputLabel-marginDense": {
      transform: "translate(12px, 2px) scale(0.75);",
    },
    "& .MuiInputLabel-filled": {
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },
    "& .MuiFilledInput-input": {
      paddingTop: 14,
      paddingBottom: 6,
    },
  },
  searchItem: {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
}));

const GlobalSearchBlock = () => {
  const {
    permTaskManagerViewAll,
    permTaskManagerViewAllOffboarding,
    permTaskManagerViewAllOnboarding,
    permTaskManagerViewAllRequisition,
    permUserDirectoryItDetailsView,
    permThirdPartyDirectoryView,
  } = useContext(AuthUserContext);
  const classes = useStyles();
  const searchQuery = useSelector(state => state?.common?.get("searchQuery"));
  const history = useHistory();
  const dispatch = useDispatch();
  const globalSearch = useRouteMatch(FrontendRoutes.GLOBAL_SEARCH);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const debouncedChangeHandler = useDebouncedChangeHandler(setSearchQuery, dispatch);

  useEffect(() => {
    if (active && !globalSearch && searchQuery?.length > 2) {
      history.push(FrontendRoutes.GLOBAL_SEARCH);
    }
  }, [globalSearch, searchQuery, active]);

  const handleClose = () => {
    setOpen(false);
  };
  const searchFields = useMemo(() => [
      "User",
      permUserDirectoryItDetailsView && "Device Serial Number",
      (permTaskManagerViewAll
        || permTaskManagerViewAllOffboarding
        || permTaskManagerViewAllOnboarding
        || permTaskManagerViewAllRequisition) ? "Task" : "Own Task",
      permThirdPartyDirectoryView && "Third Party",
    ]?.filter(Boolean),
    [permThirdPartyDirectoryView, permUserDirectoryItDetailsView]);

  return (
    <>
      <Box style={{position: "relative", height: 50}}>
        <CSSTransition
          in={open}
          timeout={1000}
          classNames="search"
          unmountOnExit
          appear
        >
          <SearchBlock
            searchProps={{
              id: "global-search-text-field",
              label: `Search by ${searchFields?.join(", ")}`,
              className: classes.globalSearchTextField,
              onFocus: () => setActive(true),
              onBlur: () => setActive(false),
              handleClose,
            }}
            searchQuery={searchQuery}
            handleChange={debouncedChangeHandler}
            className={classes.searchItem}
          />
        </CSSTransition>

        {!open && <IconButton onClick={() => setOpen(prev => !prev)} className={classes.searchItem}>
          <SearchIcon />
        </IconButton>
        }
      </Box>
    </>
  );
};

export default memo(GlobalSearchBlock);