import React, {memo} from "react";
import {makeStyles, Paper, Tab} from "@material-ui/core";
import CustomTabPanel, {a11yProps} from "./CustomTabPanel";
import StyledTab from "./StyledTab";
import CustomTabs from "./CustomTabs";

const useStyles = makeStyles((theme) => ({
  tabRoot: {
    flexGrow: 1,
    display: "flex",
    height: "70vh",
  },
  div: {
    padding: theme.spacing(2),
  },
}));

const AdminTabsPaper = ({
  value,
  handleChange,
  tabs,
  tabName,
  styled,
}) => {
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <div className={classes.tabRoot}>
        <CustomTabs value={value} onChange={handleChange}>
          {tabs?.map(({label}, index) =>
            styled ? (
              <StyledTab
                key={index}
                label={label}
                {...a11yProps(tabName, index)}
              />
            ) : (
              <Tab key={index} label={label} {...a11yProps(tabName, index)} />
            ),
          )}
        </CustomTabs>

        {tabs?.map(({content}, index) => (
          <CustomTabPanel
            key={index}
            index={index}
            value={value}
            name={tabName}
          >
            <Paper elevation={3}>
              <div className={classes.div}>
                {content}
              </div>
            </Paper>
          </CustomTabPanel>
        ))}
      </div>
    </Paper>
  );
};

export default memo(AdminTabsPaper);
