import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import { getStrWithFirstUpperLetter } from "../../data/helper/helpers";
import { getDateStringFromString } from "../../data/helper/DateTimezoneHelpers";
import FrontendRoutes from "../../data/constants/FrontendRoutes";
import TaskTypes from "../../data/constants/TaskTypes";

export const getCardData = (result, history) => {
  if (result?.task) {
    const { taskType, id, taskCreatedDateTime, taskScheduleDateTime, taskStatus, taskScheduleType }
      = result.task || {};

    const title = `${getStrWithFirstUpperLetter(taskType)} Task: ${id}`;
    const info = `Request Date: ${getDateStringFromString(taskCreatedDateTime)}`;
    const onClick = () => id && history.push(FrontendRoutes.TASK_MANAGER_VIEW_TASK("alltasks", id));

    if (taskType === TaskTypes.ONBOARDING) {
      const { onboardFirstName, onboardLastName, onboardJobTitle } = result?.task?.onboardingTask;

      return {
        title, info, onClick,
        description: `Name: ${onboardFirstName} ${onboardLastName}; ` +
          `JobTitle: ${onboardJobTitle}; Status: ${taskStatus}`,
        icon: <FontAwesomeIcon icon="user-plus" style={{ fontSize: "1.4em" }} />,
      };
    }

    if (taskType === TaskTypes.OFFBOARDING) {
      const { offboardFirstName, offboardLastName } = result?.task?.offboardingTask;

      return {
        title, info, onClick,
        description: `Name: ${offboardFirstName} ${offboardLastName}; ` +
          `Offboard Date: ${taskScheduleType === "Immediate"
            ? "Immediate"
            : taskScheduleDateTime?.split("T")?.[0]}; ` +
          `Status: ${taskStatus}`,
        icon: <FontAwesomeIcon icon="user-minus" style={{ fontSize: "1.4em" }} />,
      };
    }

    if (taskType === TaskTypes.REQUISITION) {
      const { reqJobTitle, reqJobCode } = result?.task?.requisitionTask;

      return {
        title, info, onClick,
        description: `Job Code: ${reqJobCode}; JobTitle: ${reqJobTitle}; Status: ${taskStatus}`,
        icon: <FontAwesomeIcon icon="thumbtack" style={{ fontSize: "1.4em" }} />,
      };
    }
  }

  if (result?.user) {
    const { firstName, lastName, email, userName, jobTitle, businessUnit, department, location }
      = result?.user?.profile || {};

    return {
      title: `User Profile: ${firstName} ${lastName}`,
      info: email,
      description: `Job Title: ${jobTitle}; Business Unit: ${businessUnit}; Department: ${department}; Location: ${location}`,
      icon: <AccountCircleIcon />,
      onClick: () => userName && history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(userName)),
    };
  }

  if (result?.thirdParty) {
    const { name, owner, type, id } = result?.thirdParty || {};

    return {
      title: `Third Party Profile: ${name}`,
      info: owner ? `${owner}@liveperson.com` : "None",
      description: `Type: ${type}`,
      icon: <SettingsIcon />,
      onClick: () => id && history.push(FrontendRoutes.THIRD_PARTY_DIRECTORY_PROFILE(id)),
    };
  }
};