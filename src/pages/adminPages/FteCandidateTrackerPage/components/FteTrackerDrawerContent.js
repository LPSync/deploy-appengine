import React, {useEffect, useState} from "react";
import {
  Box,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CustomTimelineItem from "../../../TaskManagerPage/SelectedTasks/components/CustomTimelineItem";
import {Timeline} from "@material-ui/lab";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {useLazyQuery} from "@apollo/client";
import {GET_FTE_TRACKER_HISTORY} from "../../../../operations/queries/getFteTrackerHistory";
import handleError from "../../../../data/handleError";
import {useHistory} from "react-router-dom";
import NoResultsTypography from "../../../../components/typographies/NoResultsTypography";
import TaskStatusBlock from "../../../../components/taskManager/TaskStatusBlock";
import {FteTrackerRows, ShippingTrackerRows} from "./SelectedFteTrackerData";
import TaskSection from "../../../TaskManagerPage/SelectedTasks/components/TaskSection";
import {FteTrackerEventType} from "../../../../data/constants/FteTrackerEventType";
import CircularIndeterminate from "../../../../components/circularProgress/LoadingCircle";

const useStyles = makeStyles((theme) => ({
  status: {
    padding: "5px 70px",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  header: {fontWeight: 700},
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  trackingBox: {
    backgroundColor: theme.palette.primary.light,
    padding: "10px 20px 20px 20px",
    margin: "20px 10px",
    border: "solid 2px" + theme.palette.background.light,
    position: "relative",
  },
  trackingLoader: {
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0, 0.5)",
  },
  trackingColumn: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginRight: 20,
    marginTop: 10,
  },
  trackingRow: {
    display: "flex",
    alignItems: "flex-end",
  },
  trackingHeader: {
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  trackingInput: {
    color: theme.palette.text.primary,
  },
}));

const createHistoryData = (data) => {
  if (data) {
    const getTitle = (type) => {
      switch (type) {
        case FteTrackerEventType.ACCESS_GIVEN: {
          return "Candidate Portal Access Given to";
        }
        case FteTrackerEventType.SELECTED_DEVICE: {
          return "Device Selected by";
        }
        case FteTrackerEventType.SET_UP_HUB_ACCOUNT: {
          return "Hub Account Set Up by";
        }
        case FteTrackerEventType.ADDED_SHIPPING_INFO: {
          return "Shipping Info Added by";
        }
        default: {
          return "New Event Type";
        }
      }
    };

    const newData = data.map((item) => {
      return {
        name:
          item.eventType === FteTrackerEventType.SET_UP_HUB_ACCOUNT
            ? item.associateEmail
            : `${item.associateFirstName} ${item.associateLastName}`,
        date: item.eventDate,
        time: item.eventTime,
        icon: <CheckCircleIcon fontSize="large" />,
        title: getTitle(item.eventType),
      };
    });
    return newData;
  } else return null;
};

const FteTrackerDrawerContent = ({data, updateTracking, updatingTracking}) => {
  const classes = useStyles();
  const history = useHistory();
  const initTracking = {
    provider: data?.trackingProvider || "",
    number: data?.trackingNumber || "",
  };
  const [tracking, setTracking] = useState(initTracking);
  const [trackingChanged, setTrackingChanged] = useState(false);
  const [historyData, setHistoryData] = useState(null);

  const [getHistory, {loading: historyLoading}] = useLazyQuery(
    GET_FTE_TRACKER_HISTORY,
    {
      onCompleted: (data) =>
        setHistoryData(createHistoryData(data.get_fte_tracker_history)),
      onError: (error) => handleError(error)(history),
    }
  );

  useEffect(() => {
    getHistory({variables: {username: data?.username}});
  }, [data, getHistory]);

  if (!data) return <CircularProgress />;

  const submitHandler = (e) => {
    e.preventDefault();
    const provider = e.target[0].value;
    const number = e.target[1].value;
    const id = data.FTETracker_id;
    setTrackingChanged(false);
    updateTracking({provider, number, id});
  };
  const changeHandler = (value, type) => {
    const newData = {...tracking};
    newData[type] = value;
    if (
      newData.number !== initTracking.number ||
      newData.provider !== initTracking.provider
    ) {
      setTrackingChanged(true);
    } else {
      setTrackingChanged(false);
    }
    setTracking(newData);
  };

  return (
    <Box mx={3}>
      <TaskSection
        title="FTE Details"
        statusBlock={
          <TaskStatusBlock taskStatus={data?.candidateStatus} id={data?.id} />
        }
        tableRows={FteTrackerRows(data)}
      >
        <Divider />
      </TaskSection>
      <TaskSection
        title="Shipping Information"
        tableRows={ShippingTrackerRows(data)}
      >
        <Divider />
      </TaskSection>

      <Box className={classes.trackingBox}>
        {updatingTracking && (
          <Box className={classes.trackingLoader}>
            <CircularProgress />
          </Box>
        )}
        <Typography className={classes.trackingHeader}>
          Tracking Information:
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          className={classes.trackingRow}
        >
          <div className={classes.trackingColumn}>
            <TextField
              required={true}
              onChange={(e) => {
                changeHandler(e.target.value, "provider");
              }}
              value={tracking.provider}
              placeholder="Provider"
              InputProps={{
                classes: {
                  input: classes.trackingInput,
                },
              }}
            />
            <TextField
              required={true}
              onChange={(e) => {
                changeHandler(e.target.value, "number");
              }}
              value={tracking.number}
              placeholder="Tracking Number"
              InputProps={{
                classes: {
                  input: classes.trackingInput,
                },
              }}
            />
          </div>
          <Button
            disabled={!data.laptopType || !trackingChanged}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Update
          </Button>
        </Box>
      </Box>

      <Box className={classes.row} mb={1}>
        <Typography className={classes.header}>History</Typography>
      </Box>
      <Divider />

      <Box mt={2}>
        <Timeline align="alternate">
          {historyLoading && <CircularIndeterminate size={24} />}
          {historyData?.map((item, index) => (
            <CustomTimelineItem
              key={index}
              item={item}
              isLast={index === historyData.length - 1}
              alignCenter
            />
          ))}
          {!historyLoading && !historyData?.length && <NoResultsTypography />}
        </Timeline>
      </Box>
    </Box>
  );
};

export default FteTrackerDrawerContent;
