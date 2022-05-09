import React, {memo} from "react";
import {AppBar, Box, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";
import CustomTabPanel, {a11yProps} from "./CustomTabPanel";
import StyledTab from "./StyledTab";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingBottom: theme.spacing(2)
  },
  tabs: {
    backgroundImage: theme.palette.background.gradient,
  },
}));

const TabsPaper = ({
  value,
  handleChange,
  tabs,
  tabName,
  tabPanelClasses,
  styled,
  className,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Box pb={1}>
      <Paper elevation={3} className={classes.paper}>
        <AppBar position="static">
          <Tabs
            className={className || classes.tabs}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            {...props}
          >
            {tabs?.map(({label}, index) =>
              styled ? (
                <StyledTab
                  key={index}
                  label={label}
                  {...a11yProps(tabName, index)}
                />
              ) : (
                <Tab key={index} label={label} {...a11yProps(tabName, index)} />
              )
            )}
          </Tabs>
        </AppBar>

        {tabs?.map(({content}, index) => (
          <CustomTabPanel
            key={index}
            index={index}
            value={value}
            className={tabPanelClasses}
            name={tabName}
          >
            {content}
          </CustomTabPanel>
        ))}
      </Paper>
    </Box>
  );
};

export default memo(TabsPaper);
