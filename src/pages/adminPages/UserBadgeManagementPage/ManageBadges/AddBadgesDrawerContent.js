import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import TaskCloseButtonToolbar from "../../../../components/taskManager/TaskCloseButtonToolbar";
import TaskHeadingToolbar from "../../../../components/taskManager/TaskHeadingToolbar";
import CustomTextField from "../../../../components/inputs/CustomTextField";
import {useLazyQuery, useMutation} from "@apollo/client";
import {CREATE_LPSYNC_BADGE} from "../../../../operations/adminMutations/createLpsyncBadge";
import {transformSpaceToDashAndLowerCase} from "../../../../data/helper/helpers";
import ChooseBadgeIcon from "../../../../components/badges/ChooseBadgeIcon";
import ColorBorderBox from "../../../../components/blocks/ColorBorderBox";
import AlertBox from "../../../../components/AlertBox";
import handleError from "../../../../data/handleError";
import {CHECK_IF_BADGE_NAME_EXISTS} from "../../../../operations/adminQueries/checkIfBadgeNameExists";
import {CHECK_IF_BADGE_ICON_EXISTS} from "../../../../operations/adminQueries/checkIfBadgeIconExists";
import BadgeIcon from "../../../../components/badges/BadgeIcon";
import ImageUpload from "../../../../components/ImageUpload";
import SaveAndClearButtons from "../../../../components/buttons/SaveAndClearButtons";

const useStyles = makeStyles((theme) => ({
  box: {overflowY: "auto"},
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },

  textField: {
    width: "40ch",
  },
}));

const AddBadgesDrawerContent = ({
  badgeType,
  badgeTypeTitle,
  setIsDrawerOpen,
  executeQuery,
}) => {
  const classes = useStyles();
  let history = useHistory();
  const [badgeImage, setBadgeImage] = useState("");
  const [addNameError, setAddNameError] = useState(false);
  const [badgeName, setBadgeName] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [badgeFile, setBadgeFile] = useState();
  const [badgeIconName, setBadgeIconName] = useState("");
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const [executeBadgeNameSearch] = useLazyQuery(CHECK_IF_BADGE_NAME_EXISTS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) =>
      onCheckBadgeNameComplete(data?.check_if_badge_name_exists),

    onError: (error) => handleError(error)(history),
  });

  const [executeBadgeIconSearch] = useLazyQuery(CHECK_IF_BADGE_ICON_EXISTS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      onCheckBadgeIconComplete(data?.check_if_badge_icon_exists);
    },

    onError: (error) => handleError(error)(history),
  });

  const [createLpsyncBadge] = useMutation(CREATE_LPSYNC_BADGE, {
    onCompleted: () => onCreateComplete(),
  });

  const onCreateComplete = () => {
    handleClear();
    setIsButtonsDisabled(false);
    handleAlert("Badge saved!", true, "success");
    executeQuery();
    resetComplete();
  };

  const resetComplete = () => {
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 5000);
  };

  const handleAlert = (msg, open, severity) => {
    setAlertSeverity(severity);
    setAlertMessage(msg);
    setIsAlertOpen(open);
  };

  const runBadgeNameSearch = () => {
    executeBadgeNameSearch({
      variables: {badgeName: badgeName, type: badgeType},
    });
  };

  const onCheckBadgeIconComplete = (data) => {
    if (data) {
      handleAlert("Badge Icon already exists", true, "warning");
    } else {
      runBadgeNameSearch();
    }
  };

  const onCheckBadgeNameComplete = async (data) => {
    if (data) {
      handleAlert("Badge Name already exists", true, "warning");
    } else {
      await saveBadge();
    }
  };

  const handleOnClose = () => {
    executeQuery();
    setIsAlertOpen(false);
    setIsDrawerOpen(false);
  };

  const handleChange = (name) => {
    setBadgeName(name);
    setAddNameError(false);
    setIsAlertOpen(false);
  };

  const handleClear = (clearAlert) => {
    setBadgeName("");
    setBadgeImage("");
    setBadgeFile();
    setAddNameError(false);

    if (clearAlert) {
      setIsAlertOpen(false);
    }
  };

  const handleUploadBtnClick = (bool) => {
    setIsUploadImage(bool);
    setBadgeImage("");
    setBadgeIconName("");
  };

  const saveBadge = async () => {
    setIsButtonsDisabled(true);
    await createLpsyncBadge({
      variables: {
        input: {
          badgeType: badgeType,
          badgeIconName: badgeIconName,
          badgeName: badgeName,
        },
        file: badgeFile,
      },
    });
  };

  const checkBadge = async () => {
    if (!badgeName) {
      setAddNameError(true);
      handleAlert("Badge Name is missing", true, "warning");
    } else if (!badgeImage) {
      handleAlert("Badge Icon is not selected", true, "warning");
    } else if (isUploadImage && badgeName) {
      const iconName = await transformSpaceToDashAndLowerCase(badgeName);
      setBadgeIconName(iconName);
      await executeBadgeIconSearch({
        variables: {iconName: iconName},
      });
    } else {
      runBadgeNameSearch();
    }
  };

  return (
    <>
      <TaskCloseButtonToolbar handleClose={() => handleOnClose()} />
      <Box>
        <TaskHeadingToolbar title={`Add a New ${badgeTypeTitle} Badge`} />
      </Box>
      {isAlertOpen && (
        <AlertBox severity={alertSeverity} message={alertMessage} />
      )}
      <Box m={1} className={classes.box}>
        <Box m={1}>
          {isUploadImage ? (
            <>
              <Typography>
                Upload an icon below. Don't have one? Choose one instead:{" "}
                <span>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleUploadBtnClick(false)}
                  >
                    Choose Icon
                  </Button>
                </span>
              </Typography>
            </>
          ) : (
            <Typography>
              Choose an icon below. Can't find the one? Upload one instead:{" "}
              <span>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleUploadBtnClick(true)}
                >
                  Upload Icon
                </Button>
              </span>
            </Typography>
          )}
        </Box>
        <Box m={1}>
          {isUploadImage ? (
            <ColorBorderBox>
              <Box p={2}>
                <ImageUpload
                  handleAlert={handleAlert}
                  setIsAlertOpen={setIsAlertOpen}
                  setBaseImage={setBadgeImage}
                  setImageFile={setBadgeFile}
                  sizeLimit={5}
                />
              </Box>
              <Box m={2}>
                <Typography>Preview image:</Typography>
                {badgeImage?.length > 0 && <BadgeIcon image={badgeImage} />}
              </Box>
            </ColorBorderBox>
          ) : (
            <Box mt={2}>
              <ChooseBadgeIcon
                badgeIconName={badgeIconName}
                setBadgeIconName={setBadgeIconName}
                setBadgeImage={setBadgeImage}
                badgeImage={badgeImage}
              />
            </Box>
          )}
        </Box>

        <Box m={1} mt={2}>
          <form noValidate autoComplete="off">
            <CustomTextField
              required
              id="badge-name-input"
              label="Badge Name"
              error={addNameError}
              value={badgeName}
              onValueChange={handleChange}
            />
          </form>
        </Box>
        <SaveAndClearButtons
          isButtonsDisabled={isButtonsDisabled}
          handleClear={() => handleClear(true)}
          handleSave={() => checkBadge()}
        />
      </Box>
    </>
  );
};

export default memo(AddBadgesDrawerContent);
