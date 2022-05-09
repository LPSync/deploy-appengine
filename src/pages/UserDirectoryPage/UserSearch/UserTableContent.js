import TableContent from "../../../components/table/TableContent";
import React, { memo } from "react";
import UserSearchInfoCell from "./UserSearchInfoCell";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BusinessIcon from "@material-ui/icons/Business";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import UserCardBadges from "../../../components/badges/UserCardBadges";
import UserInfoMenu from "./UserInfoMenu";
import StyledTableRow from "../../../components/table/StyledTableRow";
import UserTableCell from "./UserTableCell";
import { getProfileName } from "../../../data/helper/helpers";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import { useHistory } from "react-router-dom";

const userTableHeadCells = [
  { id: "userFullName", label: "User", isNotSortable: true },
  { id: "location", label: "Location" },
  { id: "businessUnit", label: "Business Unit" },
  { id: "department", label: "Department" },
  { id: "badges", label: "Badges", isNotSortable: true  },
  { id: "info-menu", isNotSortable: true },
];

const userDirectoryRow = (userProfile) => {
  const { id, location, businessUnit, department, email } = userProfile || {};
  return [
    { id: "userFullName", content: <UserSearchInfoCell profile={userProfile} /> },
    { id: "location", icon: <LocationOnIcon />, content: location },
    { id: "businessUnit", icon: <BusinessIcon />, content: businessUnit },
    { id: "department", icon: <WorkOutlineIcon />, content: department },
    { id: "badges", content: <UserCardBadges userEmail={email} light/> },
    { id: "info", content: <UserInfoMenu id={id} email={email} />,},
  ];
}

const UserTableBodyRow = (user) => {
  const history = useHistory();
  const username = user?.username || user?.email?.split("@")?.[0];

  return (
    <StyledTableRow hover
      id={user?.id} key={user?.id}
      onClick={() => history.push(FrontendRoutes.USER_DIRECTORY_PROFILE(username))}
    >
      {userDirectoryRow(user, user?.id)?.map(({ id, icon, content }) =>
        <UserTableCell key={id} icon={icon} content={content}/>
      )}
    </StyledTableRow>
  );
};

const UserTableContent = ({users, isLoading}) => {
  return (
    <TableContent
      // initOrderBy="userFullName"
      headAlign="left"
      headCells={userTableHeadCells}
      data={users?.map(user =>
        ({...user?.profile, id: user?.id, userFullName: getProfileName(user?.profile)})
      )}
      isLoading={isLoading}
      tableRow={UserTableBodyRow}
    />
  )
}

export default memo(UserTableContent);