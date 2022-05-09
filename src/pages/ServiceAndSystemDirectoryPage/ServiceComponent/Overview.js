import {
  Box,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import TabPanelItem from "./components/TabPanelItem";

const useStyles = makeStyles({
  row: {display: "flex", marginBottom: 10},
  column: {display: "flex", flexDirection: "column"},
  top: {display: "flex", justifyContent: "space-between"},
  icon: {marginRight: 10},
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const Overview = ({data, loading}) => {
  const classes = useStyles();

  if (loading)
    return (
      <Box className={classes.loader}>
        <CircularProgress color="secondary" />
      </Box>
    );
  return (
    data && (
      <Box>
        <Typography variant={"subtitle1"}>
          <Box className={classes.top}>
            <Typography>Overview of this Service</Typography>
            <Button disabled={true} variant="contained">
              Update
            </Button>
          </Box>

          <TabPanelItem
            title={"Service Type"}
            tooltip={"The Type of Service."}
            contentType={"component"}
            content={data.type}
          />

          <TabPanelItem
            title={"Service Description"}
            tooltip={
              "Description of the Service. What it is for and how it works."
            }
            contentType={"component"}
            content={data.description}
          />

          <TabPanelItem
            title={"Service Owner"}
            tooltip={"Who is responsible for this service."}
            content={data.owner?.name}
            link={data.owner?.email?.split("@")[0]}
          />

          <TabPanelItem
            title={"Service Criticality"}
            tooltip={"How critical is this service"}
            contentType={"component"}
            content={data.tier ? `Tier ${data.tier}` : null}
          />

          <TabPanelItem
            title={"Service Impact"}
            tooltip={
              "Description of the impact this service has if the service has an interruption."
            }
            contentType={"component"}
            content={data.impact}
          />
        </Typography>
      </Box>
    )
  );
};
export default Overview;
