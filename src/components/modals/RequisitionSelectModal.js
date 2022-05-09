import React, {memo, useContext, useState} from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import CustomModal from "./CustomModal";
import InfoBlock from "../InfoBlock";
import {useQuery} from "@apollo/client";
import {GET_COMPLETED_REQUISITIONS_BY_USER} from "../../operations/queries/getCompletedRequisitionsByUser";
import handleError from "../../data/handleError";
import {useHistory} from "react-router-dom";
import RequisitionCard from "../RequisitionCard";
import SelectCircularProgress from "../circularProgress/SelectCircularProgress";
import {AuthUserContext} from "../../AuthUserContextProvider";
import ModalTopBar from "./ModalTopBar";

const useStyles = makeStyles((theme) => ({
  modalTopBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    overflowY: "auto",
    maxHeight: "600px",
  },
}));

const useRequisitions = (setReqData, history) => {
  const {loading} = useQuery(GET_COMPLETED_REQUISITIONS_BY_USER, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const mapped = data.get_completed_requisitions_by_user?.map((req) => {
        return {
          id: req.id,
          hiringManagerEmail: req.requisitionTask.reqHiringManagerEmail,
          hiringManagerFirstName: req.requisitionTask.reqHiringManagerFirstName,
          hiringManagerLastName: req.requisitionTask.reqHiringManagerLastName,
          hiringManagerId: req.requisitionTask.reqHiringManagerId,
          employeeType: req.requisitionTask.reqType,
          startDate: req.requisitionTask.reqStartDate?.split("T")[0],
          jobTitle: req.requisitionTask.reqJobTitle,
          jobCode: req.requisitionTask.reqJobCode,
          bonusAmount: req.requisitionTask.reqBonusAmount,
          bonusType: req.requisitionTask.reqBonusType,
          businessUnit: req.requisitionTask.reqBusinessUnit,
          companyCode: req.requisitionTask.reqCompanyCode,
          department: req.requisitionTask.reqDepartment,

          locationDescription: req.requisitionTask.reqLocationDescription,
          locationCode: req.requisitionTask.reqLocation,

          salary: req.requisitionTask.reqSpendAmount,
          salaryCurrency: req.requisitionTask.reqSpendCurrency,
          salaryPeriod: req.requisitionTask.reqSpendPeriod,

          isBackfill: req.requisitionTask.isBackfill,
          backfillFirstName: req.requisitionTask.reqBackfillFirstName,
          backfillLastName: req.requisitionTask.reqBackfillLastName,
        };
      });
      setReqData(mapped);
    },
    onError: (error) => handleError(error)(history),
  });
  return {loading};
};

const RequisitionSelectModal = ({
  handleClose,
  requisitionType,
  requisitionTypeError,
  setRequisitionType,
  setRequisitionTypeError,
  setRequisitionDetails,
  setJob,
  setFilledByRequisition,
  ...props
}) => {
  const classes = useStyles();
  const history = useHistory();
  const {permOnboardingRequisitionBypass} = useContext(AuthUserContext);
  const [reqData, setReqData] = useState(null);
  const {loading} = useRequisitions(setReqData, history);

  const handleSelect = (requisition) => {
    if (requisition) {
      const {
        id,
        startDate,
        hiringManagerEmail,
        hiringManagerFirstName,
        hiringManagerLastName,
        hiringManagerId,
        businessUnit,
        department,
        locationDescription,
        locationCode,
        employeeType,
        jobTitle,
        jobCode,
        // companyCode,
        // isBackfill, backfillFirstName, backfillLastName,
      } = requisition || {};

      setRequisitionDetails({
        requisitionType: {id, jobCode, jobTitle, startDate},
        startDate: startDate,
        hiringManager: {
          firstName: hiringManagerFirstName,
          lastName: hiringManagerLastName,
          email: hiringManagerEmail,
          employeeNumber: hiringManagerId,
        },
        businessUnit,
        department,
        location: {locationCode, locationDescription},
        employeeType,
      });
      setJob({jobTitle, jobCode});
      setFilledByRequisition(true);
    } else {
      setRequisitionDetails({});
      setJob(null);
      setFilledByRequisition(false);
    }
    handleClose();
  };

  return (
    <CustomModal
      aria-labelledby="requisition-modal-title"
      aria-describedby="requisition-modal-description"
      large
      {...props}
    >
      <ModalTopBar
        title="Select an approved unfilled requisition"
        handleClose={handleClose}
      />

      <Box mt={1} mb={2} mx={1} className={classes.content}>
        <InfoBlock>
          <Typography component={"div"} variant="subtitle1">
            This is a list of your approved requisitions which have not been
            filled by a candidate. Please select the correct requisition for
            this candidate.{" "}
            {permOnboardingRequisitionBypass
              ? "If you do not need a requisition for this candidate please select no requisition needed."
              : "A requisition is needed for all candidate requests."}
          </Typography>
        </InfoBlock>

        <Box>
          {permOnboardingRequisitionBypass && (
            <RequisitionCard handleSelect={handleSelect}>
              <Typography component={"div"} variant="subtitle1">
                No requisition needed
              </Typography>
            </RequisitionCard>
          )}
          {loading ? (
            <SelectCircularProgress />
          ) : (
            <>
              {reqData?.length > 0 ? (
                reqData?.map((r) => (
                  <RequisitionCard
                    key={r.id}
                    requisition={r}
                    handleSelect={handleSelect}
                  />
                ))
              ) : (
                <Typography variant="subtitle1">
                  You do not have any approved unfilled requisitions.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </CustomModal>
  );
};

export default memo(RequisitionSelectModal);
