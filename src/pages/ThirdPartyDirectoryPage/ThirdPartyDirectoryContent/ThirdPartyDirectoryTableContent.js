import {Table, TableBody} from "@material-ui/core";
import React, {memo, useState} from "react";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import {getComparator, stableSort} from "../../../data/helper/helpers";
import CustomTableRow from "../../../components/table/CustomTableRow";
import ViewButton from "../../../components/buttons/ViewButton";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import {useHistory} from "react-router-dom";
import {getStatusName} from "../../../data/constants/ThirdPartyStatuses";

const headCells = [
  {id: "code", label: "Code"},
  {id: "name", label: "Name"},
  {id: "type", label: "Vendor Type"},
  {id: "owner", label: "Owner"},
  {id: "status", label: "Status"}
];

const getOwnerName = (thirdParty) => thirdParty?.ownerFirstName ?
  `${thirdParty?.ownerFirstName} ${thirdParty?.ownerLastName}` : thirdParty?.owner;

const thirdPartyRow = (thirdParty) => [
  {id: "code", value: thirdParty?.code},
  {id: "name", value: thirdParty?.name},
  {id: "type", value: thirdParty?.type},
  {id: "owner", value: getOwnerName(thirdParty)},
  {id: "status", value: getStatusName(thirdParty?.code)},
  {id: "view", value: <ViewButton text="View" />}
];

const ThirdPartyDirectoryTableContent = ({thirdParties, isLoading}) => {
  const history = useHistory();

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("taskCreatedDateTime");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOnClick = (thirdPartyId) => {
    history.push(FrontendRoutes.THIRD_PARTY_DIRECTORY_PROFILE(thirdPartyId));
  };
  return (
    <Table stickyHeader size="small">
      <EnhancedTableHead
        headCells={headCells}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      {isLoading ? (<LoadingCircle />) : (
        <TableBody>
          {stableSort(thirdParties, getComparator(order, orderBy))
            .map(thirdParty => (
              <CustomTableRow
                align="left"
                key={thirdParty.id}
                id={thirdParty.id}
                rowData={thirdPartyRow(thirdParty)}
                handleClick={() => handleOnClick(thirdParty.id)}
              />
            ))}
        </TableBody>
      )}
    </Table>
  );
};

export default memo(ThirdPartyDirectoryTableContent);
