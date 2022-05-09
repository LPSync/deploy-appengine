import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  icon: {},
  container: {
    borderBottom: "1px solid rgba(81, 81, 81, 1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    padding: "3px 64px",
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.light}`,
      cursor: "pointer",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "underline",
    overflowX: "hidden",
  },
  tierText: {fontWeight: 700, color: "#000"},
  flag: {
    bottom: 0,
    top: 0,
    left: 0,
  },
  settings: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    width: 50,
    cursor: "pointer",
  },
  settingsIcon: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  item: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 20%",
    overflowX: "hidden",
  },
  itemCenter: {
    justifyContent: "center",
  },
  itemText: {
    marginLeft: 5,
    whiteSpace: "nowrap",
    overflowX: "hidden",
    textOverflow: "ellipsis",
    paddingRight: 10,
  },
}));
