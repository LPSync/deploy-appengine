import TaskScheduleTypes from "../constants/TaskScheduleTypes";
import React from "react";
import TaskTypes from "../constants/TaskTypes";
import BadgeTypes from "../constants/BadgeTypes";
import { getDateStringWithTimeAndCustomTimezone, getFullDateString } from "./DateTimezoneHelpers";

export const trailingS = length => length > 1 ? "s" : "";

export const joinWith = (splitter) => (...valueN) => valueN?.filter(Boolean)?.join(splitter);
export const joinWithSpace = joinWith(" ");

export const typesWithPrefix = (prefix) => (obj) =>
  Object.entries(obj).reduce(
    (prev, [curK, curV]) => ({
      ...prev,
      [curK]: prefix + curV,
    }),
    {},
  );

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export const isBoolean = (val) => "boolean" === typeof val;

export function descendingComparator(a, b, orderBy) {
  const orderByStrings = orderBy?.split(".");
  if (orderByStrings?.length === 1) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  if (orderByStrings?.length === 2) {
    if (
      b[orderByStrings[0]]?.[orderByStrings[1]] <
      a[orderByStrings[0]]?.[orderByStrings[1]]
    ) {
      return -1;
    }
    if (
      b[orderByStrings[0]]?.[orderByStrings[1]] >
      a[orderByStrings[0]]?.[orderByStrings[1]]
    ) {
      return 1;
    }
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

export const getValidationMessage = (value, validate, fieldName, setError) => {
  const errorText = validate
    ?.map((validator) => validator(value))
    .find((v) => v !== "");
  const errorMessage = errorText ? `${fieldName} ${errorText}` : "";
  if (errorText) {
    console.log(setError);
    setError && setError(true);
  }
  return errorMessage;
};

export const getProfileName = (profile) =>
  joinWithSpace(profile?.firstName, profile?.lastName);

export const getProfileNameAndInfo = (profile) => {
  return (
    (profile?.firstName || "") +
    " " +
    (profile?.lastName || "") +
    " | " +
    (profile?.location || "") +
    " | " +
    (profile?.jobTitle || "")
  );
};

export const jobToString = (job) =>
  joinWith(" | ")(job?.jobCode, job?.jobTitle);

export const getRequisitionTypeTitle = (type) => {
  if (type?.id) {
    return joinWith(" - ")(type?.id, type?.jobCode, type?.jobTitle, type?.startDate);
  } else {
    return "No requisition selected";
  }
};

export const transformCamelCaseToText = (stringInCamelCase) =>
  stringInCamelCase.replace(/([A-Z])/g, " $1");

export const makeFirstLetterUpperCase = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const getDigitsFromString = (text) => text.replace(/[\D]/g, "");

export const getTaskFullName = (task, type) => {
  if (type === TaskTypes.OFFBOARDING) {
    console.log("OFFBOARDING", task);
    return getOffboardingFullName(task);
  }
  if (type === TaskTypes.ONBOARDING) {
    console.log("ONBOARDING", task);
    return getOnboardingFullName(task);
  }
};

const getFullName = (taskName, fieldStartsWith) => (task) => joinWithSpace(
  task?.[taskName]?.[fieldStartsWith + "FirstName"], task?.[taskName]?.[fieldStartsWith + "LastName"],
);

export const getOffboardingFullName = getFullName("offboardingTask", "offboard");

export const getOnboardingFullName = getFullName("onboardingTask", "onboard");

export const getTaskFieldValue = (task, type, fieldName) => {
  if (type === TaskTypes.OFFBOARDING) {
    console.log(task, type, fieldName, getOnboardingFieldValue(task, fieldName))
    return getOffboardingFieldValue(task, fieldName);
  }
  if (type === TaskTypes.ONBOARDING) {
    console.log(task, type, fieldName, getOffboardingFieldValue(task, fieldName))
    return getOnboardingFieldValue(task, fieldName);
  }
  if (type === TaskTypes.REQUISITION) {
    return getRequisitionFieldValue(task, fieldName);
  }
};
export const getRequisitionFieldValue = (task, fieldName) =>
  getFieldValue(task, "requisitionTask", "req" + fieldName);

export const getOnboardingFieldValue = (task, fieldName) =>
  getFieldValue(task, "onboardingTask", "onboard" + fieldName);

export const getOffboardingFieldValue = (task, fieldName) =>
  getFieldValue(task, "offboardingTask", "offboard" + fieldName);

const getFieldValue = (task, taskName, field) =>
  task?.[taskName]?.[field] || "";

export const getScheduleDateOrImmediate = (task, day) =>
  task?.taskScheduleType === TaskScheduleTypes.SCHEDULED
    ? day
      ? getFullDateString(task?.taskScheduleDateTime)
      : getDateStringWithTimeAndCustomTimezone(task?.taskScheduleDateTime)
    : TaskScheduleTypes.IMMEDIATE;

export const getTaskValueOrNotEntered = (task, field, secondField) => {
  const secondValue =
    secondField && task?.[secondField] ? ` ${task?.[secondField]}` : "";
  return task?.[field] ? task?.[field] + secondValue : <p>Not entered</p>;
};

export const createLogDesc =
  (task, taskType) => (operation, authUser, message) => {
    const getBody = () => {
      switch (taskType) {
        case TaskTypes.ONBOARDING:
          return `[${getOnboardingFullName(task)} (${getOnboardingFieldValue(
            task,
            "Username",
          )})]; `;
        case TaskTypes.OFFBOARDING:
          return `[${getOffboardingFullName(task)} (${getOffboardingFieldValue(
            task,
            "Username",
          )})]; `;
        case TaskTypes.REQUISITION:
          return `[${task.requisitionTask.reqType}, ${task.requisitionTask.reqBusinessUnit}, ${task.requisitionTask.reqDepartment}]; `;
      }
    };
    const lowercaseOperation = operation?.toLowerCase();
    const createdBy =
      authUser && `${lowercaseOperation}By: ${authUser.profile.userName}; `;
    const msg = message && `${lowercaseOperation}Msg: ${message}}; `;

    return (
      `Task ${operation} >> Task ID: ${task.id} ` + getBody() + createdBy + msg
    );
  };

export const getYesOrNo = (value) => (value ? "Yes" : "No");

export const logOptions = (description, logType = "Task Manager") => ({
  variables: {
    input: {
      logType,
      logNotification: "info",
      logDescription: description,
    },
  },
});

export const getStrWithFirstUpperLetter = (s) =>
  (s?.charAt(0)?.toUpperCase() || "") + (s?.slice(1)?.toLowerCase() || "");

export const transformSpaceToDashAndLowerCase = (str) =>
  str.replace(/\s+/g, "-").toLowerCase();

export const transformDashToSpace = (str) => str.replace(/-/g, " ");

export const getGroupedBadges = (badges, filter) =>  {
  const typeBadgesArray = Object.values(BadgeTypes)?.map(type =>
        [type, badges?.filter((badge) => badge?.badge?.badgeType === type)]);
  const filteredBadgesArray = filter ? typeBadgesArray?.filter(filter) : typeBadgesArray;
  return Object.fromEntries(new Map(filteredBadgesArray));
}
