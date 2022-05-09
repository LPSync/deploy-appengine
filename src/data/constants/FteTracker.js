import TaskStatusBlock from "../../components/taskManager/TaskStatusBlock";
import React from "react";
import ViewButton from "../../components/buttons/ViewButton";

const NO_DATA_LABEL = "No data";

export const GENERATE_FTE_TRACKER_TABLE_COLUMNS = (buttonCallback) => [
  {
    field: "startDate",
    headerName: "Start Date",
    width: 200,
    valueGetter: ({row}) => row.created ?? NO_DATA_LABEL,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
    valueGetter: ({row}) => {
      let result = "";

      if (row.firstName) result += row.firstName + " ";
      if (row.lastName) result += row.lastName;

      return result;
    },
  },
  {
    field: "location",
    headerName: "Location",
    width: 200,
    valueGetter: ({row}) => row.location ?? NO_DATA_LABEL,
  },
  {
    field: "device",
    headerName: "Device",
    width: 250,
    valueGetter: ({row}) =>
      row.laptopType
        ? `${row.laptopType} ${row.laptopLanguage}`
        : NO_DATA_LABEL,
  },
  {
    field: "shippingStatus",
    headerName: "Shipping Status",
    width: 200,
    valueGetter: ({row}) => {
      if (row.trackingNumber && row.trackingProvider) {
        return `${row.trackingProvider} ${row.trackingNumber}`;
      }

      if (row.candidateStatus) {
        return row.candidateStatus;
      }

      return NO_DATA_LABEL;
    },
    renderCell: ({row}) => {
      if (row.trackingNumber && row.trackingProvider) {
        return `${row.trackingProvider} ${row.trackingNumber}`;
      }

      if (row.candidateStatus) {
        return (
          <TaskStatusBlock taskStatus={row?.candidateStatus} id={row?.id} />
        );
      }

      return NO_DATA_LABEL;
    },
  },
  {
    field: "oktaStatus",
    headerName: "Okta Status",
    width: 250,
    valueGetter: ({row}) => row.oktaStatus ?? NO_DATA_LABEL,
  },
  {
    field: "viewButton",
    headerName: " ",
    width: 100,
    renderCell: ({row}) => (
      <ViewButton
        variant={"contained"}
        onClick={() => {
          buttonCallback(row.username);
        }}
        text="VIEW"
      />
    ),
  },
];

export const OKTA_STATUS_LABEL = "oktaStatus";
export const SHIPPING_STATUS_LABEL = "shippingStatus";

export const BUTTON_TEXT_ALL = "ALL";
export const BUTTON_TEXT_COMPLETED = "Completed";
export const BUTTON_TEXT_NOT_COMPLETED = "Not Completed";
export const BUTTON_TEXT_NEW = "New";
export const BUTTON_TEXT_SHIPPED = "Shipped";
export const BUTTON_TEXT_DISPATCH_NOW = "Dispatch Now";

const getStartsWithConfigObject = (columnField, value) => ({
  id: columnField,
  columnField,
  operatorValue: "startsWith",
  value,
});

const oktaStatusButtons = [
  {
    label: BUTTON_TEXT_ALL,
    config: OKTA_STATUS_LABEL,
  },
  {
    label: BUTTON_TEXT_NOT_COMPLETED,
    config: getStartsWithConfigObject(
      OKTA_STATUS_LABEL,
      BUTTON_TEXT_NOT_COMPLETED
    ),
  },
  {
    label: BUTTON_TEXT_COMPLETED,
    config: getStartsWithConfigObject(OKTA_STATUS_LABEL, BUTTON_TEXT_COMPLETED),
  },
];

const shippingStatusButtons = [
  {
    label: BUTTON_TEXT_ALL,
    config: SHIPPING_STATUS_LABEL,
  },
  {
    label: BUTTON_TEXT_NEW,
    config: getStartsWithConfigObject(SHIPPING_STATUS_LABEL, BUTTON_TEXT_NEW),
  },
  {
    label: BUTTON_TEXT_DISPATCH_NOW,
    config: getStartsWithConfigObject(
      SHIPPING_STATUS_LABEL,
      BUTTON_TEXT_DISPATCH_NOW
    ),
  },
  {
    label: BUTTON_TEXT_SHIPPED,
    config: getStartsWithConfigObject(
      SHIPPING_STATUS_LABEL,
      BUTTON_TEXT_SHIPPED
    ),
    disabled: true,
  },
];

export const FTE_TRACKER_OPTIONS_BUTTONS_SELECTED = {
  [OKTA_STATUS_LABEL]: false,
  [SHIPPING_STATUS_LABEL]: false,
};

export const FTE_TRACKER_OPTIONS_BUTTONS = {
  [OKTA_STATUS_LABEL]: oktaStatusButtons,
  [SHIPPING_STATUS_LABEL]: shippingStatusButtons,
};
