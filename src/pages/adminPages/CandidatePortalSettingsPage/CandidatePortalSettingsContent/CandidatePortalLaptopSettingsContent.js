import {useHistory} from "react-router-dom";
import React, {memo, useEffect, useState} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {Box, Button, Drawer, makeStyles, Toolbar} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import handleError from "../../../../data/handleError";
import {GET_CANDIDATE_PORTAL_LAPTOP_SETTINGS} from "../../../../operations/adminQueries/getCandidatePortalLaptopSettings";
import GENERATE_LAPTOPS_TABLE_COLUMNS from "../../../../data/constants/CandidateLaptops";
import TopTypography from "../../../../components/typographies/TopTypography";
import AddIcon from "@material-ui/icons/Add";
import LaptopDrawer from "./LaptopDrawer";
import DeleteLaptopModal from "./DeleteLaptopModal";
import {CREATE_LOG_ENTRY} from "../../../../operations/adminMutations/createLogEntry";

const GRID_BOX_HEIGHT = 500,
  CONTENT_HEIGHT_COEFFICIENT = 1.3054830287;

const useStyles = makeStyles((theme) => ({
  loaderBox: {
    margin: "0 auto 0 auto",
  },
  noRowsOverlay: {
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: `${GRID_BOX_HEIGHT / CONTENT_HEIGHT_COEFFICIENT}px`,
    height: "100%",
  },
  paper: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
}));

const CandidatePortalLaptopSettingsContent = () => {
  const history = useHistory();
  const classes = useStyles();
  const [laptops, setLaptops] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [drawerView, setDrawerView] = useState("");
  const [selected, setSelected] = useState();

  const [getLaptopData, {loading}] = useLazyQuery(
    GET_CANDIDATE_PORTAL_LAPTOP_SETTINGS,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        setLaptops(data.get_candidate_portal_laptops);
      },
      onError: (error) => {
        handleError(error)(history);
      },
    },
  );

  const [createLogEntry] = useMutation(CREATE_LOG_ENTRY);

  const createLog = (info, description) => {
    createLogEntry({
      variables: {
        input: {
          logType: "Candidate Portal Settings",
          logNotification: info,
          logDescription: description,
        },
      },
    });
  };

  useEffect(() => {
    if (getLaptopData) {
      getLaptopData();
    }
  }, [getLaptopData]);

  const handleEdit = (event, laptop) => {
    event.preventDefault();
    setSelected(laptop);
    setDrawerView("edit");
    setIsDrawerOpen(true);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    setDrawerView("add");
    setIsDrawerOpen(true);
  };
  const handleDelete = (event, laptop) => {
    event.preventDefault();
    setSelected(laptop);
    setIsDeleteModalOpen(true);
  };

  const NoRowsOverlay = () => (
    <Box className={classes.noRowsOverlay}>No results found</Box>
  );

  const geLaptopsTable = () => {
    return laptops?.length ? (
      <DataGrid
        rows={laptops}
        columns={GENERATE_LAPTOPS_TABLE_COLUMNS(
          handleEdit,
          handleDelete,
        )}
        components={{NoRowsOverlay}}
      />
    ) : null;
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSelected(null);
    setIsDrawerOpen(open);
  };

  const handleDrawerClose = () => {
    setSelected(null);
    setIsDrawerOpen(false);
  };

  const onDrawerComplete = () => {
    handleDrawerClose();
    getLaptopData();
  };

  const handleDeleteModalClose = () => {
    setSelected(null);
    setIsDeleteModalOpen(false);
  };

  const onDeleteComplete = () => {
    handleDeleteModalClose();
    getLaptopData();
  }

  return (
    <>
      <Toolbar>
        <div>
          <TopTypography>FTE Task Settings</TopTypography>
        </div>
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleAdd}
        >
          <AddIcon className={classes.icon} /> Add New Laptop Option
        </Button>
      </Toolbar>

      <Box bgcolor="#FCFCFC" p={4} minWidth={960}>
        <div style={{height: GRID_BOX_HEIGHT, width: "100%"}}>
          {loading ? <LoadingCircle /> : geLaptopsTable()}
        </div>

        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          classes={{paper: classes.paper}}
        >
          <LaptopDrawer
            onComplete={onDrawerComplete}
            handleClose={handleDrawerClose}
            isAdd={drawerView === "add"}
            selectedLaptop={selected}
            laptops={laptops}
            createLog={createLog}
          />
        </Drawer>

        <DeleteLaptopModal
          selectedLaptop={selected}
          open={isDeleteModalOpen}
          handleClose={handleDeleteModalClose}
          onComplete={onDeleteComplete}
          createLog={createLog}
        />
      </Box>
    </>
  );
};

export default memo(CandidatePortalLaptopSettingsContent);
