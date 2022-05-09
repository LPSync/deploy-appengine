import {Box, Grid, makeStyles, Collapse, Grow} from "@material-ui/core";
import {zip, zipWith} from "lodash";
import {Chart} from "react-google-charts";
import {
  CHARTS_TITLES,
  CHARTS_WITH_KEY_ONLY_COUNT,
  REQUISITION_CHARTS_SUBTITLES,
} from "../../../data/constants/ReportingCharts";
import {
  getDigitsFromString,
  makeFirstLetterUpperCase,
  transformCamelCaseToText,
} from "../../../data/helper/helpers";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.primary,
    fontSize: 18,
    fontWeight: 600,
  },
  subtitle: {
    margin: "2px 0 24px 0",
    color: theme.palette.text.primary,
    fontSize: 18,
    fontWeight: 400,
    fontStyle: "italic",
  },
  card: {
    cursor: "pointer",
    transition: "all .3s linear",
    padding: 8,
    borderRadius: 2,
    "&:hover": {
      boxShadow: "2px 2px 14px" + theme.palette.background.dark,
      "& $counterBox": {
        transform: "translateY(0)",
        opacity: 1,
      },
    },
  },
  counterBox: {
    borderBottom: "1px solid #8286b5",
    borderLeft: "1px solid #8286b5",
    borderRight: "1px solid #8286b5",
    color: theme.palette.text.primary,
    fontSize: 18,
    padding: 8,
    borderRadius: "0px 0px 8px 8px",
    display: "inline-block",
    backgroundColor: theme.palette.primary.light,
    float: "right",
    position: "relative",
    top: "-2px",
    transition: "all .3s linear",
  },
  cardSubtitleBox: {
    float: "left",
  },
}));

const getChartData = ({labels, data, requisitionTypes}) => {
  const infoArray = requisitionTypes
    ? zipWith(labels, data, (a, b) => [a, ...b])
    : zip(labels, data);

  return [requisitionTypes ?? [" ", " "], ...infoArray];
};

const getChartsDataCount = (chartData, chartName) => {
  if (CHARTS_WITH_KEY_ONLY_COUNT.includes(chartName)) {
    return chartData.length - 1;
  }

  let result = 0;

  chartData.forEach((record) => {
    if (record?.length) {
      record.forEach((recordItem) => {
        if (typeof recordItem === "number") {
          result += recordItem;
        }
      });
    }
  });

  return result;
};

const getChartOptions = (chartName, forRequisitions) => {
  const options = {
    title: chartName,
    titleTextStyle: {
      color: "#1C1D22",
      fontSize: "20",
      bold: false,
      italic: true,
    },
    is3D: true,
    backgroundColor: {
      fill: "#E0E0F9",
      stroke: "#8286b5",
      strokeWidth: 3,
    },
  };

  if (forRequisitions) {
    options.isStacked = true;
    options.hAxis = {
      title: "Total Requisitions",
      minValue: 0,
      titleTextStyle: {
        color: "#1C1D22",
        fontSize: "18",
        bold: false,
        italic: true,
      },
    };
    options.vAxis = {
      title: "Requisitions Type",
      titleTextStyle: {
        color: "#1C1D22",
        fontSize: "18",
        bold: false,
        italic: true,
      },
    };
  }

  return options;
};

const ChartsBox = ({chartData, forRequisitions, config, isLoading}) => {
  const classes = useStyles();

  const getChartsBoxes = ({countersLabels, chartsType}) => {
    return Object.keys(chartData)
      .sort((a, b) => getDigitsFromString(a) - getDigitsFromString(b))
      .map((key, index) => {
        if (typeof chartData[key] !== "object") return;

        const formattedChartData = getChartData(chartData[key]);

        return (
          <Grid
            item
            xs={12}
            sm={forRequisitions ? 12 : 6}
            className={classes.card}
          >
            <Chart
              chartType={chartsType}
              key={key + index}
              height={forRequisitions ? 450 : 300}
              data={getChartData(chartData[key])}
              options={getChartOptions(
                makeFirstLetterUpperCase(
                  CHARTS_TITLES[key] ?? transformCamelCaseToText(key)
                ),
                forRequisitions,
                REQUISITION_CHARTS_SUBTITLES[key]
              )}
            />
            {REQUISITION_CHARTS_SUBTITLES[key] && forRequisitions ? (
              <Box
                className={`${classes.counterBox} ${classes.cardSubtitleBox}`}
              >
                {REQUISITION_CHARTS_SUBTITLES[key]}
              </Box>
            ) : null}
            <Box className={classes.counterBox}>
              {countersLabels[key]}:{" "}
              {getChartsDataCount(formattedChartData, key)}
            </Box>
          </Grid>
        );
      });
  };

  return (
    <Collapse in={true} appear={true}>
      <Box bgcolor="#FCFCFC" p={3} sx={{borderBottom: "3px solid #989EAE"}}>
        <Box mb={3} className={classes.title}>
          {config.title}
        </Box>
        <Box className={classes.subtitle}>{config.subtitle}</Box>
        {isLoading ? (
          <LoadingCircle />
        ) : chartData ? (
          <Grow in={!isLoading} appear={true}>
            <Grid container spacing={2}>
              {getChartsBoxes(config)}
            </Grid>
          </Grow>
        ) : null}
      </Box>
    </Collapse>
  );
};

export default ChartsBox;
