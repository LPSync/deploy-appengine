import React, {memo, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Details from "./Details";
import TabsPaper from "../../../components/tabs/TabsPaper";
import ThirdPartyUsers from "./ThirdPartyUsers";

const useStyles = makeStyles(() => ({
  tabPanel: {
    height: "45vh",
    overflow: "auto",
  },
}));

const thirdPartyTabs = [
  {
    label: "Details",
    content: <Details />,
  },
  // { label: "Security", content: "..." },
  {label: "Users", content: <ThirdPartyUsers />},
];

const tabName = "scrollable-auto";

const ThirdPartyProfilePanel = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabsPaper
      value={value}
      onChange={handleTabsChange}
      tabs={thirdPartyTabs}
      tabName={tabName}
      aria-label="scrollable auto tabs example"
      tabPanelClasses={classes.tabPanel}
      styled
    />
  );
};

export default memo(ThirdPartyProfilePanel);
