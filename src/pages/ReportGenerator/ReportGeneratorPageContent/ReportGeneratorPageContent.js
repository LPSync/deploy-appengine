import {
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Grow,
  makeStyles,
  Slide,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {REPORT_GENERATOR_CONFIG} from "../../../data/constants/ReportGenerator";
import FieldsBox from "./FieldsBox";
import {cloneDeep, clone} from "lodash";
import TableBox from "./TableBox";
import {useLazyQuery} from "@apollo/client";
import handleError from "../../../data/handleError";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import StyledInputLabel from "../../../components/inputs/StyledInputLabel";
import PaperCardWrapper from "../../../components/PaperCardWrapper";

const DEFAULT_LOADING_INFO = {selectsInfo: false, tableData: false};

const useStyles = makeStyles((theme) => ({
  loaderBox: {
    margin: "0 auto 0 auto",
  },
}));

const getReportTypeNameForSpecificReportType = (reportType) => {
  switch (reportType) {
    case "onboarding":
      return "onboard";
    case "offboarding":
      return "offboard";
    case "requisition":
      return "requisition";
    default:
      return reportType ?? "";
  }
};

const filterMenuItems = (data) =>
  data?.filter(
    (item) =>
      typeof item === "boolean" || (typeof item === "string" && item.length)
  );

const ReportGeneratorPageContent = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loadingInfo, setLoadingInfo] = useState(clone(DEFAULT_LOADING_INFO));
  const [reportType, setReportType] = useState("");
  const [fieldsWithItems, setFieldsWithItems] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);
  const [tableData, setTableData] = useState(null);

  const [getSelectsInfo] = useLazyQuery(
    REPORT_GENERATOR_CONFIG?.reportTypes?.[reportType]?.selectsInfoQuery,
    {
      fetchPolicy: "no-cache",
      variables: {
        reportType: getReportTypeNameForSpecificReportType(reportType),
      },
      onCompleted: (data) => {
        setFetchedData(data.get_report_generator_fields_info);
        setLoadingInfo({...loadingInfo, selectsInfo: false});
      },
      onError: (error) => {
        handleError(error)(history);
        setLoadingInfo({...loadingInfo, selectsInfo: false});
      },
    }
  );

  const [getTableData] = useLazyQuery(
    REPORT_GENERATOR_CONFIG?.reportTypes?.[reportType]?.tableDataQuery,
    {
      fetchPolicy: "no-cache",
      variables: {search: searchInfo},
      onCompleted: (data) => {
        setTableData(
          data.get_generated_report[
            reportType === "employees" ? "employees" : `${reportType}Tasks`
          ]
        );
        setLoadingInfo({...loadingInfo, tableData: false});
      },
      onError: (error) => {
        handleError(error)(history);
        setLoadingInfo({...loadingInfo, tableData: false});
      },
    }
  );

  useEffect(() => {
    if (reportType) {
      resetData();
      setLoadingInfo({...loadingInfo, selectsInfo: true});
      getSelectsInfo({
        fetchPolicy: "no-cache",
        variables: {
          reportType: getReportTypeNameForSpecificReportType(reportType),
        },
      });
    }
  }, [reportType]);

  useEffect(() => {
    if (searchInfo) {
      setLoadingInfo({...loadingInfo, tableData: true});
      getTableData();
    }
  }, [searchInfo]);

  useEffect(() => {
    if (fetchedData) {
      setFieldsWithItems(generateFieldsObjectWithItems(fetchedData));
    }
  }, [fetchedData]);

  const setSearchInfoObject = (searchInfoObject) => {
    setSearchInfo(searchInfoObject);
  };

  const getCurrentReportTypeColumnsOptions = () =>
    reportType &&
    REPORT_GENERATOR_CONFIG.reportTypes[reportType].tableColumnsOptions;

  const generateFieldsObjectWithItems = (menuItems) => {
    const fields = cloneDeep(
      REPORT_GENERATOR_CONFIG.reportTypes[reportType].fields
    );

    Object.keys(fields).forEach((key) => {
      if (!fields[key].menuItems) {
        fields[key].menuItems = !fields[key].displayValue
          ? filterMenuItems(menuItems?.[key])
          : menuItems?.[key];
      }
    });

    return fields;
  };

  const selectReportType = (event) => {
    setReportType(event.target.value);
  };

  const resetData = () => {
    setLoadingInfo(clone(DEFAULT_LOADING_INFO));
    setFieldsWithItems(null);
    setTableData(null);
  };

  const showFieldsBox = () => !!fieldsWithItems && !loadingInfo?.selectsInfo;

  const showTableBox = () => !!tableData && !loadingInfo?.tableData;

  const getFieldsBox = () =>
    showFieldsBox() ? (
      <Grow in={showFieldsBox()}>
        <Grid item container xs={12}>
          <FieldsBox
            fields={fieldsWithItems}
            setSearchInfoObject={setSearchInfoObject}
            disableGenerating={loadingInfo?.tableData}
            reportType={reportType}
          />
        </Grid>
      </Grow>
    ) : null;

  const getTableBox = () =>
    showTableBox() ? (
      <Grow in={showTableBox()}>
        <TableBox
          tableData={tableData}
          tableColumnsOptions={getCurrentReportTypeColumnsOptions()}
        />
      </Grow>
    ) : null;

  const getReportTypeSelect = () => (
    <Grid item container xs={12}>
      <FormControl fullWidth>
        <StyledInputLabel id="select-report-type-label">
          Select report type
        </StyledInputLabel>
        <Select
          labelId="select-report-type-label"
          id="select-device"
          value={reportType}
          label="Report type"
          disabled={loadingInfo?.selectsInfo || loadingInfo?.tableData}
          onChange={selectReportType}
          color={"secondary"}
        >
          {Object.keys(REPORT_GENERATOR_CONFIG.reportTypes).map((type) => (
            <MenuItem value={type} key={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );

  const getLoaderBox = (stateValue) => {
    return (
      stateValue && (
        <Slide in={stateValue} direction="left" timeout={1000}>
          <Grid item className={classes.loaderBox}>
            <LoadingCircle />
          </Grid>
        </Slide>
      )
    );
  };

  return (
    <PaperCardWrapper>
      <Box bgcolor="#FCFCFC" p={4} minWidth={1050}>
        <Grid container spacing={3} xs={12}>
          {getReportTypeSelect()}
          {getLoaderBox(!!loadingInfo?.selectsInfo)}
          {getFieldsBox()}
          {getLoaderBox(!!loadingInfo?.tableData)}
          {getTableBox()}
        </Grid>
      </Box>
    </PaperCardWrapper>
  );
};

export default ReportGeneratorPageContent;
