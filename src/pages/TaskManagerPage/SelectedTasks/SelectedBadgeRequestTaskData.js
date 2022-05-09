import React from "react";
import BadgeIcon from "../../../components/badges/BadgeIcon";

export const badgeRequestTaskRows = (task) => {
  const {id, badgeRequestTask} = task || {};
  const {badgeRequestName, badgeRequestType, badgeRequestIconImg} =
    badgeRequestTask || {};
  return [
    {id: "taskId", name: "Task ID", value: id},
    {
      id: "badgeRequestName",
      name: "Badge Name",
      value: badgeRequestName,
    },
    {
      id: "badgeRequestType",
      name: "Badge Category",
      value: badgeRequestType,
    },
    {
      id: "badgeRequestIconImg",
      name: "Badge Icon Image",
      value: (
        <BadgeIcon image={badgeRequestIconImg} imageName={badgeRequestName} />
      ),
    },
  ];
};
