import {createTheme} from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FCFCFC", // neutral-99
      dark: "#B1B1F0", // lavender-100
      light: "#E0E0F9", // lavender-40
    },
    secondary: {
      main: "#3863E5", // brand blue
      light: "#E7F2F7", // blue-20
      dark: "#95CBE5", // blue-100
    },
    info: {
      main: "#E849B7", // pink
      light: "#F9EEF4", // pink-20
      dark: "#EBB7D4", // pink-100
    },
    warning: {
      main: "#FA772E", // brand orange
      light: "#FBEBE2", // orange-20
    },
    success: {
      main: "#F59E9E", //red-100
      dark: "#EBCD7A", //yellow-100
    },
    background: {
      // default: "linear-gradient(45deg, #1d1f52 30%, #162036 90%)",
      default: "#F4F4F6", // neutral-96 (super light gray)
      paper: "#FCFCFC", // neutral-99 (white)
      light: "#989EAE", // neutral-64 (light gray),
      dark: "#363944", // neutral-24 (dark gray),
      gradient:
        "linear-gradient(to right, #3863E5 , #8D46EB , #E849B7 , #FA772E)",
    },
    text: {
      primary: "#1C1D22",
    },
  },
  props: {
    MuiListItemText: {
      primaryTypographyProps: {
        variant: "subtitle2",
      },
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightBold: 700,
    fontSize: 16,
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      weight: 600,
      fontSize: "2rem",
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1.25rem",
    },
    subtitle1: {
      fontSize: ".9rem",
    },
    subtitle2: {
      fontSize: ".8rem",
    },
  },
  button: {
    color: "#1C1D22",
  },
});

export default theme;
